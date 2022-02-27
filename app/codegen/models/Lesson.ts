/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BaseLessonItem } from './BaseLessonItem';
import type { ContentItem } from './ContentItem';
import type { MultipleChoiceQuestionItem } from './MultipleChoiceQuestionItem';
import type { TimeSpan } from './TimeSpan';

export type Lesson = {
    id?: string | null;
    title?: string | null;
    description?: string | null;
    duration?: TimeSpan;
    readonly durationText?: string | null;
    iconUrl?: string | null;
    coverUrl?: string | null;
    order?: number;
    contents: Array<(BaseLessonItem | ContentItem | MultipleChoiceQuestionItem)>;
};
