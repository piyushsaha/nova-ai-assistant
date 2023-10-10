import { useState } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';

import Features from '../components/Features';
import Messages from '../components/Messages';
import InputToolbar from '../components/InputToolbar';

const { height } = Dimensions.get('window');

const HomeScreen = () => {
  const [messages, setMessages] = useState([]);

  const handleClearMessages = () => {
    setMessages([]);
  };

  const addMessage = (role, content) => {
    setMessages((messages) => {
      const newMessages = [...messages, { role, content }];
      return newMessages;
    });
  };

  return (
    <View style={styles.homeScreenContainer}>
      <View style={styles.botLogoContainer}>
        <Image
          source={require('../assets/images/bot.jpg')}
          style={styles.botLogo}
        />
      </View>
      <View style={styles.mainAreaContainer}>
        {messages.length === 0 ? (
          <Features />
        ) : (
          <Messages messages={messages} />
        )}
      </View>

      <InputToolbar
        messages={messages}
        handleClearMessages={handleClearMessages}
        addMessage={addMessage}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  homeScreenContainer: {
    flex: 1,
    marginHorizontal: 20,
  },
  botLogo: {
    width: 0.15 * height,
    height: 0.15 * height,
  },
  botLogoContainer: {
    alignItems: 'center',
  },
  mainAreaContainer: {
    height: 0.7 * height,
  },
});
