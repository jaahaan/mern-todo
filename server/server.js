const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/UserRoute')
const todoRoutes = require('./routes/TodoRoute')

const cors = require('cors')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(cors())
// const corsOptions = {
//     origin: '*',
//     credentials: true,
//     optionSuccessStatus: 200
// }
// app.use(cors(corsOptions))

//routes
app.use('/api/user', userRoutes)
app.use('/todos', todoRoutes)


mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
        console.log(`Connected To MongoDB`)
        app.listen(PORT, () => {
        console.log(`Listening on : ${PORT}`)
        })
    }).catch((err) => console.log(err))

