import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from './prisma/prisma.service.js';
import { LoginDto } from './auth/dto/login.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async validateUser(user: LoginDto) {
    try {
      const foundUser = await this.prisma.user.findUnique({
        where: { email: user.email },
      });

      if (!foundUser) {
        throw new UnauthorizedException('Usuario no encontrado');
      }

      const isPasswordValid = await bcrypt.compare(
        user.password,
        foundUser.password,
      );

      if (!isPasswordValid) {
        throw new UnauthorizedException('Contraseña incorrecta');
      }

      const token = this.jwtService.sign({
        id: foundUser.id,
        email: foundUser.email,
      });

      return {
        access_token: token,
        user: {
          id: foundUser.id,
          email: foundUser.email,
        },
      };
    } catch (error) {
      console.error('Error detallado en validateUser:', error);
      throw error;
    }
  }
}
