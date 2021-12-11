/* tslint:disable */
/* eslint-disable */
/**
 * One Message
 * One Message用API
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import { Configuration } from './configuration';
import globalAxios, { AxiosPromise, AxiosInstance } from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from './common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from './base';

/**
 * 初期登録時のユーザー情報
 * @export
 * @interface CreateMeRequest
 */
export interface CreateMeRequest {
    /**
     * ユーザーネーム
     * @type {string}
     * @memberof CreateMeRequest
     */
    name: string;
    /**
     * メールアドレス
     * @type {string}
     * @memberof CreateMeRequest
     */
    email: string;
    /**
     * パスワード
     * @type {string}
     * @memberof CreateMeRequest
     */
    password: string;
}
/**
 * Twitterのアクセストークン
 * @export
 * @interface CreateTwitterAccessTokenRequest
 */
export interface CreateTwitterAccessTokenRequest {
    /**
     * Twitterのアクセストークン
     * @type {string}
     * @memberof CreateTwitterAccessTokenRequest
     */
    accessToken: string;
    /**
     * Twitterのアクセス用秘密鍵
     * @type {string}
     * @memberof CreateTwitterAccessTokenRequest
     */
    secretKey?: string;
}
/**
 * ユーザー情報
 * @export
 * @interface GetMeResponse
 */
export interface GetMeResponse {
    /**
     * ID
     * @type {string}
     * @memberof GetMeResponse
     */
    id: string;
    /**
     * ニックネーム
     * @type {string}
     * @memberof GetMeResponse
     */
    name?: string;
    /**
     * メールアドレス
     * @type {string}
     * @memberof GetMeResponse
     */
    email?: string;
}
/**
 * Twitterのフォロワー一覧
 * @export
 * @interface GetTwitterAccountFollowersResponse
 */
export interface GetTwitterAccountFollowersResponse {
    /**
     * 全てのフォロワー数
     * @type {number}
     * @memberof GetTwitterAccountFollowersResponse
     */
    total: number;
    /**
     * フォロワー一覧
     * @type {Array<GetTwitterAccountFollowersResponseFollowers>}
     * @memberof GetTwitterAccountFollowersResponse
     */
    followers: Array<GetTwitterAccountFollowersResponseFollowers>;
}
/**
 * フォロワー情報
 * @export
 * @interface GetTwitterAccountFollowersResponseFollowers
 */
export interface GetTwitterAccountFollowersResponseFollowers {
    /**
     * ユーザーID
     * @type {number}
     * @memberof GetTwitterAccountFollowersResponseFollowers
     */
    id: number;
    /**
     * アカウント名
     * @type {string}
     * @memberof GetTwitterAccountFollowersResponseFollowers
     */
    screenName: string;
    /**
     * アカウントページのURL
     * @type {string}
     * @memberof GetTwitterAccountFollowersResponseFollowers
     */
    accountUrl: string;
}
/**
 * Twitterのアカウント情報
 * @export
 * @interface GetTwitterAccountResponse
 */
export interface GetTwitterAccountResponse {
    /**
     * アカウント名
     * @type {string}
     * @memberof GetTwitterAccountResponse
     */
    screenName: string;
    /**
     * アカウントアイコン画像
     * @type {string}
     * @memberof GetTwitterAccountResponse
     */
    profileImageURL: string;
    /**
     * アカウントページのURL
     * @type {string}
     * @memberof GetTwitterAccountResponse
     */
    accountUrl: string;
}
/**
 * 初期登録時のユーザー情報
 * @export
 * @interface LoginRequest
 */
export interface LoginRequest {
    /**
     * メールアドレス
     * @type {string}
     * @memberof LoginRequest
     */
    email: string;
    /**
     * パスワード
     * @type {string}
     * @memberof LoginRequest
     */
    password: string;
}
/**
 * DM送信情報
 * @export
 * @interface PostDmRequest
 */
export interface PostDmRequest {
    /**
     * メッセージ
     * @type {string}
     * @memberof PostDmRequest
     */
    message: string;
    /**
     * 送信先
     * @type {Array<PostDmRequestSendingAddresses>}
     * @memberof PostDmRequest
     */
    sendingAddresses: Array<PostDmRequestSendingAddresses>;
}
/**
 * 送信先のユーザー情報
 * @export
 * @interface PostDmRequestAddresses
 */
