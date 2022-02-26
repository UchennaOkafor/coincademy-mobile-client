/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BaseLessonItem } from './BaseLessonItem';

export type ContentItem = (BaseLessonItem & {
    content?: string | null;
    imageUrl?: string | null;
    videoUrl?: string | null;
    lottieUrl?: string | null;
});
