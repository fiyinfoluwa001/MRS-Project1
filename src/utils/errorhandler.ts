import express, {Request, Response} from 'express'

export const badRequest = async ( res: Response, message: string,  statusCode: number = 400) => {
    return res.status(statusCode).send({success: false, message})
}
export const notFound = async (res: Response, message: string, statusCode: number = 404) => {
    return res.status(statusCode).send({success: false, message})
}
export const successRequest = async (res: Response, message: string, statusCode: number = 200) => {
    return res.status(statusCode).send({success: true, message})
}
export const createRequest = async (res: Response, message: string ,statusCode: number = 201) => {
    return res.status(statusCode).send({success: true, message})
}