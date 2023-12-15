import { Repository } from 'typeorm';
import { User } from './entity/auth.entity';
export declare class AuthService {
    private readonly userRepository;
    private readonly jwtSecret;
    constructor(userRepository: Repository<User>);
    register(email: string, password: string, linkedinProfile?: string): Promise<{
        token: string;
    }>;
    login(email: string, password: string): Promise<{
        token: string;
    }>;
    private generateJwtToken;
}
