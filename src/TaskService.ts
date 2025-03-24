import {Request, Response} from "express";
import Task from "./models/Task.model";

type TaskRequest = {
    name: string;
    isCompleted: boolean;
}

export const getTasks = async (req: Request, res: Response) => {
    console.log('Getting all tasks!')

    /*
     Call to db returns promise so it needs to be awaited!!
     Passing an array of [attribute, direction] to the field order field return be ordered
     and is set to ascending (ASC) by default
     */
    const tasks = await Task.findAll({
        order: [['id', 'ASC']]
    })

    res.send(tasks)
}

export const getTaskById = async (req: Request, res: Response) => {
    const {id} = req.params
    console.log(`Getting task with id: ${id}`)

    const task = await Task.findOne({where: {id}})

    res.send(task)

}

export const createTask = async (req: Request<{}, {}, TaskRequest>, res: Response) => {
    console.log('Creating Task!')
    const {name, isCompleted} = req.body

    /*
    create method combines build and save and builds instance and saves it to DB
     */
    const newTask = await Task.create({
        name,
        isCompleted
    })

    console.log(`Created Task: ${newTask}`)
    res.send(newTask)
}

export const updateTaskById = (req: Request<{ id: string }, {}, TaskRequest>, res: Response) => {
    const {id} = req.params
    const {name, isCompleted} = req.body
    console.log(`Updating Task with id: ${id}`)

    const updatedTask = Task.update(
        {
            name,
            isCompleted
        },
        {where: {id},},
    )

    res.send(updatedTask)
}

export const deleteTaskById = async (req: Request, res: Response) => {
    const {id} = req.params

    console.log(`Deleting Task with id: ${id}`)

    await Task.destroy({where: {id}})

    res.send(`Successfully deleted Task with id: ${id}`)
}

/*

 todo what migration tool do people use for node/sequelize?
 todo create migration (3) (sequelize cli) search: node sequelize database migration
 todo write some tests (unit & integration) do with lucas

 todo now time new app express with mongo db
 */