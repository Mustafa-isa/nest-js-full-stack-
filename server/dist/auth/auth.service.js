"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const auth_entity_1 = require("./entity/auth.entity");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const scrap_service_1 = require("./scraping/scrap.service");
let AuthService = class AuthService {
    constructor(userRepository, scrapingService) {
        this.userRepository = userRepository;
        this.scrapingService = scrapingService;
        this.jwtSecret = 'yourSecretKey';
    }
    async register(email, password, linkedinProfile) {
        const existingUser = await this.userRepository.findOne({
            where: { email },
        });
        if (existingUser) {
            throw new common_1.NotFoundException('User with this email already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        let linkedinProfileImageUrl = null;
        if (linkedinProfile) {
            try {
                linkedinProfileImageUrl =
                    await this.scrapingService.scrapeUserProfileImage(linkedinProfile);
            }
            catch (error) {
                console.error('Error scraping LinkedIn profile image:', error.message);
            }
        }
        const newUser = this.userRepository.create({
            email,
            password: hashedPassword,
            linkedinProfile: linkedinProfileImageUrl,
        });
        const user = await this.userRepository.save(newUser);
        const token = this.generateJwtToken(user);
        return { token, ...user };
    }
    async login(email, password) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const token = this.generateJwtToken(user);
        return { token, ...user };
    }
    generateJwtToken(user) {
        const payload = { sub: user.id, email: user.email };
        return jwt.sign(payload, this.jwtSecret, { expiresIn: '1h' });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(auth_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        scrap_service_1.ScrapingService])
], AuthService);
//# sourceMappingURL=auth.service.js.map