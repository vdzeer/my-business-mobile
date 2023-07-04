import React, { useCallback, useRef, useState } from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import { AuthButton } from '../../components/AuthButton/AuthButton';
import AppIntroSlider from 'react-native-app-intro-slider';
import { IntroductionProps, Slide } from './types';

const slides: Slide[] = [
  {
    key: 1,
    text: 'Quick solution for your business.',
    image: require('../../assets/intro/first.png'),
  },
  {
    key: 2,
    text: 'Create, manage, analyze in one place.',
    image: require('../../assets/intro/second.png'),
  },
  {
    key: 3,
    text: 'Let’s start managing \nyour business',
    image: require('../../assets/intro/third.png'),
  },
];

export const Introduction: React.FC<IntroductionProps> = () => {
  const sliderRef = useRef<AppIntroSlider>(null);
  const [index, setIndex] = useState<number>(0);

  const goToNextSlide = useCallback(() => {
    sliderRef.current?.goToSlide(index + 1);
    setIndex(prev => prev + 1);
  }, [index]);

  const renderItem = useCallback(
    ({ item }: { item: Slide }) => (
      <>
        <Image source={item.image} style={styles.image} resizeMode="cover" />
        <View style={styles.textWrapper}>
          <Text style={styles.introText}>{item.text}</Text>
        </View>
      </>
    ),
    [],
  );

  const handleSlideChange = useCallback((index: number) => {
    setIndex(index);
  }, []);

  return (
    <View style={styles.container}>
      <AppIntroSlider
        ref={sliderRef}
        renderItem={renderItem}
        data={slides}
        activeDotStyle={{ display: 'none' }}
        dotStyle={{ display: 'none' }}
        onSlideChange={handleSlideChange}
        showDoneButton={false}
        showNextButton={false}
      />

      <View style={styles.buttonWrapper}>
        <AuthButton
          text={index === 2 ? 'Go to authorization' : 'Next'}
          onPress={index === 2 ? () => {} : goToNextSlide}
          withIcon={index !== 2}
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
    bottom: 150,
    left: 20,
  },
  buttonWrapper: {
    position: 'absolute',
    bottom: 40,
    left: 20,
  },
});
