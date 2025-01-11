import { AuthHeader } from "../model/auth_header";
export declare abstract class AuthStrategy {
    abstract supportStrategy(strategy: string): boolean;
    abstract autheticate(): Promise<AuthHeader>;
}
