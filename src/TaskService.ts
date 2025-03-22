import {Request, Response} from "express";
import Task from "./database/models/Task.model";

type TaskRequest = {
    name: string;
    isCompleted: boolean;
}

export const createTask = async (req: Request<{}, {}, TaskRequest>, res: Response) => {
    console.log('Creating Task!', req)
    const {name} = req.body

    /*
    create method combines build and save and builds instance and saves it to DB
     */
    const newTask = Task.create({
        name: name,
        isCompleted: false
    })

    res.send({message: 'TaskModel created', data: newTask})


}