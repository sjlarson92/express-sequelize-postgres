import {Router} from "express";
import {createTask} from "./TaskService";

const taskRouter = Router()

taskRouter.route('/')
    .post(createTask)

taskRouter.route('/:id')

export default taskRouter;

