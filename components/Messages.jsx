import { useEffect, useRef } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const Messages = ({ messages }) => {
  const messagesContainerRef = useRef();

  // Scroll to the end (latest messages) whenever the messages change
  useEffect(() => {
    messagesContainerRef?.current?.scrollToEnd({ animate: true });
  }, [messages]);

  return (
    // All messages container
    <View
      style={{
        backgroundColor: 'rgb(229 229 229)',
        marginVertical: 30,
        borderRadius: 20,
        padding: 2,
        flex: 1,
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        ref={messagesContainerRef}
      >
        {messages.map((message, index) => {
          return (
            // Message container
            <View
              key={index}
              style={{
                backgroundColor:
                  message.role === 'user' ? 'white' : 'rgb(167 243 208)',
                maxWidth: 0.7 * width,
                alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start',
                marginVertical: 10,
                marginHorizontal: 10,
                borderRadius: 20,
                borderTopRightRadius: message.role === 'user' ? 0 : 20,
                borderTopLeftRadius: message.role === 'assistant' ? 0 : 20,
                padding: 10,
              }}
            >
              {/* Display image if the response from assistant is a URL, else the message */}
              {message.role === 'assistant' &&
              message.content.startsWith('http') ? (
                <Image
                  source={{ uri: message.content }}
                  resizeMode='contain'
                  style={{
                    height: 0.6 * width,
                    width: 0.6 * width,
                    borderRadius: 10,
                  }}
                />
              ) : (
                <Text>{message.content}</Text>
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Messages;

const styles = StyleSheet.create({});
