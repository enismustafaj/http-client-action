import { ClientAuthenticator } from "./client_authenticator"
import { AuthHeader } from "./model/auth_header";
import { RequestMetadata } from "./model/request_metadata";

export class HttpClient {

    private static clientInstance: HttpClient | null = null;

    private constructor (
        private clientAuthenticator: ClientAuthenticator,
        private metadata: RequestMetadata
    ){}

    public static getInstance(metadata: RequestMetadata): HttpClient {
        if (! this.clientInstance) {
            this.clientInstance = new HttpClient(new ClientAuthenticator([]), metadata);
            return this.clientInstance
        } else {
            return this.clientInstance;
        }
    }

    async post(url: string): Promise<any> {
        const authHeader: AuthHeader | null= await this.clientAuthenticator.authenticateRequest(this.metadata.auth)

        const headers: [string, string][] = [];

        if (!authHeader) {
            headers.push([authHeader!.name, authHeader!.val])
        }

        const requestResult = await fetch(url, {
            method: "POST",
            body: this.metadata.payload,
            headers: headers
        })

        const requestJson = await requestResult.json();

        return requestJson;
    }

    async get(url: string): Promise<any> {
        const authHeader: AuthHeader | null= await this.clientAuthenticator.authenticateRequest(this.metadata.auth)

        const headers: [string, string][] = [];

        if (!authHeader) {
            headers.push([authHeader!.name, authHeader!.val])
        }

        const requestResult = await fetch(url, {
            method: "GET",
            headers: headers
        })

        const requestJson = await requestResult.json();

        return requestJson;
    }
}
