import {Model, DataTypes} from "sequelize";
import {sequelize} from "../sequelize";

type TaskAttributes = {
    id: number;
    name: string;
}

class Task extends Model<TaskAttributes> {
    declare id: string;
    declare name: string;
}

Task.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(128),
            allowNull: false
        }
    },
    {
        tableName: 'task',
        sequelize
    }
)

export default Task;

