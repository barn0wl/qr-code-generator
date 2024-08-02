import express from "express"
import bodyParser from "body-parser"
import { generateCode, requestParams } from "./main.js"


const app = express()

//middleware

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//routes

app.get('/', async (req, res) => {
    const body : requestParams = req.body
    generateCode(body)
    .then(url => res.status(200).json(url))
    .catch(err => console.log(err))
  })

//start the server

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})