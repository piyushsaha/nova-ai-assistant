import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';

const { width, height } = Dimensions.get('window');

const Input = ({ messages, handleClearMessages, addMessage }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isAssistantSpeaking, setIsAssistantSpeaking] = useState(false);
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
          >
            <Text style={{ color: 'white', textAlign: 'center' }}>Stop</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={{ alignItems: 'center' }}>
        {isRecording ? (
          <TouchableOpacity
            onPress={() => {
              setIsRecording(false);
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
              setIsRecording(true);
              addMessage({ role: 'user', content: 'ahdshfhjfshj' });
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

export default Input;

const styles = StyleSheet.create({});
