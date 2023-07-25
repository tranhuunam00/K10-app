import {
    Button,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ToastAndroid,
    Platform,
    Alert,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import IMAGE_APP from '../../assets/AppImage'
import InputCustom from '../../components/inputCustom/inputCustom'
import { ParseValid } from '../../lib/validate/ParseValid'
import { Validate } from '../../lib/validate/Validate'
import Checkbox from 'expo-checkbox'
import tw from 'twrnc'
import AsyncStorage from '@react-native-async-storage/async-storage'
const LoginScreen = (props) => {
    const key = 'accountApp'

    const [isChecked, setIsChecked] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailLowerCase, setEmailLowerCase] = useState('')
    const [userInfo, setUserInfo] = useState(null)
    useEffect(() => {
        const lowerEmail = emailLowerCase.toLowerCase()
        setEmail(lowerEmail)
    }, [emailLowerCase])
    const [listError, setListError] = useState({
        password: null,
        email: null,
    })
    const [formValue, setFormValue] = useState({
        password: null,
        email: null,
    })
    const NotifyMessage = (msg, text) => {
        if (Platform.OS === 'android') {
            ToastAndroid.show(msg, ToastAndroid.SHORT, ToastAndroid.CENTER)
        } else {
            Alert.alert(msg, text, [{ text: 'OK' }], { cancelable: 1000 })
        }
    }

    const handleChangeInput = (value, validate, name) => {
        if (name === 'password') setPassword(value)
        if (name === 'email') setEmailLowerCase(value)

        const inputValue = value.trim()
        const validObject = ParseValid(validate)
        const error = Validate(name, inputValue, validObject, password)
        setListError({ ...listError, [name]: error })
        setFormValue({ ...formValue, [name]: inputValue })
    }

    const handleOnPressLogin = async () => {
        try {
            const response = await fetch(
                'http://3.85.3.86:9001/api/auth/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                }
            )

            if (response.status === 200) {
                const responseObject = await response.json()

                const token = responseObject.data.token

                console.log('token', token)

                await AsyncStorage.setItem('@user_info', token)
                props.navigation.navigate('Drawer')
                NotifyMessage('Thanh cong')
                if (isChecked === true) {
                    const data = {
                        email: email,
                        password: password,
                    }
                    const jsonData = JSON.stringify(data)
                    await AsyncStorage.setItem(key, jsonData)
                    console.log('Lưu dữ liệu thành công!')
                } else {
                    console.log('Lưu dữ liệu thất bại!')
                }
            } else {
                NotifyMessage(
                    'Đăng nhập thất bại',
                    'Tài khoản hoặc mật khẩu không đúng'
                )
            }
        } catch (error) {
            console.error(error)
        }
        setEmail('')
        setPassword('')
    }
    const checkUserLoggedIn = async () => {
        const jsonData = await AsyncStorage.getItem(key)
        if (jsonData !== null) {
            const userData = JSON.parse(jsonData)
            console.log(userData)
            try {
                const response = await fetch(
                    'http://3.85.3.86:9001/api/auth/login',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(userData),
                    }
                )
                // const { data } = await response.json()
                // console.log(data)
                // const { token } = data
                // console.log(token)
                if (response.status === 200) {
                    console.log('thanh cong')
                    // const { data } = await response.json()
                    // console.log(data)
                    // // setUserInfo(data)
                    // await AsyncStorage.setItem(
                    //     '@user_info',
                    //     JSON.stringify(data)
                    // )
                    const { data } = await response.json()
                    console.log(data)
                    const { token } = data
                    console.log(token)
                    // setUserInfo(token)
                    await AsyncStorage.setItem('@user_info', token)

                    props.navigation.navigate('Drawer')
                    NotifyMessage('Thanh cong')
                } else {
                    console.log('that bai')
                    NotifyMessage(
                        'Đăng nhập thất bại',
                        'Tài khoản hoặc mật khẩu không đúng'
                    )
                }
            } catch (error) {
                console.error(error)
            }
        }
    }
    checkUserLoggedIn()
    return (
        <View style={styles.registerViewAll}>
            <View style={styles.registerView}>
                <View>
                    <Text style={styles.textRegister}>
                        Welcome back! Glad to see you, Again!
                    </Text>
                </View>
                <View style={styles.inputView}>
                    <InputCustom
                        value={email}
                        label={'Email'}
                        icon={IMAGE_APP.email}
                        name={'email'}
                        onChange={handleChangeInput}
                        err={listError.email}
                        validate={'required|regEmail'}
                        styleErr={listError.email}
                    />

                    <InputCustom
                        value={password}
                        label={'Password'}
                        icon={IMAGE_APP.lock}
                        name={'password'}
                        iconErr={IMAGE_APP.eye_hide}
                        secureTextEntry={true}
                        onChange={handleChangeInput}
                        err={listError.password}
                        validate={'required'}
                        styleErr={listError.password}
                        iconUnhidePass={IMAGE_APP.eye_unhide}
                    />
                </View>
                <View
                    style={tw`flex flex-row justify-start items-start w-[331px]`}
                >
                    <Checkbox
                        value={isChecked}
                        onValueChange={setIsChecked}
                        color={isChecked ? '#00f' : undefined}
                    />
                    <Text style={tw`ml-[5px]`}>Lưu thông tin</Text>
                </View>
                <TouchableOpacity
                    style={styles.buttonView}
                    onPress={handleOnPressLogin}
                >
                    <Text style={styles.buttonStyle}>Login</Text>
                </TouchableOpacity>
                <View style={styles.continueView}>
                    <View style={styles.lineView} />
                    <Text style={styles.textView}>Or Login with</Text>
                    <View style={styles.lineView} />
                </View>
                <View style={styles.loginFastView}>
                    <View style={styles.loginFast}>
                        <Image
                            source={IMAGE_APP.facebook_ic}
                            style={styles.iconLoginFast}
                        />
                    </View>
                    <View style={styles.loginFast}>
                        <Image
                            source={IMAGE_APP.google_ic}
                            style={styles.iconLoginFast}
                        />
                    </View>
                    <View style={styles.loginFast}>
                        <Image
                            source={IMAGE_APP.cib_apple}
                            style={styles.iconLoginFast}
                        />
                    </View>
                </View>
                <View style={styles.loginNowView}>
                    <Text
                        style={{
                            color: '#032426',
                            fontSize: 15,
                            fontWeight: 500,
                            fontStyle: 'normal',
                            textAlign: 'center',
                        }}
                    >
                        Don’t have an account?{' '}
                        <Text
                            style={{ color: '#35C2C1' }}
                            onPress={() => {
                                props.navigation.navigate('Register')
                            }}
                        >
                            Register Now
                        </Text>
                    </Text>
                </View>
            </View>
        </View>
    )
}
export default LoginScreen

