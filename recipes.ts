import { Router } from 'express'
import express from "express";



export let recipeRouter = Router()





recipeRouter.use(express.static('public'));
