import { Text, View, StyleSheet, TouchableOpacity } from "react-native"
import InputCustom from "../../../components/inputCustom/inputCustom"
import IMAGE_APP from "../../../assets/AppImage"
import { Validate } from "../../../lib/validate/Validate"
import { ParseValid } from "../../../lib/validate/ParseValid"
import { useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

const ProfileEdit = ({ route }) => {
    const data = route.params.userInfo
    const id = data.data._id
    const [sex, setSex] = useState("")
    const [updatedSex, setUpdatedSex] = useState(data.data.sex);

    const handleChangeInput = (value, validate, name) => {
        if (name === "sex") setSex(value);
    }

    const handleOnPressSave = async () => {
        try {
            const token = await AsyncStorage.getItem('@user_info');
            const formData = new FormData();
            formData.append('sex', sex);

            const response = await fetch(`http://3.85.3.86:9001/api/users/profile/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                },
                body: formData
            });
            const data = await response.json();
            if (data.success === true) {
                console.log("Thành công");
                setUpdatedSex(sex)
                setSex("")

            } else {
                console.log("that bai")
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <View>
            <View style={styles.flex}>
                <Text>Sex:</Text>
                <InputCustom
                    label={"Sex"}
                    icon={IMAGE_APP.lock}
                    name={"sex"}
                    onChange={handleChangeInput}
                    value={sex}
                />
            </View>
            <View>
                <Text>
                    {updatedSex}
                </Text>
            </View>
            <TouchableOpacity onPress={handleOnPressSave} style={styles.button}>
                <Text style={styles.buttonStyle}>
                    Save
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    flex: {
        display: 'flex',
        flexDirection: 'row',
    },
    title: {
        margin: 10,
        fontSize: 20,
    },
    button: {
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
})

export default ProfileEdit