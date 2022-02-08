/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BaseSlide } from './BaseSlide';

export type ContentSlide = (BaseSlide & {
    content?: string | null;
    imageUrl?: string | null;
    videoUrl?: string | null;
    lottieUrl?: string | null;
});
