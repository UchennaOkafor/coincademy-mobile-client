/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SlideType } from './SlideType';

export type BaseSlide = {
    type: SlideType;
    id: string;
    title?: string | null;
    narrationAudioUrl?: string | null;
    order?: number;
    createdAt: string;
    updatedAt?: string | null;
};
