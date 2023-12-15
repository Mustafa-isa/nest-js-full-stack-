import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(email: string, password: string, linkedinProfile?: string): Promise<{
        message: string;
        user: {
            token: string;
        };
    }>;
    login(email: string, password: string): Promise<{
        token: string;
    }>;
}
