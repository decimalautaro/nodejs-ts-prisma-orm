import { NextFunction, Request, Response } from 'express';
import {PrismaClient} from '@prisma/client'

import FailError from '../errors/FailError';
import {IUser} from '../interface/User'

const prisma = new PrismaClient()

const create = async (req: Request, res: Response, next: NextFunction)=> {
try {
    const {name, lastname, email} = req.body
    const newUser: IUser = {
        name,
        lastname,
        email
    }
    const existEmail = await prisma.user.findUnique({where: {email : newUser.email}})

    if(existEmail) throw new FailError("Error email exists.")
    if(!newUser) throw new FailError("Error user not found.")

    await prisma.user.create({
        data: newUser
    })

    return res.status(201).json(newUser)

} catch (error) {
    next(error)
}
}

const findAll = async (req: Request, res: Response, next: NextFunction)=> {
    try {
        const allUser : Array<IUser> = await prisma.user.findMany()
        res.status(200).json(allUser)
        
    } catch (error) {
        next(error)
    }
}

const findById = async (req: Request, res: Response, next: NextFunction)=> {
    try {
        const {id} = req.params

        const user  = await prisma.user.findUnique({where: {id: Number(id)}})
        if(!user) throw new FailError("User not exist.")

        res.status(200).json(user)
        
    } catch (error) {
        next(error)
    }
}

const remove = async (req: Request, res: Response, next: NextFunction)=> {
    try {
        const {id} = req.params

        const user  = await prisma.user.findUnique({where: {id: Number(id)}})
        if(!user) throw new FailError("User not exist.")

        await prisma.user.delete({where:{id: Number(id)}})

        res.sendStatus(204)
        
    } catch (error) {
        next(error)
    }
}

const update = async (req: Request, res: Response, next: NextFunction)=> {
    try {
        const {id} = req.params
        const data = req.body

        const user = await prisma.user.findFirst({where: {id: Number(id)}})

        if (!user) throw new FailError('error user not found')
        if (data.email === user.email) throw new FailError("Error email exist.")
        
        const updatedUser = { ...user, ...data };
      
       delete updatedUser.id

        await prisma.user.update({where:{id: user.id}, data:updatedUser});
        return res.status(200).json(updatedUser);

    } catch (error) {
        next(error)
    }
}

export {
    create,
    findAll,
    findById,
    remove,
    update
}