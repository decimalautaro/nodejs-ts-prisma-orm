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
    console.log(existEmail)

    if(existEmail) throw new FailError("Error email exists.")
    if(!newUser) throw new FailError("Error user not found.")

    console.log(newUser)
    await prisma.user.create({
        data: newUser
    })

    return res.json(newUser)

} catch (error) {
    next(error)
}
}

const findAll = async (req: Request, res: Response, next: NextFunction)=> {
    try {
        const allUser : Array<IUser> = await prisma.user.findMany()
        res.json(allUser)
        
    } catch (error) {
        next(error)
    }
}

const findById = async (req: Request, res: Response, next: NextFunction)=> {
    try {
        const {id} = req.params

        const user  = await prisma.user.findUnique({where: {id: Number(id)}})
        if(!user) throw new FailError("User not exist.")

        res.json(user)
        
    } catch (error) {
        next(error)
    }
}


export {
    create,
    findAll
}