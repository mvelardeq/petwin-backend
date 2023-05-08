

import express from 'express'
import router from './api/routes/index.js'
import mongoose from './config/mongoose.js'
import * as dotenv from 'dotenv'

dotenv.config()

mongoose()
const app = express ()

app.use(express.json())
app.use(router)


app.listen(3000,()=>{
    console.log('listen on port 3000')
})