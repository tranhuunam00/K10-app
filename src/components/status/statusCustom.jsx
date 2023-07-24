import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from 'twrnc'
const StatusCustom = ({ name, icon, color }) => {
    const [isCheckPress, setIsCheckPress] = useState(false)
    return (
        <TouchableOpacity
            onPress={() =>
                isCheckPress ? setIsCheckPress(false) : setIsCheckPress(true)
            }
            style={
                isCheckPress
                    ? tw` mr-[5px] mb-[20px] flex-row justify-center items-center rounded-[25px] px-[15px] py-[10px] ${color} shadow-lg z-5`
                    : tw` mr-[5px] mb-[20px] flex-row justify-center items-center rounded-[25px] px-[15px] py-[10px] ${color} opacity-25 z-5`
            }
        >
            <Image source={icon} />
            <Text style={tw`text-white  text-[20px] ml-2`}>{name}</Text>
        </TouchableOpacity>
    )
}

export default StatusCustom
