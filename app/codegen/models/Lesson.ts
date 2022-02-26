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
    smallPosterUrl?: string | null;
    largePosterUrl?: string | null;
    order?: number;
    items: Array<(BaseLessonItem | ContentItem | MultipleChoiceQuestionItem)>;
};
