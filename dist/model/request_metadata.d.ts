import { AuthMetadata } from "./auth_metadata";
export interface RequestMetadata {
    payload: any;
    auth: AuthMetadata;
}
