import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Like } from "src/likes/likes.model";
import { User } from "src/users/users.model";

interface PostAttributes {
    title: string;
    content: string;
    userId: number;
    image?: string;
}

@Table({ tableName: 'posts' })
export class Post extends Model<Post, PostAttributes> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    title: string;

    @Column({ type: DataType.STRING, allowNull: false })
    content: string;

    @Column({ type: DataType.STRING, allowNull: true })
    image: string;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number;

    @BelongsTo(() => User)
    author: User;

    @HasMany(() => Like)
    likes: Like[]

    sanitizeData() {
        const { id, title, content, createdAt, updatedAt, image, userId, author: { email }, likes } = this
        const sanitizedObject = { id, title, content, createdAt, updatedAt, image, userId, email, likes}
        return sanitizedObject
    }
}