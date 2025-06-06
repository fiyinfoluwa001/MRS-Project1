import { registerUser, getUser, loginUser, getUserByEmail } from "../services/user-service";
import express, {Request, Response}  from 'express'
import { badRequest, notFound, createRequest, successRequest, serverError } from "../utils/errorhandler";
import { parseArgs } from "util";
export const handleRegisterUser = async (req: Request, res: Response): Promise<any> => {
    const {email, name, password} = req.body
    if (!email || !name || !password) {
        return badRequest(res, 'Please provide the required information.', 400)
    }
    try {
        const newUser = await registerUser({email, password, name})
        if (!newUser) {
            return badRequest(res, 'Could not register new user, please try again later.')
        }
        createRequest(res, 'Successfully registered new user', newUser, 201)
    }   catch (err) {
        return serverError(res, err, 500)
    }
}
export const handleLoginUser = async (req: Request, res: Response): Promise<any> => {
    const {email, password} = req.body
    if (!email || !password) {
        return badRequest(res, 'Provide your email and password in order to login.', 400)
    }
    try {
        const login = await loginUser(email, password)
        if (!login) {
            return badRequest(res, 'Could not log user in.', 400)
        }
        return successRequest(res, 'Succesfully log the user in.', login, 200)
    }   catch (err) {
        return serverError(res, err, 500)
    }
}
export const handleGetUser = async (req: Request, res: Response): Promise<any> => {
    const {id} = req.params
    if (!id) {
        return badRequest(res, 'Please provide a valid ID')
    }
    try {
        const users = await getUser(id)
        if (!users) {
            return badRequest(res, 'Could not get the user.')
        }  
        return successRequest(res, 'Successfully got the user.', users, 200) 
    }   catch (err) {
        return serverError(res, err, 500)
    }
}