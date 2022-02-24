/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Lesson } from './Lesson';
import type { TimeSpan } from './TimeSpan';

export type Course = {
    id?: string;
    createdAt?: string;
    updatedAt?: string;
    title?: string | null;
    description?: string | null;
    duration?: TimeSpan;
    order?: number;
    readonly durationText?: string | null;
    lessons: Array<Lesson>;
};
