import React, {memo, useState} from 'react';
import {StyleSheet, Dimensions, Text} from 'react-native';
import equals from 'react-fast-compare';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {Theme} from 'styles/Index';
import FeaturedLessonCard from './FeaturedLessonCard';
import {Lesson} from 'codegen/models/Lesson';
import Spacer from 'components/common/Spacer';

interface Props {
  featuredLessons: Lesson[];
  onLessonPressed: (lesson: Lesson) => void;
}

const FeaturedLessonCardCarousel = (props: Props): JSX.Element => {
  const {width: viewportWidth} = Dimensions.get('window');
  const [featuredLessonScrollIndex, setFeaturedLessonScrollIndex] = useState(0);

  return (
    <>
      <Carousel
        containerCustomStyle={{alignSelf: 'center'}}
        vertical={false}
        data={props.featuredLessons}
        renderItem={renderCarouselItem}
        sliderWidth={viewportWidth}
        itemWidth={viewportWidth}
        useScrollView={true}
        useExperimentalSnap={true}
        onScrollIndexChanged={(index: number) =>
          setFeaturedLessonScrollIndex(index)
        }
      />

      {props.featuredLessons?.length <= 1 ? (
        <Spacer vertical={Theme.spacing.spacingS} />
      ) : (
        <Pagination
          containerStyle={styles.pagination}
          dotsLength={props.featuredLessons?.length}
          activeDotIndex={featuredLessonScrollIndex}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          inactiveDotColor={Theme.colors.gray}
          dotColor={Theme.colors.purple}
        />
      )}
    </>
  );

  function renderCarouselItem({item}: {item: Lesson}): JSX.Element {
    return (
      <FeaturedLessonCard
        key={item.id}
        style={styles.lessonCard}
        lesson={item}
        onPress={() => props.onLessonPressed(item)}
      />
    );
  }
};

const styles = StyleSheet.create({
  lessonCard: {
    marginHorizontal: Theme.spacing.spacingM
  },
  pagination: {
    paddingTop: Theme.spacing.spacingXL,
    paddingBottom: Theme.spacing.spacingXS
  }
});

export default memo(FeaturedLessonCardCarousel, equals);
