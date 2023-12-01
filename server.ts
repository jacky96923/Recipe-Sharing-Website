import express from "express";
// import { Request, Response } from "express";
import { env } from './env'
// import path from 'path'


const app = express();


app.use(express.static('public'))


app.listen(env.PORT, ()=>{
    console.log(env.PORT)
})