const styles = StyleSheet.create({
    registerViewAll: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#fff',
    },
    registerView: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#fff',
    },
    back_arrowAll: {
        width: '100%',
    },
    back_arrow: {
        display: 'flex',
        alignItems: 'flex-start',
        width: 41,
        height: 41,
        flexShrink: 0,
        borderWidth: 1,
        borderRadius: 12,
        borderStyle: 'solid',
        borderColor: '#E8ECF4',
        backgroundColor: '#fff',
        padding: 11,
        marginTop: 35,
    },
    textRegister: {
        width: 331,
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        color: '#1E232C',
        fontSize: 30,
        fontStyle: 'normal',
        fontWeight: 700,
        marginTop: 20,
    },
    inputView: {
        marginTop: 32,
    },
    inputStyle: {
        width: 331,
        height: 56,
        flexShrink: 0,
        borderWidth: 1,
        borderRadius: 8,
        borderStyle: 'solid',
        borderColor: '#E8ECF4',
        backgroundColor: '#F7F8F9',
        padding: 18,
    },
    inputStyles: {
        width: 331,
        height: 56,
        flexShrink: 0,
        borderWidth: 1,
        borderRadius: 8,
        borderStyle: 'solid',
        borderColor: '#E8ECF4',
        backgroundColor: '#F7F8F9',
        padding: 18,
        marginTop: 12,
    },
    buttonView: {
        marginTop: 30,
        width: 331,
        height: 56,
        flexShrink: 0,
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 8,
        backgroundColor: '#1E232C',
        paddingTop: 19,
    },
    buttonStyle: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 15,
        fontStyle: 'normal',
        fontWeight: 600,
    },
    continueView: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 28,
    },
    lineView: {
        width: 103,
        height: 1,
        backgroundColor: '#E8ECF4',
    },
    textView: {
        width: 101,
        color: '#6A707C',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: 600,
        marginLeft: 12,
        marginRight: 12,
    },
    loginFastView: {
        marginTop: 20,
        width: 331,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    loginFast: {
        width: 105,
        height: 56,
        flexShrink: 0,
        borderWidth: 1,
        borderRadius: 8,
        borderStyle: 'solid',
        borderColor: '#E8ECF4',
        backgroundColor: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconLoginFast: {
        width: 26,
        height: 26,
    },
    loginNowView: {
        width: 331,
        marginBottom: 26,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 150,
    },
})
