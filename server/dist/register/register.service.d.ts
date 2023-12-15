import { User } from './entity/register.entity';
import { Repository } from 'typeorm';
export declare class RegisterService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    findAll(): Promise<User[]>;
    create(body: any): Promise<User[]>;
}
