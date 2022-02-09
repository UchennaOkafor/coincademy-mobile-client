import {useNavigation} from '@react-navigation/core';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Header from 'components/headers/Header';
import LessonCard from 'components/lessons/LessonCard';
import FeaturedLessonCard from 'components/lessons/FeaturedLessonCard';
import TitleSectionHeader from 'components/headers/TitleSectionHeader';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import { Course, CoursesService, Lesson } from 'codegen';
import { Theme } from 'styles/Index';

const Index = (): JSX.Element => {
  const navigation = useNavigation();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loadingFailed, setLoadingFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [featuredLessonScrollIndex, setFeaturedLessonScrollIndex] = useState(0);
  const {width: viewportWidth} = Dimensions.get('window');

  const initialize = useCallback(async () => {
    try {
      const availableCourses = await CoursesService.getAvailableCourses();
      setCourses(availableCourses);
    } catch (error) {
      setLoadingFailed(true);
      //console.error(error);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    initialize().finally(() => { });
  }, []);

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}>
      <Header title="Hello, Elon 👋" />

      {loadingFailed ? (
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 25 }}>
          <Text style={{ ...Theme.typography.text.h4, textAlign: 'center' }}>Sorry, but we're having trouble loading your content</Text>
          <Text style={{ ...Theme.typography.text.h6, color: Theme.colors.grayDark, marginTop: 10 }}>Please wait and try again later</Text>
        </View>
      ) : (
        <>
          {isLoading ? (
            <ActivityIndicator
              style={{ marginVertical: 20 }}
            />
          ) : (
            <>
              <Text style={styles.spotlightTitle}>Featured Lessons</Text>
              <Carousel
                containerCustomStyle={{ marginHorizontal: -Theme.spacing.spacingM }}
                vertical={false}
                data={courses[0].lessons}
                renderItem={renderCarouselItem}
                sliderWidth={viewportWidth}
                itemWidth={viewportWidth}
                useScrollView={true}
                useExperimentalSnap={true}
                onScrollIndexChanged={(index: number) => setFeaturedLessonScrollIndex(index)}
              />

              <Pagination
                containerStyle={{
                  paddingTop: Theme.spacing.spacingXL,
                  paddingBottom: Theme.spacing.spacingM,
                }}
                dotsLength={courses[0].lessons?.length}
                activeDotIndex={featuredLessonScrollIndex}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
                inactiveDotColor={Theme.colors.gray}
                dotColor={Theme.colors.purple}
              />
            </>
          )}

          {courses.map((course) => {
            return (
              <View key={`course_${course.id}`}>
                <TitleSectionHeader
                  title={course.title ?? ''}
                  rightText="See all"
                  style={styles.sectionHeader}
                />

                {course.lessons.map((lesson, index) => {
                  return (
                    <LessonCard
                      key={`lesson_${lesson.id}`}
                      lesson={lesson}
                      style={{marginBottom: Theme.spacing.spacingXS + Theme.spacing.spacing3XS}}
                      onPress={() => navigation.navigate('Lesson', { lesson })}
                    />
                  );
                })}
              </View>
            );
          })}
        </>
      )}
    </ScrollView>
  );

  function renderCarouselItem({item}: {item: Lesson}): JSX.Element {
    return (
      <View style={{ }}>
        <FeaturedLessonCard
          key={item.id}
          style={{ marginHorizontal: Theme.spacing.spacingM }}
          lesson={item}
          onPress={() => navigation.navigate('Lesson', { lesson: item })} 
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Theme.spacing.spacingM,
    backgroundColor: '#f5f5f7',
  },
  sectionHeader: {
    marginTop: Theme.spacing.spacingM, 
    marginBottom: Theme.spacing.spacingS
  },
  spotlightTitle: {
    ...Theme.typography.text.h5, 
    ...Theme.typography.weight.bold,
    marginBottom: Theme.spacing.spacingXS + Theme.spacing.spacing3XS
  }
});

export default Index;
