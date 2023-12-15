import { Repository } from 'typeorm';
import { User } from './entity/auth.entity';
import { ScrapingService } from './scraping/scrap.service';
export declare class AuthService {
    private readonly userRepository;
    private readonly scrapingService;
    private readonly jwtSecret;
    constructor(userRepository: Repository<User>, scrapingService: ScrapingService);
    register(email: string, password: string, linkedinProfile?: string): Promise<{
        token: string;
    }>;
    login(email: string, password: string): Promise<{
        token: string;
    }>;
    private generateJwtToken;
}
