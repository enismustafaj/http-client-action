import { AuthHeader } from "./model/auth_header";
import { AuthMetadata } from "./model/auth_metadata";
import { AuthStrategy } from "./strategy/auth_strategy";

export class ClientAuthenticator {

    constructor(
        private authStrategies: Array<AuthStrategy>
    ) {

    }

   async authenticateRequest(metadata: AuthMetadata): Promise<AuthHeader | null> {

        if (!metadata.authEnabled) {
            return null;
        }

        const strategy: Array<AuthStrategy> = this.authStrategies.filter(strat => strat.supportStrategy(metadata.authType));

        if (strategy.length == 0) {
            throw new Error("Authentication type was not founded")
        }

        return await strategy[0].autheticate();
    }
}
