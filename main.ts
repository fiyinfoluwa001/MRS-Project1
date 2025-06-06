import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
(dotenv).config()
import bodyParser from 'body-parser'
import userRoute from './src/routes/user-routes'
export const app = express()
app.use(express.json())
const PORT = process.env.PORT || 5000
app.use(bodyParser.json())
app.use('/user', userRoute)

app.listen(PORT, async () => {
    console.log(`Successfully connected to ${PORT}`)
})