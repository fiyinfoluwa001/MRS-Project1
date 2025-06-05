import express, {Request, Response} from 'express'

export const badRequest = async ( res: Response, message: string,  statusCode: number = 400) => {
    return res.status(statusCode).send({success: false, message})
}
export const notFound = async (res: Response, message: string, statusCode: number = 404) => {
    return res.status(statusCode).send({success: false, message})
}
export const successRequest = async (res: Response, message: string, data: any, statusCode: number = 200) => {
    return res.status(statusCode).send({success: true, data, message})
} 
export const createRequest = async (res: Response, message: string , data: any, statusCode: number = 201) => {
    return res.status(statusCode).send({success: true, data,  message})
}
export const serverError = async (res: Response, error: unknown, statusCode: number = 500) => {
    console.error('Server Error', error)
    if (error instanceof Error) {
        return res.status(statusCode).send({
          message: 'An unexpected error occurred. Please try again later.',
          error: error.message, 
        });
      }
      return res.status(statusCode).send({message: 'Internal server error'})
}