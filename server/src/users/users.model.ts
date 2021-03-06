import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Comment } from "src/comments/comments.model";

import { Like } from "src/likes/likes.model";
import { Post } from "src/posts/posts.model"
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";

interface UserAttributes {
    email: string;
    password: string;
}

export type UserSO = {
    id: number;
    email: string;
    roles: Role[];
    posts?: Post[];
    likes?: Like[]
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserAttributes> {
    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;
    
    @ApiProperty({ example: 'custom@email.com', description: 'Почтовый адресс' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string;
    
    @ApiProperty({ example: 'P@$$w0rd', description: 'Пароль пользователя' })
    @Column({ type: DataType.STRING, allowNull: false })
    password: string;
    
    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[]
    
    @HasMany(() => Post, 'userId')
    posts: Post[]

    @HasMany(() => Like)
    likes: Like[]

    @HasMany(() => Comment)
    comments: Comment[]
    
    sanitizeData(): UserSO {
        const { id, email, roles } = this
        const responseObj = { id, email, roles }
        return responseObj
    }
}