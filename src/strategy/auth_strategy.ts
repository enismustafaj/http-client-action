import { AuthHeader } from "../model/auth_header";

export abstract class AuthStrategy {
    abstract supportStrategy(strategy: string): boolean

    abstract autheticate(): Promise<AuthHeader>
}