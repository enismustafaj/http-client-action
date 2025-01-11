import { AuthHeader } from "../model/auth_header";
import { AuthStrategy } from "./auth_strategy";
export declare class ClientCredentialsFlow extends AuthStrategy {
    supportStrategy(strategy: string): boolean;
    autheticate(): Promise<AuthHeader>;
}
