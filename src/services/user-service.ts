import prisma from '../config/prisma'
import {user} from '../interfaces/user-interface'
import bcrypt from 'bcryptjs'
import { generateToken } from '../middleware/authentication'
export const getUserByEmail = async (email: string) => {
    return await prisma.user.findUnique({
        where: {email}
    })
}
export const registerUser = async (body: user) => {
    const {email, name, password} = body
    if (!email || !name || !password) {
        throw new Error ('Please provide the required information')
    }
    const existingUser = await prisma.user.findUnique({
        where: {email}
    })
    if (existingUser) {
        throw new Error ('User with this email already exists.')
    }
    const hashPassword = await bcrypt.hash(password, 10)
    const newuser = await prisma.user.create({
        data: {
            email,
            name,
            password: hashPassword
        }
    })
    return {newuser};
}
export const loginUser = async (email: string, password: string) => {
    const user = await prisma.user.findUnique({
        where: {email}
    })
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid email or password.')
    }
    const token = generateToken(user.id)
    if (!token) {
        throw new Error('Could not generate token, try again later.')
    }
    return {token, user}
}
export const getUser = async (id: string) => {
    if (!id) {
        throw new Error ('Please provide a valid id')
    }
    const user = await prisma.user.findUnique({
        where: {
            id: Number(id)
        },
        select: {
            id: true, 
            email: true,
            name: true, 
            reservations: true 
        }
    })
    if (!user) {
        throw new Error ('Could not get the required user.')
    }
    return user
}
