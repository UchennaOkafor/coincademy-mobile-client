/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Choice } from './Choice';
import type { ItemType } from './ItemType';

export type MultipleChoiceQuestionItem = {
    id?: string | null;
    title?: string | null;
    narrationAudioUrl?: string | null;
    order?: number;
    type: ItemType;
    createdAt: string;
    updatedAt?: string | null;
    content?: string | null;
    imageUrl?: string | null;
    videoUrl?: string | null;
    lottieUrl?: string | null;
    falseAnswers?: Array<Choice> | null;
    correctAnswer?: Choice;
};
