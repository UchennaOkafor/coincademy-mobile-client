import { useNavigation } from '@react-navigation/native';
import Spacer from 'components/common/Spacer';
import Project from 'models/Project';
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { Theme } from 'styles/Index';
import CourseList from 'components/lessons/CourseList';
import { Course, Lesson, CoursesService } from 'codegen';

interface Props {
	project: Project;
}

const Learn = (props: Props) => {
	const navigation = useNavigation();
	const [courses, setCourses] = useState<Course[]>([]);
	const [loadingFailed, setLoadingFailed] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	
	const onLessonPressed = useCallback(
		(lesson: Lesson) => navigation.navigate('Lesson', { lesson }),
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
		initialize().finally(() => { });
	}, []);
	
	return (
		<ScrollView 
			showsVerticalScrollIndicator={false} 
			style={styles.container}>
			{/* <Text style={styles.courseListTitle}>Learn about Proptee</Text> */}
			<Text style={styles.body}>
				Lorem Ipsum is simply dummy text of the printing and typesetting industry.
			</Text>

			<Spacer vertical={Theme.spacing.spacing2XS} />

			<CourseList
				courses={courses}
				onLessonPressed={onLessonPressed}
				titleStyle={styles.courseListTitle}
			/>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: Theme.colors.transparent,
		padding: Theme.spacing.spacingM,
	},
	body: {
		...Theme.typography.text.body2
	},
	courseListTitle: {
		...Theme.typography.text.h6, 
		...Theme.typography.weight.medium
	}
});

export default Learn;
