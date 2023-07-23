import { View, Image, TouchableOpacity, StyleSheet, Text } from "react-native"
import * as facebook from "expo-auth-session/providers/facebook"
import * as webBrowser from "expo-web-browser"
import { useEffect, useState } from "react";
webBrowser.maybeCompleteAuthSession();
export default function fbButton() {
    const [userInto, setUserInto] = useState(null);
    const [request, response, prompAsync] = facebook.useAuthRequest({
        clientId: "2198988143627177"
    });

    useEffect(() => {
        if (response && response.type === "success" && response.authentication) {
            (async () => {
                const userInfoResponse = await fetch(`https://graph.facebook.com/me?access_token=${response.authentication.accessToken}&fields=id,name,picture.type(lage)`)
                const userInfo = await userInfoResponse.json();
                setUserInto(userInfo);
                console.log(JSON.stringify(response, null, 2));
            })();
        }
    }, [response])

    const handlePressAsync = async () => {
        const result = await prompAsync();
        if (result.type !== "success") {
            alert("uh oh, something went wrong")
            return
        }
    }
    return (
        <View style={styles.container}>
            <Text>{JSON.stringify(userInto)}</Text>
            <TouchableOpacity style={styles.button} onPress={handlePressAsync}>
                <Image
                    style={styles.tinyLogo}
                    source={{
                        uri: 'https://cdn.icon-icons.com/icons2/1934/PNG/512/iconfinder-social-media-web-network-logo02-4584667_122300.png',
                    }}
                />
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    tinyLogo: {
        width: 150,
        height: 150,
    },
})
