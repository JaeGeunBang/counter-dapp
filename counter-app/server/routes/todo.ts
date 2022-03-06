import express, { Request, Response } from 'express';
import Todo from "../models/todo";

export const todoRouter = express.Router() ;

todoRouter.get('/', async (req: Request, res: Response) => {
    try {
        const todos: Todo[] = await Todo.findAll();
        res.status(200).send(todos);
    } catch (e:unknown) {
        if (e instanceof Error) {
            res.status(500).send(e.message)
        }
    }
});

todoRouter.get('/:id', async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10)

    try {
        const todo = await Todo.findOne({
            where : {
                id: id,
            }
        })
        if (todo) {
            return res.status(200).send(todo)
        }
        res.status(404).send("todo not found")
    } catch (e:unknown) {
        if (e instanceof Error) {
            res.status(500).send(e.message)
        }
    }
});

todoRouter.patch('/:id', async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10)

    try {
        const todo = req.body ;
        await Todo.update({
            subject: todo.subject,
            body: todo.body,
            checked: todo.checked
        },{
            where : {
                id: id,
            }
        })
        if (todo) {
            return res.status(200).send(todo)
        }
        res.status(404).send("todo not found")
    } catch (e:unknown) {
        if (e instanceof Error) {
            res.status(500).send(e.message)
        }
    }
});

todoRouter.post('/register', async (req: Request, res: Response) => {
    try {
        const todo = req.body;
        await Todo.create ( {
            subject: todo.subject,
            body: todo.body,
            checked: false
        })
        res.status(200).json({success: true, userId: todo.subject})
    } catch (e:unknown) {
        if (e instanceof Error) {
            res.status(500).send(e.message)
        }
    }
});

todoRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id, 10)
        await Todo.destroy({
            where : {
                id: id,
            }
        })
        res.status(200).send("delete 완료")
    } catch (e:unknown) {
        if (e instanceof Error) {
            res.status(500).send(e.message)
        }
    }
});
