import core from "@actions/core"

import { AuthHeader } from "../model/auth_header";
import { AuthStrategyEnum } from "../model/auth_strategy_enum";
import { AuthStrategy } from "./auth_strategy";

export class ClientCredentialsFlow extends AuthStrategy {

    supportStrategy(strategy: string): boolean {
        return strategy === AuthStrategyEnum.CLIENT_CREDENTIALS.toString()
    }

    async autheticate(): Promise<AuthHeader> {
        const tokenUrl = core.getInput("token-url")
        const clientId = core.getInput("client_id")
        const clientSecret = core.getInput("client_secret");

        const requestBody = new URLSearchParams();
        requestBody.set("client_id", clientId)
        requestBody.set("client_secret", clientSecret)

        const tokesResult = await fetch(tokenUrl, {
            method: "POST",
            headers: [
                ['Content-Type', 'application/x-www-form-urlencoded']
            ],
            body: requestBody.toString()
        })

        const tokenJson = await tokesResult.json()

        return {
            name: "Bearer",
            val: tokenJson["access_token"]
        }
    }
}