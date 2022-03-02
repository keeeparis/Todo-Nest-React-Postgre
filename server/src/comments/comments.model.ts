import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Post } from "src/posts/posts.model";
import { User } from "src/users/users.model";

interface CommentsAttributes {
    userId: number;
    postId: number;
    content: string;
}

@Table({ tableName: 'comments' })
export class Comment extends Model<Comment, CommentsAttributes> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    content: string;

    @ForeignKey(() => Post)
    @Column({ type: DataType.INTEGER })
    postId: number;

    @BelongsTo(() => Post)
    post: Post

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number;

    @BelongsTo(() => User)
    author: User    

    sanitizeData() {
        const { id, content, postId, userId } = this
        const responseObj = { id, content, postId, userId }
        return responseObj
    }
}