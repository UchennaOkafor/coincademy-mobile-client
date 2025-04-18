import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {useNavigation} from '@react-navigation/native';
import OnboardingCarouselItem from '@models/OnboardingCarouselItem';
import OnboardingData from 'resources/OnboardingData';
import GradientButton from 'components/buttons/GradientButton';
import Button from 'components/buttons/Button';
import {Theme} from 'styles/Index';

const Onboarding = (): JSX.Element => {
  const navigation = useNavigation();

  const [carouselIndex, setCarouselIndex] = useState(0);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);
  const carousel = useRef<Carousel<OnboardingCarouselItem>>(null);
  const dimensions = useWindowDimensions();

  const onboardingData = OnboardingData.getCarouselItems();

  useEffect(() => {
    setHasReachedEnd(carouselIndex === onboardingData.length - 1);
  }, [carouselIndex]);

  return (
    <View style={styles.container}>
      <View>
        <Carousel
          containerCustomStyle={styles.carouselContainer}
          vertical={false}
          ref={carousel}
          data={onboardingData}
          renderItem={renderCarouselItem}
          sliderWidth={dimensions.width}
          itemWidth={dimensions.width - 10}
          onScrollIndexChanged={(index: number) => setCarouselIndex(index)}
          useScrollView={false}
        />
      </View>

      <Pagination
        containerStyle={styles.paginationContainer}
        dotsLength={onboardingData.length}
        activeDotIndex={carouselIndex}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        inactiveDotColor={Theme.colors.gray}
        dotColor={Theme.colors.purple}
      />

      {!hasReachedEnd ? (
        <Button
          text="Next"
          onPress={() => carousel.current?.snapToNext()}
        />
      ) : (
        <GradientButton
          text="Get Started"
          onPress={navigateToLogin}
        />
      )}

      <TouchableOpacity
        disabled={hasReachedEnd}
        style={styles.skipTextContainer}
        onPress={navigateToLogin}>
        <Text style={[styles.skipText, {opacity: hasReachedEnd ? 0 : 1}]}>
          Skip
        </Text>
      </TouchableOpacity>
    </View>
  );

  function navigateToLogin(): void {
    navigation.navigate('Login');
  }

  function renderCarouselItem({
    item
  }: {
    item: OnboardingCarouselItem;
  }): JSX.Element {
    return (
      <View style={styles.carouselItemContainer}>
        <Image
          source={{uri: item.uri}}
          resizeMode="contain"
          style={styles.carouselItemImage}
        />
        <Text style={styles.carouselItemTitle}>{item.title}</Text>
        <Text style={styles.carouselItemDescription}>{item.description}</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.colors.white,
    paddingHorizontal: Theme.spacing.spacingXL
  },
  carouselContainer: {
    flexGrow: 0
  },
  carouselItemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.spacingM
  },
  carouselItemImage: {
    width: 450,
    height: 300
  },
  carouselItemTitle: {
    ...Theme.typography.text.h2,
    color: Theme.colors.grayDark900,
    marginTop: Theme.spacing.spacingM
  },
  carouselItemDescription: {
    ...Theme.typography.text.body,
    marginTop: Theme.spacing.spacingXS,
    textAlign: 'center',
    paddingHorizontal: Theme.spacing.spacingM
  },
  paginationContainer: {
    marginBottom: Theme.spacing.spacingS
  },
  skipTextContainer: {
    marginTop: Theme.spacing.spacing2XS
  },
  skipText: {
    ...Theme.typography.text.h6,
    color: Theme.colors.grayDark,
    textDecorationLine: 'underline',
    marginTop: Theme.spacing.spacingS
  }
});

export default Onboarding;
