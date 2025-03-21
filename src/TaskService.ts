import {Request, Response} from "express";
import Task from "./database/models/Task";

type TaskRequest = {
    name: string;
}

export const createTask = async (req: Request<{}, {}, TaskRequest>, res: Response) => {
    const {name} = req.body

    /*
    create method combines build and save and builds instance and saves it to DB
     */
    const newTask = Task.create({name: name})

    res.send({message: 'Task created', data: newTask})


}