import {Request, Response} from "express";
import Task from "./models/Task.model";

type TaskRequest = {
    name: string;
    isCompleted: boolean;
}

export const getTasks = async (req: Request, res: Response) => {
    console.log('Getting all tasks!')

    // Call to db returns promise so it needs to be awaited!!
    const tasks = await Task.findAll()

    res.send(tasks)
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

/*
 todo GetById, DeleteById, UpdateById


 todo what migration tool do people use for node/sequelize?
 todo create migration (3) (sequelize cli) search: node sequelize database migration
 todo write some tests (unit & integration) do with lucas

 todo now time new app express with mongo db
 */