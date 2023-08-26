import { useEffect, useState } from "react"
import Voice from '@react-native-voice/voice'
import { Text, View, TouchableOpacity, Image } from "react-native"
const VoiceCustom = () => {

    const [dataVoice, setDataVoice] = useState("")
    const [recording, setRecording] = useState(false)

    useEffect(() => {
        Voice.onSpeechStart = speechStartHandler;
        Voice.onSpeechEnd = speechStopHandler;
        Voice.onSpeechError = speechErrorHandler
        Voice.onSpeechResults = speechResultsHandler

        return () => {
            Voice.destroy().then(Voice.removeAllListeners)
        }
    }, [])


    const speechStartHandler = e => {
        setDataVoice('')
        setRecording(true)
    }
    const speechStopHandler = e => {
        setRecording(false)

    }
    const speechResultsHandler = e => {
        setDataVoice(e.value[0]);
        console.log("data-> ", e)

    }
    const speechErrorHandler = e => {

    }
    const startRecording = async () => {
        try {
            await Voice.start('en-US')
            speechStartHandler()
        } catch (e) {
            console.log(e)
        }
    }
    const stopRecording = async () => {
        try {
            speechStopHandler()
            await Voice.stop()

        } catch (e) {
            console.log(e)
        }
    }
    return (
        <View style={{ alignItems: 'center', marginTop: 100 }}>
            {recording ? (
                <TouchableOpacity onPress={stopRecording}>
                    <Image source={require('../../assets/img/icons8-recording.gif')} />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity onPress={startRecording}>
                    <Image source={require('../../assets/img/adaptive-icon.png')} />
                </TouchableOpacity>
            )}
            <Text>{dataVoice}</Text>
        </View>
    )
}
export default VoiceCustom