/* tslint:disable */
/* eslint-disable */
/**
 * OpenCraft Instance Manager
 * API for OpenCraft Instance Manager
 *
 * The version of the OpenAPI document: api
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface UserDetail
 */
export interface UserDetail {
    /**
     * 
     * @type {string}
     * @memberof UserDetail
     */
    fullName: string;
    /**
     * This is also the account name, and where we will send important notices.
     * @type {string}
     * @memberof UserDetail
     */
    email?: string;
}

export function UserDetailFromJSON(json: any): UserDetail {
    return UserDetailFromJSONTyped(json, false);
}

export function UserDetailFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserDetail {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'fullName': json['full_name'],
        'email': !exists(json, 'email') ? undefined : json['email'],
    };
}

export function UserDetailToJSON(value?: UserDetail | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'full_name': value.fullName,
        'email': value.email,
    };
}


