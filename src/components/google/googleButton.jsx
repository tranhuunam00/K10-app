import React from "react";
import { View, Image, TouchableOpacity, StyleSheet, Text } from "react-native"

import * as Google from "expo-auth-session/providers/google"
import * as webBrowser from "expo-web-browser"
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
webBrowser.maybeCompleteAuthSession();
export default function googleButton() {
    const [userInfo, setUserInfo] = useState(null);
    const [request, response, prompAsync] = Google.useAuthRequest({
        clientId: "673866304907-6aljq6vmfsamujvi498nv3u7tqaqko9b.apps.googleusercontent.com",
        webClientId: "673866304907-6aljq6vmfsamujvi498nv3u7tqaqko9b.apps.googleusercontent.com",
        iosClientId: "673866304907-u4m6v59sj7ukgis7ua8s8ieeunp4ncuq.apps.googleusercontent.com",
        androidClientId: "673866304907-kcrcc4ca0kihekdtgn16ibocbb03mo15.apps.googleusercontent.com"
    });
console.log(response)
    useEffect(() => { handleSinginWithGoogle() }, [response])
    async function handleSinginWithGoogle() {
        const user = await AsyncStorage.getItem("@user");
        await getUserInfo(response.authentication.accessToken)
        if (!user) {
          if(response?.type === "success"){
           await getUserInfo(response.authentication.accessToken);
          }
        } else {
            setUserInfo(JSON.parse(user))
        }
    }

    const getUserInfo = async (token) => {
        console.log('token: ' + token);
        if (!token) return;
        try {
            const response = await fetch(
                "https://www.googleapis.com/oauth2/v2/userinfo",
                 {
                headers: { Authorization: `Bearer ${token}` }
            })
            const user = await response.json();
            await AsyncStorage.setItem("@user", JSON.stringify(user))
            setUserInfo(user)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.textjson}>{JSON.stringify(userInfo)}</Text>
            <TouchableOpacity style = {styles.button} onPress={prompAsync}>
                <Image
                    style={styles.tinyLogo}
                    source={{
                        uri: 'https://cdn-icons-png.flaticon.com/512/300/300221.png',
                    }}
                />
                <Text style = {styles.text}>Login Google</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F29388',
    },
    button: {
        width:250,
        height:70,
        display: 'flex',
        flexDirection: "row",
        padding: 10,
        backgroundColor: "#ffff",
        borderRadius:15,
        marginTop:20
    },
    tinyLogo: {
        width: 50,
        height: 50,
    },
    text: {
        fontSize:25,marginLeft:15,
        marginVertical:5
    },
    textjson: {
        width:300,
        fontSize:16
    }

})
