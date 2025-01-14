export interface IAuthenticator {
    login(): Promise<void>;
}