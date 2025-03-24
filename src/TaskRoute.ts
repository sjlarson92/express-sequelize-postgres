import {Router} from "express";
import {createTask, deleteTaskById, getTaskById, getTasks, updateTaskById} from "./TaskService";

const taskRouter = Router()

taskRouter.route('/')
    .post(createTask)
    .get(getTasks)

taskRouter.route('/:id')
    .get(getTaskById)
    .put(updateTaskById)
    .delete(deleteTaskById)

export default taskRouter;

