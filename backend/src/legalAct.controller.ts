import { Controller, Get } from "@nestjs/common";

@Controller('legal-acts')
export class LegalActController {
    @Get()
    findAll() {
        return 'This action returs all legal acts';
    }
}