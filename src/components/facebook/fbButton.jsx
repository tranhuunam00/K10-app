import { View, Image, TouchableOpacity, StyleSheet, Text } from "react-native";
import * as facebook from "expo-auth-session/providers/facebook";
import * as webBrowser from "expo-web-browser";
import { useEffect, useState } from "react";
webBrowser.maybeCompleteAuthSession();
export default function fbButton() {
  const [userInto, setUserInto] = useState(null);
  const [request, response, prompAsync] = facebook.useAuthRequest({
    clientId: "6320674227969437",
  });

  useEffect(() => {
    if (response && response.type === "success" && response.authentication) {
        (async () => {
          const userInfoResponse = await fetch(
            `https://graph.facebook.com/me?access_token=${response.authentication.accessToken}&fields=id,birthday,hometown,gender,location,last_name,first_name,short_name,picture.type(large)`
          );
          const userInfo = await userInfoResponse.json();
          setUserInto(userInfo);
          console.log(JSON.stringify(response, null, 2));
        })();
      }
    }, [response]);

  const handlePressAsync = async () => {
    const result = await prompAsync();
    if (result.type !== "success") {
      alert("uh oh, something went wrong");
      return;
    }
  };
  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(userInto)}</Text>
      <TouchableOpacity
        style={styles.button}
        disabled={!request}
        onPress={handlePressAsync}
      >
        <Image
          style={styles.tinyLogo}
          source={{
            uri: "https://cdn.pixabay.com/photo/2022/04/08/07/18/facebook-7118901_1280.png",
          }}
        />
        <Text style={styles.text}>Login FaceBook</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F29388",
  },
  button: {
    width: 280,
    height: 70,
    display: "flex",
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#ffff",
    borderRadius: 15,
    marginTop: 20,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  text: {
    fontSize: 25,
    marginLeft: 15,
    marginVertical: 5,
  },
});
