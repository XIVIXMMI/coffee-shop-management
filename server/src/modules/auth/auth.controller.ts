import { Controller, Get, Post, Body, Patch, Param, Delete, UnauthorizedException, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto/login.dto';
import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FormDataInterceptor } from 'src/third-parties/interceptors/transform.interceptor';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: LoginDto})
  @UseInterceptors(FormDataInterceptor)
  async login(@Body() loginDto: LoginDto): Promise< string > {
    const user = await this.authService.validateUser(loginDto.phone_number, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }
}
