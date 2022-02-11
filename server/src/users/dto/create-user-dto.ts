import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
    @ApiProperty({ example: 'custom@email.com', description: 'Почтовый адресс' })
    @IsString({ message: 'Должно быть строкой' })
    @IsEmail({}, { message: 'Некорректный email' })
    readonly email: string;

    @ApiProperty({ example: 'P@$$w0rd', description: 'Пароль пользователя' })
    @IsString({ message: 'Должно быть строкой' })
    @Length(6, 16, { message: 'Пароль должен быть не меньше 6 и не больше 16 символов' })
    readonly password: string;
}