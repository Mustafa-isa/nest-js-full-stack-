import { RegisterService } from './register.service';
export declare class RegisterController {
    private readonly data;
    constructor(data: RegisterService);
    getall(): Promise<import("./entity/register.entity").User[]>;
    crea(body: any): Promise<import("./entity/register.entity").User[]>;
}
