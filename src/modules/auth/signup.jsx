import {
    Alert,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View,
} from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import IMAGE_APP from '../../assets/AppImage'
import InputCustom from '../../components/inputCustom/inputCustom'
import { ParseValid } from '../../lib/validate/ParseValid'
import { Validate } from '../../lib/validate/Validate'

const SignUpScreen = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [emailLowerCase, setEmailLowerCase] = useState('')

    useEffect(() => {
        const lowerEmail = emailLowerCase.toLowerCase()
        setEmail(lowerEmail)
    }, [emailLowerCase])
    // console.log('emailLowerCase', emailLowerCase)
    // console.log('email', email)
    const [listError, setListError] = useState({
        password: null,
        email: null,
        confirmPassword: null,
    })
    const [formValue, setFormValue] = useState({
        password: null,
        email: null,
        confirmPassword: null,
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
        if (name === 'confirmPassword') setConfirmPassword(value)

        const inputValue = value.trim()
        const validObject = ParseValid(validate)
        const error = Validate(name, inputValue, validObject, password)
        setListError({ ...listError, [name]: error })
        setFormValue({ ...formValue, [name]: inputValue })
    }
    const handlePressRegister = async () => {
        if (!email || !password || !confirmPassword) {
            console.log('Error: Vui long nhap day du thong tin')
            return NotifyMessage('Error: Vui long nhap day du thong tin')
        }
        if (
            listError.email ||
            listError.password ||
            listError.confirmPassword
        ) {
            console.log('Error: Vui long nhap cac truong dung dinh dang')
            return NotifyMessage(
                'Error: Vui long nhap cac truong dung dinh dang'
            )
        }
        if (password !== confirmPassword) {
            console.log('Error: Confirm password thì chưa đúng')
            return NotifyMessage('Error: Confirm password thì chưa đúng')
        }
        try {
            const response = await fetch(
                'http://3.85.3.86:9001/api/auth/sign-in',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                }
            )
            const data = await response.json()
            // const token = data.token
            if (response.status === 201) {
                console.log(data.message)
                props.navigation.navigate('Login')
                NotifyMessage('Dang ky thanh cong')
                setEmail('')
                setPassword('')
                setConfirmPassword('')
            } else {
                console.log(data.message)
                NotifyMessage(
                    data.message,
                    'Vui long kiem tra lai tai khoan, mat khau'
                )
            }
        } catch (error) {
            console.error(error)
        }

        return console.log('Ended')
    }
    return (
        <SafeAreaView style={styles.registerViewAll}>
            {/* <View style={styles.registerViewAll}> */}
            <View style={styles.registerView}>
                <View style={styles.back_arrowAll}>
                    <TouchableOpacity
                        style={styles.back_arrow}
                        onPress={() => {
                            props.navigation.navigate('Login')
                        }}
                    >
                        <Image source={IMAGE_APP.back_arrow} />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.textRegister}>
                        Hello! Register to get started
                    </Text>
                </View>
                <View style={styles.inputView}>
                    <InputCustom
                        label={'Email'}
                        icon={IMAGE_APP.email}
                        name={'email'}
                        validate={'required|regEmail'}
                        onChange={handleChangeInput}
                        err={listError.email}
                        styleErr={listError.email}
                    />

                    <InputCustom
                        label={'Password'}
                        icon={IMAGE_APP.lock}
                        name={'password'}
                        validate={'required|minLength:6'}
                        onChange={handleChangeInput}
                        err={listError.password}
                        secureTextEntry={true}
                        iconErr={IMAGE_APP.eye_hide}
                        styleErr={listError.password}
                        iconUnhidePass={IMAGE_APP.eye_unhide}
                    />

                    <InputCustom
                        label={'Confirm password'}
                        icon={IMAGE_APP.lock}
                        name={'confirmPassword'}
                        validate={'required|checkPw'}
                        onChange={handleChangeInput}
                        err={listError.confirmPassword}
                        secureTextEntry={true}
                        iconErr={IMAGE_APP.eye_hide}
                        styleErr={listError.confirmPassword}
                        iconUnhidePass={IMAGE_APP.eye_unhide}
                    />
                </View>
                <TouchableOpacity
                    style={styles.buttonView}
                    onPress={handlePressRegister}
                >
                    <Text style={styles.buttonStyle}>Register</Text>
                </TouchableOpacity>

                <View style={styles.continueView}>
                    <View style={styles.lineView} />
                    <Text style={styles.textView}>Or Register with</Text>
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
                        Already have an account?{' '}
                        <Text
                            style={{ color: '#35C2C1' }}
                            onPress={() => {
                                props.navigation.navigate('Login')
                            }}
                        >
                            Login Now
                        </Text>
                    </Text>
                </View>
            </View>
            {/* </View> */}
        </SafeAreaView>
    )
}
export default SignUpScreen

const styles = StyleSheet.create({
    inputFocused: {
        backgroundColor: '#ff0000',
    },
    registerViewAll: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#fff',
    },
    registerView: {
        // display: 'flex',
        flex: 1,
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#fff',
    },
    back_arrowAll: {
        width: 331,
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
        paddingTop: 17,
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
        marginTop: 30,
    },
})
