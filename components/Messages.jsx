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
  return (
    // All messages container
    <View
      style={{
        backgroundColor: 'rgb(229 229 229)',
        marginVertical: 30,
        borderRadius: 20,
        padding: 2,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {messages.map((message) => {
          return (
            // Message container
            <View
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
