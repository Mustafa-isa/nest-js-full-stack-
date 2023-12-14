import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RegisterService } from './register.service';

@Controller('register')
export class RegisterController {
  public data = new RegisterService();
  @Get()
  getall() {
    return this.data.findAll();
  }

  @Get(':id')
  sendId(@Param('id') id: string): string {
    return this.data.findOne(id);
  }

  @Post()
  takeData(@Body('prompt') body) {
    return body;
  }
}