export interface PostDmRequestAddresses {
    /**
     * 送信先のユーザーID
     * @type {string}
     * @memberof PostDmRequestAddresses
     */
    id: string;
}
/**
 * プラットフォームごとの送信先一覧
 * @export
 * @interface PostDmRequestSendingAddresses
 */
export interface PostDmRequestSendingAddresses {
    /**
     * プラットフォームの種類
     * @type {string}
     * @memberof PostDmRequestSendingAddresses
     */
    platformType: PostDmRequestSendingAddressesPlatformTypeEnum;
    /**
     * 送信先一覧
     * @type {Array<PostDmRequestAddresses>}
     * @memberof PostDmRequestSendingAddresses
     */
    addresses: Array<PostDmRequestAddresses>;
}

/**
    * @export
    * @enum {string}
    */
export enum PostDmRequestSendingAddressesPlatformTypeEnum {
    Twitter = 'twitter'
}


/**
 * AuthApi - axios parameter creator
 * @export
 */
export const AuthApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * ログイン
         * @summary ログイン
         * @param {LoginRequest} loginRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        login: async (loginRequest: LoginRequest, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'loginRequest' is not null or undefined
            assertParamExists('login', 'loginRequest', loginRequest)
            const localVarPath = `/login`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(loginRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * AuthApi - functional programming interface
 * @export
 */
export const AuthApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = AuthApiAxiosParamCreator(configuration)
    return {
        /**
         * ログイン
         * @summary ログイン
         * @param {LoginRequest} loginRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async login(loginRequest: LoginRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.login(loginRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * AuthApi - factory interface
 * @export
 */
export const AuthApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = AuthApiFp(configuration)
    return {
        /**
         * ログイン
         * @summary ログイン
         * @param {LoginRequest} loginRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        login(loginRequest: LoginRequest, options?: any): AxiosPromise<void> {
            return localVarFp.login(loginRequest, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * AuthApi - object-oriented interface
 * @export
 * @class AuthApi
 * @extends {BaseAPI}
 */
export class AuthApi extends BaseAPI {
    /**
     * ログイン
     * @summary ログイン
     * @param {LoginRequest} loginRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthApi
     */
    public login(loginRequest: LoginRequest, options?: any) {
        return AuthApiFp(this.configuration).login(loginRequest, options).then((request) => request(this.axios, this.basePath));
    }
}


/**
 * DmApi - axios parameter creator
 * @export
 */
export const DmApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * dmを送信
         * @summary dm送信
         * @param {PostDmRequest} postDmRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        postDm: async (postDmRequest: PostDmRequest, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'postDmRequest' is not null or undefined
            assertParamExists('postDm', 'postDmRequest', postDmRequest)
            const localVarPath = `/dm`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(postDmRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * DmApi - functional programming interface
 * @export
 */
export const DmApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = DmApiAxiosParamCreator(configuration)
    return {
        /**
         * dmを送信
         * @summary dm送信
         * @param {PostDmRequest} postDmRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async postDm(postDmRequest: PostDmRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.postDm(postDmRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * DmApi - factory interface
 * @export
 */
export const DmApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = DmApiFp(configuration)
    return {
        /**
         * dmを送信
         * @summary dm送信
         * @param {PostDmRequest} postDmRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        postDm(postDmRequest: PostDmRequest, options?: any): AxiosPromise<void> {
            return localVarFp.postDm(postDmRequest, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * DmApi - object-oriented interface
 * @export
 * @class DmApi
 * @extends {BaseAPI}
 */
export class DmApi extends BaseAPI {
    /**
     * dmを送信
     * @summary dm送信
     * @param {PostDmRequest} postDmRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DmApi
     */
    public postDm(postDmRequest: PostDmRequest, options?: any) {
        return DmApiFp(this.configuration).postDm(postDmRequest, options).then((request) => request(this.axios, this.basePath));
    }
}


/**
 * TwitterApi - axios parameter creator
 * @export
 */
export const TwitterApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Firebaseから取得した、アクセストークンを登録する
         * @summary アクセストークンの登録
         * @param {CreateTwitterAccessTokenRequest} createTwitterAccessTokenRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createTwitterAccessToken: async (createTwitterAccessTokenRequest: CreateTwitterAccessTokenRequest, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'createTwitterAccessTokenRequest' is not null or undefined
            assertParamExists('createTwitterAccessToken', 'createTwitterAccessTokenRequest', createTwitterAccessTokenRequest)
            const localVarPath = `/twitter/auth`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Authorization required
            await setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration)


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(createTwitterAccessTokenRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * アクセストークンを削除
         * @summary twitterアクセストークンを削除
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteTwitterAccessToken: async (options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/twitter/auth`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Authorization required
            await setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * ユーザーのTwitter情報を取得
         * @summary ユーザーのTwitter情報を取得
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getTwitterAccount: async (options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/twitter/account`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Authorization required
            await setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * ユーザーのTwitterアカウントのフォロワー情報の取得
         * @summary Twitterアカウントのフォロワー情報の取得
         * @param {number} [offset] フォロワーの取得開始位置 指定されない場合は、0から開始される 
         * @param {number} [limit] フォロワーの取得数 指定されない場合は、最大量まで取得される 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getTwitterAccountFollowers: async (offset?: number, limit?: number, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/twitter/account/followers`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Authorization required
            await setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration)

            if (offset !== undefined) {
                localVarQueryParameter['offset'] = offset;
            }

            if (limit !== undefined) {
                localVarQueryParameter['limit'] = limit;
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * TwitterApi - functional programming interface
 * @export
 */
export const TwitterApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = TwitterApiAxiosParamCreator(configuration)
    return {
        /**
         * Firebaseから取得した、アクセストークンを登録する
         * @summary アクセストークンの登録
         * @param {CreateTwitterAccessTokenRequest} createTwitterAccessTokenRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createTwitterAccessToken(createTwitterAccessTokenRequest: CreateTwitterAccessTokenRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.createTwitterAccessToken(createTwitterAccessTokenRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * アクセストークンを削除
         * @summary twitterアクセストークンを削除
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteTwitterAccessToken(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.deleteTwitterAccessToken(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * ユーザーのTwitter情報を取得
         * @summary ユーザーのTwitter情報を取得
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getTwitterAccount(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GetTwitterAccountResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getTwitterAccount(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * ユーザーのTwitterアカウントのフォロワー情報の取得
         * @summary Twitterアカウントのフォロワー情報の取得
         * @param {number} [offset] フォロワーの取得開始位置 指定されない場合は、0から開始される 
         * @param {number} [limit] フォロワーの取得数 指定されない場合は、最大量まで取得される 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getTwitterAccountFollowers(offset?: number, limit?: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GetTwitterAccountFollowersResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getTwitterAccountFollowers(offset, limit, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * TwitterApi - factory interface
 * @export
 */
export const TwitterApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = TwitterApiFp(configuration)
    return {
        /**
         * Firebaseから取得した、アクセストークンを登録する
         * @summary アクセストークンの登録
         * @param {CreateTwitterAccessTokenRequest} createTwitterAccessTokenRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createTwitterAccessToken(createTwitterAccessTokenRequest: CreateTwitterAccessTokenRequest, options?: any): AxiosPromise<void> {
            return localVarFp.createTwitterAccessToken(createTwitterAccessTokenRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * アクセストークンを削除
         * @summary twitterアクセストークンを削除
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteTwitterAccessToken(options?: any): AxiosPromise<void> {
            return localVarFp.deleteTwitterAccessToken(options).then((request) => request(axios, basePath));
        },
        /**
         * ユーザーのTwitter情報を取得
         * @summary ユーザーのTwitter情報を取得
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getTwitterAccount(options?: any): AxiosPromise<GetTwitterAccountResponse> {
            return localVarFp.getTwitterAccount(options).then((request) => request(axios, basePath));
        },
        /**
         * ユーザーのTwitterアカウントのフォロワー情報の取得
         * @summary Twitterアカウントのフォロワー情報の取得
         * @param {number} [offset] フォロワーの取得開始位置 指定されない場合は、0から開始される 
         * @param {number} [limit] フォロワーの取得数 指定されない場合は、最大量まで取得される 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getTwitterAccountFollowers(offset?: number, limit?: number, options?: any): AxiosPromise<GetTwitterAccountFollowersResponse> {
            return localVarFp.getTwitterAccountFollowers(offset, limit, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * TwitterApi - object-oriented interface
 * @export
 * @class TwitterApi
 * @extends {BaseAPI}
 */
export class TwitterApi extends BaseAPI {
    /**
     * Firebaseから取得した、アクセストークンを登録する
     * @summary アクセストークンの登録
     * @param {CreateTwitterAccessTokenRequest} createTwitterAccessTokenRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TwitterApi
     */
    public createTwitterAccessToken(createTwitterAccessTokenRequest: CreateTwitterAccessTokenRequest, options?: any) {
        return TwitterApiFp(this.configuration).createTwitterAccessToken(createTwitterAccessTokenRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * アクセストークンを削除
     * @summary twitterアクセストークンを削除
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TwitterApi
     */
    public deleteTwitterAccessToken(options?: any) {
        return TwitterApiFp(this.configuration).deleteTwitterAccessToken(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * ユーザーのTwitter情報を取得
     * @summary ユーザーのTwitter情報を取得
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TwitterApi
     */
    public getTwitterAccount(options?: any) {
        return TwitterApiFp(this.configuration).getTwitterAccount(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * ユーザーのTwitterアカウントのフォロワー情報の取得
     * @summary Twitterアカウントのフォロワー情報の取得
     * @param {number} [offset] フォロワーの取得開始位置 指定されない場合は、0から開始される 
     * @param {number} [limit] フォロワーの取得数 指定されない場合は、最大量まで取得される 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TwitterApi
     */
    public getTwitterAccountFollowers(offset?: number, limit?: number, options?: any) {
        return TwitterApiFp(this.configuration).getTwitterAccountFollowers(offset, limit, options).then((request) => request(this.axios, this.basePath));
    }
}


/**
 * UserApi - axios parameter creator
 * @export
 */
export const UserApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * ユーザー情報を新規登録
         * @summary ユーザー情報登録
         * @param {CreateMeRequest} createMeRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createMe: async (createMeRequest: CreateMeRequest, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'createMeRequest' is not null or undefined
            assertParamExists('createMe', 'createMeRequest', createMeRequest)
            const localVarPath = `/register`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(createMeRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * ユーザー情報を習得
         * @summary ユーザー情報取得
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getMe: async (options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/me`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Authorization required
            await setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * UserApi - functional programming interface
 * @export
 */
export const UserApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = UserApiAxiosParamCreator(configuration)
    return {
        /**
         * ユーザー情報を新規登録
         * @summary ユーザー情報登録
         * @param {CreateMeRequest} createMeRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createMe(createMeRequest: CreateMeRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.createMe(createMeRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * ユーザー情報を習得
         * @summary ユーザー情報取得
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getMe(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GetMeResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getMe(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * UserApi - factory interface
 * @export
 */
export const UserApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = UserApiFp(configuration)
    return {
        /**
         * ユーザー情報を新規登録
         * @summary ユーザー情報登録
         * @param {CreateMeRequest} createMeRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createMe(createMeRequest: CreateMeRequest, options?: any): AxiosPromise<void> {
            return localVarFp.createMe(createMeRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * ユーザー情報を習得
         * @summary ユーザー情報取得
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getMe(options?: any): AxiosPromise<GetMeResponse> {
            return localVarFp.getMe(options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * UserApi - object-oriented interface
 * @export
 * @class UserApi
 * @extends {BaseAPI}
 */
export class UserApi extends BaseAPI {
    /**
     * ユーザー情報を新規登録
     * @summary ユーザー情報登録
     * @param {CreateMeRequest} createMeRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApi
     */
    public createMe(createMeRequest: CreateMeRequest, options?: any) {
        return UserApiFp(this.configuration).createMe(createMeRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * ユーザー情報を習得
     * @summary ユーザー情報取得
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApi
     */
    public getMe(options?: any) {
        return UserApiFp(this.configuration).getMe(options).then((request) => request(this.axios, this.basePath));
    }
}


