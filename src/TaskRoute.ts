import {Router} from "express";
import {createTask, getTasks} from "./TaskService";

const taskRouter = Router()

taskRouter.route('/')
    .post(createTask)
    .get(getTasks)

taskRouter.route('/:id')

export default taskRouter;

