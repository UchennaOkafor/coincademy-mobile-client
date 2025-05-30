import React, {memo} from 'react';
import {StyleSheet, View, ScrollView, RefreshControlProps, StyleProp, TextStyle} from 'react-native';
import equals from 'react-fast-compare';
import {Course} from 'codegen/models/Course';
import TitleSectionHeader from 'components/headers/TitleSectionHeader';
import LessonCard from './LessonCard';
import {Theme} from 'styles/Index';
import {Lesson} from 'codegen';

interface Props {
  courses: Course[];
  onLessonPressed: (lesson: Lesson) => void;
  titleStyle?: StyleProp<TextStyle>;
  refreshControl?: React.ReactElement<RefreshControlProps>;
}

const CourseList = (props: Props): JSX.Element => {
  return (
    <ScrollView
      refreshControl={props.refreshControl}>
      {props.courses.map((course) => {
        return (
          <View key={`course_${course.id}`}>
            <TitleSectionHeader
              title={course.title}
              containerStyle={styles.sectionHeader}
              titleStyle={props.titleStyle}
            />

            {course.lessons.map((lesson, index) => {
              return (
                <LessonCard
                  key={`lesson_${lesson.id}`}
                  lesson={lesson}
                  style={styles.lessonCard}
                  onPress={() => props.onLessonPressed(lesson)}
                />
              );
            })}
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    marginTop: Theme.spacing.spacingM,
    marginBottom: Theme.spacing.spacingS
  },
  lessonCard: {
    marginBottom: Theme.spacing.spacingXS + Theme.spacing.spacing3XS
  }
});

export default memo(CourseList, equals);
