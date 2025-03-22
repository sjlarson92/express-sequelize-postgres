import {Table, Model, Column} from 'sequelize-typescript';

/**
 * overwrite default plural table name and
 * stop auto generation of createdAt and updatedAt fields
 */
@Table({tableName: 'task', timestamps: false})
class Task extends Model {

    @Column
    declare name: string;

    @Column({field: 'is_completed'})
    declare isCompleted: boolean;
}

export default Task;
