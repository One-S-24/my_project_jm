import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Role } from '../../../generated/prisma/index.js';

export class CreateUserDto {
  @ApiProperty({
    example: 'juan.perez@example.com',
    description: 'Correo electrónico del usuario',
  })
  @IsEmail({}, { message: 'El correo electrónico debe ser válido' })
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
  email: string;

  @ApiPropertyOptional({
    example: 'Juan Manuel Morales Pérez',
    description: 'Nombre completo del usuario',
  })
  @IsOptional()
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  name?: string;

  @ApiProperty({
    example: 'Password123!',
    description: 'Contraseña de acceso (mínimo 6 caracteres)',
  })
  @IsString()
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;

  @ApiPropertyOptional({
    example: '+50588888888',
    description: 'Número telefónico',
  })
  @IsOptional()
  @IsString({ message: 'El teléfono debe ser una cadena de texto' })
  telephone?: string;

  @ApiPropertyOptional({
    enum: Role,
    default: Role.USER,
    description: 'Rol del usuario dentro del sistema',
  })
  @IsOptional()
  @IsEnum(Role, { message: 'El rol debe ser un valor permitido (USER o ADMIN)' })
  role?: Role;

  @ApiProperty({
    example: 1,
    description: 'ID de la organización/inquilino (Tenant)',
  })
  @IsInt({ message: 'El tenantId debe ser un número entero' })
  @IsNotEmpty({ message: 'El tenantId es obligatorio' })
  tenantId: number;
}