/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ItemType } from './ItemType';

export type BaseLessonItem = {
    type: ItemType;
    id?: string | null;
    title?: string | null;
    narrationAudioUrl?: string | null;
    order?: number;
    createdAt: string;
    updatedAt?: string | null;
};
