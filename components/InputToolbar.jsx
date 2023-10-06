import {
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  PermissionsAndroid,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Voice from '@react-native-voice/voice';
import { speak, stop } from 'expo-speech';

import openAI from '../api/openAI';

const { width, height } = Dimensions.get('window');

const InputToolbar = ({ messages, handleClearMessages, addMessage }) => {
  const [recordedSpeechSTT, setRecordedSpeechSTT] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isAssistantSpeaking, setIsAssistantSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    recordedSpeechSTT && fetchResults();
  }, [recordedSpeechSTT]);

  useEffect(() => {
    Voice.onSpeechStart = speechStartHandler;
    Voice.onSpeechEnd = speechEndHandler;
    Voice.onSpeechResults = speechResultsHandler;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners());
    };
  }, []);

  const speechStartHandler = async () => {
    stopSpeaking();
    setIsRecording(true);
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Microphone Permission',
          message: 'App needs access to your microphone to record audio.',
          buttonPositive: 'OK',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Microphone permission granted');
      } else {
        console.log('Microphone permission denied');
        Alert.alert(
          'Microphone Access Required',
          'Please grant access to microphone to record your prompt'
        );
      }
    } catch (e) {
      console.log(e);
    }
    console.log('Speech start');
  };
  const speechEndHandler = () => {
    setIsRecording(false);
    console.log('Speech end');
  };
  const speechResultsHandler = (e) => {
    console.log('speech event: ', e);
    setIsRecording(false);
    const userPrompt = e.value[0];
    setRecordedSpeechSTT(userPrompt);
  };

  const speakResults = (textToBeSpoken) => {
    setIsAssistantSpeaking(true);
    speak(textToBeSpoken);
  };
  const stopSpeaking = () => {
    setIsAssistantSpeaking(false);
    stop();
  };

  const fetchResults = async () => {
    try {
      setIsLoading(true);
      let newMessages = [
        ...messages,
        { role: 'user', content: recordedSpeechSTT },
      ];
      addMessage('user', recordedSpeechSTT);
      const res = await openAI(newMessages, recordedSpeechSTT);
      addMessage('assistant', res);
      speakResults(res);
      setIsLoading(false);
    } catch (e) {
      Alert.alert('Error Occured', e?.message || 'Some error occured');
      setIsLoading(false);
    }
  };

  const startRecording = async () => {
    try {
      await Voice.start('en-US');
    } catch (e) {
      console.log(e);
    }
  };
  const stopRecording = async () => {
    try {
      setIsRecording(false);
      setRecordedSpeechSTT('');
      await Voice.stop();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}
    >
      <View style={{ width: 0.2 * width }}>
        {isAssistantSpeaking && (
          <TouchableOpacity
            style={{ backgroundColor: 'red', padding: 10, borderRadius: 20 }}
            onPress={stopSpeaking}
          >
            <Text style={{ color: 'white', textAlign: 'center' }}>Stop</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={{ alignItems: 'center' }}>
        {isLoading ? (
          <Image
            source={require('../assets/images/loading.gif')}
            style={{ height: 0.1 * height, width: 0.1 * height }}
          />
        ) : isRecording ? (
          <TouchableOpacity
            onPress={() => {
              stopRecording();
            }}
          >
            <Image
              source={require('../assets/images/recording.gif')}
              style={{ height: 0.1 * height, width: 0.1 * height }}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              startRecording();
            }}
          >
            <Image
              source={require('../assets/images/recordingIcon.png')}
              style={{ height: 0.1 * height, width: 0.1 * height }}
            />
          </TouchableOpacity>
        )}
      </View>

      <View style={{ width: 0.2 * width }}>
        {messages?.length > 0 && (
          <TouchableOpacity
            style={{
              backgroundColor: 'grey',
              padding: 10,
              borderRadius: 20,
            }}
            onPress={handleClearMessages}
          >
            <Text style={{ color: 'white', textAlign: 'center' }}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default InputToolbar;

const styles = StyleSheet.create({});
