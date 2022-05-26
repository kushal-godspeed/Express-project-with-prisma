import { PrismaClient } from '@prisma/client'
import express from 'express'
import Ajv, {JSONSchemaType} from "ajv"
const ajv = new Ajv()


const app = express()

app.use(express.json())

// ...  REST API routes will go here
app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany()
    res.json(users)
  })


  
  app.post(`/pg/create/user`, async (req, res) => {
    const result = await prisma.user.create({
      data: { ...req.body },
    })
    res.json(result)
  })
  
//AJV Validaor

interface MyData {
    name: string
    email: string
}

const schema: JSONSchemaType<MyData> = {
  type: "object",
  properties: {
    name: {type: "string"},
    email: {type: "string"}
  },
  required: ["name"],
  additionalProperties: false
}
const validate = ajv.compile(schema)

const data = {
  name: "Kushal",
  email: "kushal@gmail.com"
}

if (validate(data)) {
  // data is MyData here
  console.log(data.name)
} else {
  console.log(validate.errors)
}

app.listen(3000, () =>
  console.log('REST API server ready at: http://localhost:3000'),
)


const prisma = new PrismaClient()

async function main() {

 }

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect())