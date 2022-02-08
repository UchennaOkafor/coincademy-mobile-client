/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Choice } from './Choice';
import type { SlideType } from './SlideType';

export type MultipleChoiceQuestionSlide = {
    id: string;
    title?: string | null;
    narrationAudioUrl?: string | null;
    type: SlideType;
    createdAt: string;
    updatedAt?: string | null;
    content?: string | null;
    imageUrl?: string | null;
    videoUrl?: string | null;
    lottieUrl?: string | null;
    falseAnswers?: Array<Choice> | null;
    correctAnswer?: Choice;
};
