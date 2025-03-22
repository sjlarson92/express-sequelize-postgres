import {Optional} from 'sequelize';
import {Table, Model} from 'sequelize-typescript';

interface TaskAttributes {
    id: number;
    name: string;
    isCompleted: boolean;
}

interface TaskCreationAttributes extends Optional<TaskAttributes, 'id'> {
}

@Table
class Task extends Model<TaskAttributes, TaskCreationAttributes> {
}

// Task.init(
//     {
//         id: {
//             type: DataTypes.INTEGER,
//             autoIncrement: true,
//             primaryKey: true
//         },
//         name: {
//             type: new DataTypes.STRING(128),
//             allowNull: false
//         },
//         isCompleted: {
//             type: DataTypes.BOOLEAN,
//             defaultValue: false,
//             allowNull: false
//         }
//     },
//     {
//         tableName: 'task',
//         sequelize: dbConnection
//     }
// )

export default Task;
