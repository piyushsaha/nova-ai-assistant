import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';

const { width, height } = Dimensions.get('window');

const features = [
  {
    icon: require('../assets/images/chatgptIcon.png'),
    backgroundColor: 'rgb(167 243 208)',
    title: 'ChatGPT',
    description:
      'ChatGPT can provide you with instant and knowledgeable responses, assist you with creative ideas on a wide range of topics.',
  },
  {
    icon: require('../assets/images/dalleIcon.png'),
    backgroundColor: 'rgb(233 213 255)',
    title: 'DALL-E',
    description:
      'DALL-E can generate imaginative and diverse images from textual descriptions, expanding the boundaries of visual creativity.',
  },
];

const Features = () => {
  return (
    <View showsVerticalScrollIndicator={false}>
      <View style={styles.featuresContainer}>
        <Text style={styles.titleText}>Features</Text>
        {features.map((feature) => {
          return (
            <View
              key={feature.title}
              style={[
                styles.featureCard,
                { backgroundColor: feature.backgroundColor },
              ]}
            >
              <View style={styles.featureIconAndTitleContainer}>
                <Image source={feature.icon} style={styles.featureIcon} />
                <Text style={styles.featureTitle}>{feature.title}</Text>
              </View>
              <Text style={styles.featureDescription}>
                {feature.description}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default Features;

const styles = StyleSheet.create({
  featuresContainer: {
    marginTop: 10,
  },
  titleText: {
    fontSize: 0.065 * width,
    color: 'rgb(55 , 65, 81)',
  },
  featureCard: {
    marginVertical: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  featureIconAndTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureIcon: {
    width: 40,
    height: 40,
    marginRight: 20,
  },
  featureTitle: {
    fontSize: 0.045 * width,
    color: 'rgb(55 , 65, 81)',
  },
  featureDescription: {
    color: 'rgb(55 , 65, 81)',
    marginTop: 5,
  },
});
