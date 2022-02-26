import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Post } from "src/posts/posts.model";
// import { User } from "src/users/users.model";

interface LikeAttributes {
    userId: number;
    postId: number;
}

@Table({ tableName: 'likes' })
export class Like extends Model<Like, LikeAttributes> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ForeignKey(() => Post)
    @Column({ type: DataType.INTEGER })
    postId: number;

    @BelongsTo(() => Post)
    post: Post

    // @ForeignKey(() => User)
    // @Column({ type: DataType.INTEGER })
    // userId: number;

    // @BelongsTo(() => User)
    // author: User    

    sanitizeData() {
        const { id, postId, } = this
        const responseObj = { id, postId,  }
        return responseObj
    }
}