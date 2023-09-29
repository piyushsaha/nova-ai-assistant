import { useState } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';

import Features from '../components/Features';
import Messages from '../components/Messages';

const { height } = Dimensions.get('window');
const dummyMessages = [
  {
    role: 'user',
    content: 'How are you?',
  },
  {
    role: 'assistant',
    content: "I'm fine, How may i help you today.",
  },
  {
    role: 'user',
    content: 'How are you?',
  },
  {
    role: 'assistant',
    content: "I'm fine, How may i help you today.",
  },
  {
    role: 'user',
    content: 'create an image of a dog playing with cat',
  },
  {
    role: 'assistant',
    content:
      'https://storage.googleapis.com/pai-images/ae74b3002bfe4b538493ca7aedb6a300.jpeg',
  },
];

const HomeScreen = () => {
  const [messages, setMessages] = useState(dummyMessages);
  return (
    <View style={styles.homeScreenContainer}>
      <View style={{ alignItems: 'center' }}>
        <Image
          source={require('../assets/images/bot.png')}
          style={styles.botLogo}
        />
      </View>
      {messages.length === 0 ? <Features /> : <Messages messages={messages} />}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  homeScreenContainer: {
    flex: 1,
  },
  botLogo: {
    width: 0.15 * height,
    height: 0.15 * height,
  },
});
