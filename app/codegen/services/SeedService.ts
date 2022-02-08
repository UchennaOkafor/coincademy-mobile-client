/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SeedService {

    /**
     * @returns any Success
     * @throws ApiError
     */
    public static seed(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/seed/seed-content',
        });
    }

}