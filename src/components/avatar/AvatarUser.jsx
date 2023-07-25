import { Image, TouchableOpacity, View, StyleSheet } from "react-native"
import IMAGE_APP from "../../assets/AppImage"
import { useState } from "react";
import * as ImagePicker from 'expo-image-picker';


const options = {
    title: 'Select Image',
    mediaType: 'photo',
    maxHeight: 200,
    maxWidth: 200,
    selectionLimit: 1,
    includeBase64: false,
}
const AvatarUser = () => {
    const [avatarSource, setAvatarSource] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            setAvatarSource(result.uri);
        }
    };
    return (
        <View style={styles.formAvatar}>
            {
                avatarSource ? (
                    <Image style={styles.imgAvatar} source={{ uri: avatarSource }} />
                ) : (
                    <Image style={styles.imgAvatar} source={IMAGE_APP.avatarGai} />
                )
            }
            <View style={styles.formCamera}>
                <TouchableOpacity onPress={pickImage}>
                    <Image style={styles.camera} source={IMAGE_APP.camera} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    formAvatar: {
    },
    imgAvatar: {
        borderRadius: 50,
        width: 100,
        height: 100,
    },
    camera: {
        width: 30,
        height: 30,
    },
    formCamera: {
        display: 'flex',
        alignItems: 'flex-end',
        position: 'relative',
        bottom: 25
    }
})

export default AvatarUser