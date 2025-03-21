import {Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes} from "sequelize";
import dbConnection from "../sequelize";

class Task extends Model<InferAttributes<Task>, InferCreationAttributes<Task>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare isCompleted: boolean;
}

Task.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: new DataTypes.STRING(128),
            allowNull: false
        },
        isCompleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
    },
    {
        tableName: 'task',
        sequelize: dbConnection
    }
)

export default Task;
