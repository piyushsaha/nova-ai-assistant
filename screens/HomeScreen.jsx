import { Dimensions, Image, StyleSheet, View } from 'react-native';

import Features from '../components/Features';

const { height } = Dimensions.get('window');

const HomeScreen = () => {
  return (
    <View style={styles.homeScreenContainer}>
      <View style={{ alignItems: 'center' }}>
        <Image
          source={require('../assets/images/bot.png')}
          style={styles.botLogo}
        />
      </View>
      <View>
        <Features />
      </View>
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
