import { 
    CreationOptional,
    InferAttributes,
    InferCreationAttributes
 } from "sequelize";
 import { 
    AllowNull,
    BelongsTo,
    Column,
    CreatedAt,
    DataType,
    ForeignKey,
    Model,
    Table,
    UpdatedAt
} from "sequelize-typescript";
import User from "./User";

@Table({
    tableName: "posts",
    modelName: "Post",
})
export default class Post extends Model<
    InferAttributes<Post>,
    InferCreationAttributes<Post>
> {
    @Column({
        primaryKey: true,
        type: DataType.BIGINT,
        autoIncrement: true,
    })
    declare id: CreationOptional<number>;  

    @ForeignKey(() => User)
    @Column({
        type: DataType.BIGINT,
    })
    declare user_id: number;

    @AllowNull(false)
    @Column({
        validate: {
            len: [1, 100],
        },
    })
    declare title: string;

    @AllowNull(false)
    @Column({
        type: DataType.TEXT,
    })
    declare content: string;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    declare published: CreationOptional<boolean>;

    @CreatedAt
    declare created_at: CreationOptional<Date>;

    @UpdatedAt
    declare updated_at: CreationOptional<Date>;

    @BelongsTo(() => User)
    declare author?: InferAttributes<User>;
} 