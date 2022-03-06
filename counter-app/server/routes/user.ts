import express, { Request, Response } from 'express';
import User from '../models/user'

export const userRouter = express.Router() ;

userRouter.get('/', async (req: Request, res: Response) => {
    try {
        const users: User[] = await User.findAll();
        res.status(200).send(users);
    } catch (e:unknown) {
        if (e instanceof Error) {
            res.status(500).send(e.message)
        }
    }
});


userRouter.post('/login', async (req:Request, res:Response) => {
    try {
        const user = await User.findOne({
            where : {
                userId: req.body.userId,
            }
        })
        if (user) {
            // const user = req.body;
            // const id: number = parseInt(user.id, 10)
            //
            // console.log(new Date().toLocaleString())
            // await User.update({
            //     lastLogin: new Date().toLocaleString()
            // }, {
            //     where: {id: id}
            // })
            res.status(200).send({success: true, created: false, userId: user.userId})
        } else {
            const user = req.body;
            await User.create ( {userId: user.userId})
            res.status(200).json({success: true, created: true, userId: user.userId})
        }
    } catch (e:unknown) {
        if (e instanceof Error) {
            console.log(e.message)
            res.status(500).send(e.message)
        }
    }
})
//
// userRouter.get('/logout', authHandler, async (req:Request, res:Response) => {
//     try {
//         const user = await User.findOne({
//             where : {
//                 userId: req.headers.userId,
//             }
//         })
//         if (user) {
//             await User.update({
//                 token: "",
//             }, {
//                 where: {id: user.id}
//             })
//             res.status(200).send('로그아웃 성공')
//         } else {
//             res.status(404).send("user not found")
//         }
//     } catch (e:unknown) {
//         if (e instanceof Error) {
//             res.status(500).send(e.message)
//         }
//     }
// })

