//npx tsx src/server.ts ou npm run dev pois criei no package.json ao invés de node src/server.ts pois o node não reconhece tipagem

import fastify from 'fastify';
import { PrismaClient } from '@prisma/client';

const app = fastify()
const prisma = new PrismaClient()

// HTTP Method: GET, POST, PUT, DELETE

// para testar outras rotas além do GET, basta usar HTTPie ou Postman etc
app.get('/users', async () =>{
  const users = await prisma.user.findMany()
  console.log(users)
  return users
})

app.post('/post', () =>{
  return 'Hello World'
})

app.listen({
  port: 3333,
}).then(() => {
  console.log('HTTP server running on http://localhost:3333')
})