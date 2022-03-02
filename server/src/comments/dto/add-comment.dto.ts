import { IsNumber, IsString } from "class-validator";

export class addCommentDto {
    @IsNumber({}, { message: 'Должно быть числом' })
    readonly postId: number;
    
    @IsNumber({}, { message: 'Должно быть числом' })
    readonly userId: number;
    
    @IsString({ message: 'Должно быть строкой' })
    readonly content: string;
}