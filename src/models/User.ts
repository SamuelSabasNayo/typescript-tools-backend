import { 
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
} from "sequelize";
import { 
    AllowNull,
    Column,
    CreatedAt,
    DataType,
    HasMany,
    IsEmail,
    Model,
    Table,
    Unique,
    UpdatedAt
} from "sequelize-typescript";
import Post from "./Post";

@Table({
    tableName: "users",
    modelName: "User",
})

export default class User extends Model<
    InferAttributes<User>,
    InferCreationAttributes<User>
> {
    @Column({
        primaryKey: true,
        type: DataType.BIGINT,
        autoIncrement: true,
    })
    declare id: CreationOptional<number>;

    @AllowNull(false)
    @Column({
        validate: {
            len: [3, 100],
        },
    })
    declare name: string;

    @AllowNull(false)
    @IsEmail
    @Unique
    @Column
    set email(value: string) {
        this.setDataValue("email", value ? value.toLocaleLowerCase() :value);
    }

    @CreatedAt
    declare created_at: CreationOptional<Date>;
    
    @UpdatedAt
    declare updated_at: CreationOptional<Date>;

    @HasMany(() => Post)
    declare posts?: InferAttributes<Post>[];

    public toJSON(): any {
        return {
            ...this.get(),
            created_at: undefined,
            updated_at: undefined,
        }
    }
}