import { Router } from 'express'
import { client } from "./database"
import formidable from 'formidable'
import fs from 'fs'
import { randomUUID } from 'crypto'

export let post_recipeRouter = Router()

//formidable
const uploadDir = 'uploads'
fs.mkdirSync(uploadDir, { recursive: true })

post_recipeRouter.get('/attributes', async (req, res) => {
    try {
        let result1 = await client.query(`select id, name as Diet from diet;`)
        let result2 = await client.query(`select id,name as Allergies FROM allergies;`)
        let result3 = await client.query(`select id, name as avoid from avoid;`)
        let result4 = await client.query(`select id, name as Cuisine from cuisine;`)

        let diet = result1.rows
        let allergies = result2.rows
        let avoid = result3.rows
        let cuisine = result4.rows

        console.log(diet)
        console.log(allergies);
        console.log(avoid)
        console.log(cuisine);
        
        res.json({diet, allergies, avoid, cuisine})
    } catch (error) {
        console.log(`Cannot get recipe attributes from postgreSQL`)
    }
})

post_recipeRouter.post('/submit', (req, res) => {
    console.log('uploading')
    let form = formidable({
      uploadDir,
      keepExtensions: true,
      maxFiles: 1,
    //  filter: part => part.mimetype?.startsWith('image/') || false,
        filter(part) {
        return      part.mimetype?.startsWith('image/')||false
        },
        filename(name, ext, part, form) {
            let uuid = randomUUID()
            let extName = part.mimetype?.split('/').pop()
        return `${uuid}.${extName}`
        },  
    })
    form.parse(req, async(err, fields, files) => {
        console.log({ err, fields, files })
//         if (err) {
//             console.error(err)
//             res.status(500).json({error: 'Error processing form data'})
//         } else {
//             let { recipe_name, Meat, Seafood, Pork, North, calories, content_input } = fields;

// if(!recipe_name||!Meat){
//     res.json({error:"missing form item"})
//     return
// }



//             let { newfilename } = files;
//             await client.query(
//                 `INSERT INTO your_table_name (recipe_name, meat, seafood, pork, north, calories, content_input, image_filepath)
//                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
//                 [recipe_name, Meat, Seafood, Pork, North, calories, content_input, files.image.newfilename]
//               )

            
//         }




        res.json({message:"submit success"})
    // res.redirect('/post_recipes/submit_success.html')
    })
})