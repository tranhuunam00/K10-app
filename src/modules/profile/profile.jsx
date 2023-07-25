import { Image, SafeAreaView, ScrollView, Text, View } from 'react-native'

import tw from 'twrnc'
import IMAGE_APP from '../../assets/AppImage'
import { TouchableOpacity } from 'react-native-gesture-handler'
import StatusCustom from '../../components/status/statusCustom'
import DashboardCustom from '../../components/status/dashboardCustom'
import AvatarUser from '../../components/avatar/AvatarUser'

const Profile = () => {
    return (
        <SafeAreaView style={tw`bg-white flex-1 `}>
            <View style={tw`mx-[24px]`}>
                <View
                    style={tw`flex-row items-center justify-between  mt-[20px]`}
                >
                    <View >
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
                    <TouchableOpacity>
                        <Image source={IMAGE_APP.edit} />
                    </TouchableOpacity>
                </View>
                {/* status */}
                <View style={tw`mt-[40px]`}>
                    <Text style={tw` text-[16px] text-[#777]`}>My Status</Text>
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
                    <Text style={tw` text-[16px] text-[#777]`}>Dashboard</Text>
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
        </SafeAreaView>
    )
}
export default Profile
