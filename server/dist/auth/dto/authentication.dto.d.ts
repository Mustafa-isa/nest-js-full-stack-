export declare class AuthenticationDto {
    email: string;
    password: string;
    linkedinProfile?: string;
    constructor(partial: Partial<AuthenticationDto>);
}
