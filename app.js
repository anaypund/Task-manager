const express = require('express')
const app = express()
const tasks = require('./routes/main')
const connectDB=require('./db/connect')
const NotFound=require('./middlewares/not-found')
require('dotenv').config()

app.use(express.json())
app.use(express.static('./public'))
app.use("/api/v1/tasks", tasks)
app.use(NotFound)

const port =process.env.PORT || 3000

const start=async()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        console.log('DataBase connected...')
        app.listen(port, ()=>{
            console.log(`listening on port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}
start()
