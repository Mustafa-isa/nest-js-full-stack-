import { User } from '../../auth/entity/auth.entity';
export declare class Task {
    id: number;
    title: string;
    description: string;
    complete: boolean;
    user: User;
    userId: number;
}
