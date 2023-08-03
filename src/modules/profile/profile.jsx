import { Image, SafeAreaView, ScrollView, Text, View } from 'react-native'

import tw from 'twrnc'
import IMAGE_APP from '../../assets/AppImage'
import { TouchableOpacity } from 'react-native-gesture-handler'
import StatusCustom from '../../components/status/statusCustom'
import DashboardCustom from '../../components/status/dashboardCustom'
import AvatarUser from '../../components/avatar/AvatarUser'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Profile = ({ navigation }) => {
    const [userInfo, setUserInfo] = useState(null)

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                // Lấy token đăng nhập từ AsyncStorage
                const token = await AsyncStorage.getItem('@user_info')
                console.log(token)
                if (token) {
                    // Gửi yêu cầu GET đến API để lấy thông tin người dùng
                    const response = await fetch(
                        'http://3.85.3.86:9001/api/users/profile',
                        {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${token}`, // Đưa token vào tiêu đề Authorization
                            },
                        }
                    )
                    console.log(`Bearer ${token}`)
                    if (response.ok == true) {
                        const userInfoData = await response.json()
                        setUserInfo(userInfoData)
                        return userInfoData
                    } else {
                        console.error('Error fetching user info')
                    }
                } else {
                    console.error('No token found')
                }
            } catch (e) {
                console.error('Error retrieving user info:', e)
            }
        }

        getUserInfo()
    }, [])
    const handlerOnPressProfileEdit = () => {
        navigation.navigate("ProfileEdit", { userInfo })
    }

    return (
        <SafeAreaView style={tw`bg-white flex-1`}>
            <ScrollView>
                <View style={tw`mx-[24px]`}>
                    <View
                        style={tw`flex-row items-center justify-between  mt-[20px]`}
                    >
                        <View>
                            {/* <Image
                            source={IMAGE_APP.avatar}
                            style={tw`w-[100px] h-[100px] border rounded-[50px] `}
                        /> */}
                            <AvatarUser />
                        </View>
                        <View>
                            <Text style={tw`font-bold text-[24px]`}>
                                Edward Larry
                            </Text>
                            <Text style={tw`text-[#777] text-[16px] mt-2`}>
                                Senior Designer
                            </Text>
                        </View>
                        <TouchableOpacity onPress={handlerOnPressProfileEdit}>
                            <Image source={IMAGE_APP.edit} />
                        </TouchableOpacity>
                    </View>
                    {/* Thông tin cá nhân */}
                    <View style={tw`mt-[40px]`}>
                        <Text style={tw` text-[16px] text-[#777]`}>
                            Thông tin cá nhân
                        </Text>
                        <View style={tw`flex-column mt-2`}>
                            <View
                                style={tw`flex-row my-1  py-3 border-b border-slate-300 bg-slate-100 shadow-lg`}
                            >
                                <Text
                                    style={tw`font-bold text-[16px] text-[#888] w-100px ml-2`}
                                >
                                    Email
                                </Text>
                                <Text style={tw`text-[16px] font-bold`}>
                                    {userInfo ? userInfo.data.email : null}
                                </Text>
                            </View>
                            <View
                                style={tw`flex-row my-1  py-3 border-b border-slate-300 bg-slate-100 shadow-lg`}
                            >
                                <Text
                                    style={tw`font-bold text-[16px] text-[#888] w-100px ml-2`}
                                >
                                    Gender
                                </Text>
                                <Text style={tw`text-[16px] font-bold`}>
                                    {userInfo ? userInfo.data.sex : null}
                                </Text>
                            </View>
                            <View
                                style={tw`flex-row my-1 py-3 border-b border-slate-300 bg-slate-100 shadow-lg`}
                            >
                                <Text
                                    style={tw`font-bold text-[16px] text-[#888] w-100px ml-2`}
                                >
                                    Role
                                </Text>
                                <Text style={tw`text-[16px] font-bold`}>
                                    {userInfo ? userInfo.data.role : null}
                                </Text>
                            </View>
                        </View>
                    </View>
                    {/* status */}
                    <View style={tw`mt-[40px]`}>
                        <Text style={tw` text-[16px] text-[#777]`}>
                            My Status
                        </Text>
                        <View style={tw`flex-row mt-3`}>
                            <ScrollView horizontal style={tw`z-0`}>
                                <StatusCustom
                                    name={'Away'}
                                    icon={IMAGE_APP.email}
                                    color={'bg-cyan-400'}
                                />
                                <StatusCustom
                                    name={'At work'}
                                    icon={IMAGE_APP.google_ic}
                                    color={'bg-gray-400'}
                                />
                                <StatusCustom
                                    name={'Hello my friend my name is Hau'}
                                    icon={IMAGE_APP.facebook_ic}
                                    color={'bg-black'}
                                />
                            </ScrollView>
                        </View>
                    </View>
                    <View style={tw`mt-[20px]`}>
                        <Text style={tw` text-[16px] text-[#777]`}>
                            Dashboard
                        </Text>
                        <View style={tw`mt-[20px]`}>
                            <DashboardCustom
                                name={'Payments'}
                                color={'bg-green-600'}
                                icon={IMAGE_APP.email}
                            />
                            <DashboardCustom
                                name={'Payments'}
                                color={'bg-green-600'}
                                icon={IMAGE_APP.email}
                            />
                            <DashboardCustom
                                name={'Payments'}
                                color={'bg-green-600'}
                                icon={IMAGE_APP.email}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default Profile
