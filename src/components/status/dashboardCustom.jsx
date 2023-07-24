import { View, Text, Image } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import IMAGE_APP from '../../assets/AppImage'
const DashboardCustom = ({ icon, color, name }) => {
    return (
        <View style={tw`flex-row items-center justify-between mb-3`}>
            <View style={tw`flex-row items-center`}>
                <View
                    style={tw`flex items-center justify-center w-[60px] h-[60px]  rounded-[50px] mr-[20px] ${color}`}
                >
                    <Image source={icon} />
                </View>
                <Text style={tw`text-[20px] font-bold`}>{name}</Text>
            </View>

            <View style={tw`flex-row justify-between`}>
                <Image source={IMAGE_APP.arrowright} />
            </View>
        </View>
    )
}

export default DashboardCustom
