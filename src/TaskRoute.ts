import {Router} from "express";
import {createTask, getTaskById, getTasks} from "./TaskService";

const taskRouter = Router()

taskRouter.route('/')
    .post(createTask)
    .get(getTasks)

taskRouter.route('/:id')
    .get(getTaskById)
    .put()
    .delete()

export default taskRouter;

