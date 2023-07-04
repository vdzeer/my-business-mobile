import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { AuthButton } from '../../components/AuthButton/AuthButtton';
const stages = [
  {
    text: 'Quick solution for your business.',
    withIcon: true,
    image: require('../../assets/intro/first.png'),
    buttonText: 'Next',
  },
  {
    text: 'Create, manage, analyze in one place.',
    withIcon: true,
    image: require('../../assets/intro/second.png'),
    buttonText: 'Next',
  },
  {
    text: 'Let’s start managing \nyour business',
    withIcon: false,
    image: require('../../assets/intro/third.png'),
    buttonText: 'Go to authorization',
  },
];

export const Introduction = () => {
  const [stage, setStage] = useState(0);

  const onPressAuthButton = () => {
    stage !== 2 ? setStage(prev => prev + 1) : setStage(prev => prev - 1);
  };
  return (
    <View style={styles.container}>
      <Image
        source={stages[stage].image}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.textWrapper}>
        <Text style={styles.introText}>{stages[stage].text}</Text>
      </View>
      <View style={styles.buttonWrapper}>
        <AuthButton
          text={stages[stage].buttonText}
          onPress={onPressAuthButton}
          withIcon={stages[stage].withIcon}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  image: { width: '100%', height: '100%' },
  introText: {
    fontSize: 28,
    fontFamily: 'Montserrat',
    fontWeight: '700',
    color: '#FFFFFF',
  },
  textWrapper: {
    position: 'absolute',
    bottom: 110,
    left: 20,
  },
  buttonWrapper: {
    position: 'absolute',
    bottom: 40,
    left: 20,
  },
});
