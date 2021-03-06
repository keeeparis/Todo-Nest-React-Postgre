import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Like } from "src/likes/likes.model";
import { User } from "src/users/users.model";
import { Comment } from 'src/comments/comments.model'

interface PostAttributes {
    content: string;
    userId: number;
    image?: string;
}

@Table({ tableName: 'posts' })
export class Post extends Model<Post, PostAttributes> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

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

    @HasMany(() => Comment)
    comments: Comment[]

    sanitizeData() {
        const { id,  content, createdAt, updatedAt, image, userId, author: { email }, likes, comments } = this
        // const [num_likes, num_comments] = [likes.length, comments.length]
        const sanitizedObject = { id,  content, createdAt, updatedAt, image, userId, email, likes, comments }
        return sanitizedObject
    }
}