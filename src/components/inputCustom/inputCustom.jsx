import React, { useRef, useState } from 'react'
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    SafeAreaView,
} from 'react-native'

const InputCustom = ({
    label,
    err,
    icon,
    iconErr,
    secureTextEntry,
    validate,
    onChange = () => {},
}) => {
    const [isFocused, setIsFocused] = useState(false)
    const [inputValue, setInputValue] = useState('')

    const handleFocus = () => {
        setIsFocused(true)
    }

    const handleBlur = () => {
        setIsFocused(false)
    }

    const handleChangeText = (text) => {
        setInputValue(text)
        onChange(text)
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.InputCustom}>
                <View style={styles.input}>
                    <Image style={styles.icon} source={icon} />
                    <TextInput
                        autoFocus={true}
                        style={[
                            styles.TextInput,
                            isFocused && styles.inputFocused,
                            // inputValue && styles.inputWithValue,
                        ]}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        secureTextEntry={secureTextEntry}
                        validate={validate}
                        onChangeText={handleChangeText}
                        value={inputValue}
                    />
                    <Text
                        style={[
                            styles.label,
                            inputValue && styles.labelWithValue,
                            isFocused && styles.textFocused,
                        ]}
                    >
                        {label}
                    </Text>
                </View>
                <Image style={styles.iconErr} source={iconErr} />
            </View>
            <Text style={styles.error}>{err}</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },
    InputCustom: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        position: 'relative',
    },
    TextInput: {
        width: 331,
        height: 56,
        borderWidth: 1,
        paddingLeft: 40,
        paddingRight: 40,
        borderRadius: 10,
    },
    inputWithValue: {
        // paddingTop: 10,
    },
    error: {
        color: '#FF0000',
        marginLeft: 10,
    },
    input: {
        display: 'flex',
        justifyContent: 'center',
    },
    label: {
        position: 'absolute',
        left: 40,
    },
    labelWithValue: {
        top: -10,
        fontSize: 14,
        // color: '#00f',
        backgroundColor: '#FFF',
        paddingRight: 5,
        paddingLeft: 5,
        fontWeight: '500',
        // opacity: 0.4,
    },
    icon: {
        width: 24,
        height: 24,
        position: 'absolute',
        margin: 10,
    },
    iconErr: {
        width: 22,
        height: 22,
        position: 'absolute',
        right: 10,
    },
    inputFocused: {
        borderColor: '#00f',
    },
    textFocused: {
        color: '#00f',
    },
})

export default InputCustom
