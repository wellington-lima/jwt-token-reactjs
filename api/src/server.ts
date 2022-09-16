import express, { application } from 'express'
import router from './router'
import cors from 'cors'

const app = express()
const port = process.env.PORT || 3333

app.use(express.json())
app.use(cors())

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(router)
app.listen(port, ()=> console.log(`Server started on port ${port}`))