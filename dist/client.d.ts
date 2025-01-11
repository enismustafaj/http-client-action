import { RequestMetadata } from "./model/request_metadata";
export declare class HttpClient {
    private clientAuthenticator;
    private metadata;
    private static clientInstance;
    private constructor();
    static getInstance(metadata: RequestMetadata): HttpClient;
    post(url: string): Promise<any>;
    get(url: string): Promise<any>;
}
