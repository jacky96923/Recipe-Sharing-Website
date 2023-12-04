import { Router } from 'express'
import path from 'path'



export let recipeRouter = Router()







recipeRouter.get('/recipes', (req, res)=>{
    let file= path.resolve('public/recipes/recipes.html')
    res.sendFile(file)
    console.log('recipe content')
})