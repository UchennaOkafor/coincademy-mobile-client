/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BaseSlide } from './BaseSlide';
import type { ContentSlide } from './ContentSlide';
import type { MultipleChoiceQuestionSlide } from './MultipleChoiceQuestionSlide';
import type { TimeSpan } from './TimeSpan';

export type Lesson = {
    id?: string;
    createdAt?: string;
    updatedAt?: string;
    title?: string | null;
    description?: string | null;
    duration?: TimeSpan;
    readonly durationText?: string | null;
    smallPosterUrl?: string | null;
    largePosterUrl?: string | null;
    readonly slides: Array<(BaseSlide | ContentSlide | MultipleChoiceQuestionSlide)>;
};
