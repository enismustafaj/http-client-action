import { AuthHeader } from "./model/auth_header";
import { AuthMetadata } from "./model/auth_metadata";
import { AuthStrategy } from "./strategy/auth_strategy";
export declare class ClientAuthenticator {
    private authStrategies;
    constructor(authStrategies: Array<AuthStrategy>);
    authenticateRequest(metadata: AuthMetadata): Promise<AuthHeader | null>;
}
