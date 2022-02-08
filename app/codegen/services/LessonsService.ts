/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Lesson } from '../models/Lesson';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class LessonsService {

    /**
     * @returns Lesson Success
     * @throws ApiError
     */
    public static getFeaturedLessons(): CancelablePromise<Lesson> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/lessons/get-featured-lessons',
        });
    }

}