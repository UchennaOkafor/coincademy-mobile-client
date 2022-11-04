import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Header from 'components/headers/Header';
import {Course, CoursesService, Lesson} from 'codegen';
import {Theme} from 'styles/Index';
import CourseList from 'components/lessons/CourseList';
import FeaturedLessonCardCarousel from 'components/lessons/FeaturedLessonCardCarousel';
import { getAuth } from 'firebase/auth';
import Spacer from 'components/common/Spacer';
import BaseLayout from 'components/layout/BaseLayout';

const Index = (): JSX.Element => {
  const navigation = useNavigation();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loadingFailed, setLoadingFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onLessonPressed = useCallback(
    (lesson: Lesson) => navigation.navigate('Lesson', {lesson}),
    []
  );

  const initialize = useCallback(async () => {
    try {
      const availableCourses = await CoursesService.getAvailableCourses();
      setCourses(availableCourses);
    } catch (error) {
      setLoadingFailed(true);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    initialize().finally(() => {});
  }, []);

  return (
    <BaseLayout 
      scrollable={true}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={async () => {
            setIsRefreshing(true);
            await initialize();
            setIsRefreshing(false);
          }}
        />
      }>
      <Header
        title='Learn'
        user={getAuth().currentUser}
        onProfilePress={() => navigation.navigate('Profile')}
        onSettingsPress={() => navigation.navigate('Settings')}
      />
      {loadingFailed ? (
        <View style={styles.loadingFailedContainer}>
          <Text style={styles.loadingFailedTitle}>
            Sorry, but we're having trouble loading your content
          </Text>
          <Text style={styles.loadingFailedSubtitle}>
            Please wait and try again later
          </Text>
        </View>
      ) : (
        <>
          {isLoading ? (
            <ActivityIndicator
              color={Theme.colors.purple}
              style={styles.loadingIndicator}
            />
          ) : (
            <>
              <Text style={styles.spotlightTitle}>Featured Lessons</Text>
              <FeaturedLessonCardCarousel
                featuredLessons={courses[1].lessons}
                onLessonPressed={onLessonPressed}
              />
            </>
          )}

          <CourseList
            courses={courses}
            onLessonPressed={onLessonPressed}
          />
          <Spacer vertical={Theme.spacing.spacingM} />
        </>
      )}
    </BaseLayout>
  );
};

const styles = StyleSheet.create({
  spotlightTitle: {
    ...Theme.typography.text.h5,
    ...Theme.typography.weight.bold,
    marginTop: Theme.spacing.spacingM,
    marginBottom: Theme.spacing.spacingXS + Theme.spacing.spacing3XS,
    textAlign: 'left'
  },
  loadingFailedContainer: {
    alignItems: 'center',
    marginTop: Theme.spacing.spacingXL
  },
  loadingFailedTitle: {
    ...Theme.typography.text.h4,
    textAlign: 'center'
  },
  loadingFailedSubtitle: {
    ...Theme.typography.text.h6,
    color: Theme.colors.grayDark,
    marginTop: Theme.spacing.spacingXS
  },
  loadingIndicator: {
    marginTop: Theme.spacing.spacingXL
  }
});

export default Index;
