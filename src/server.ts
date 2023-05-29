//npx tsx src/server.ts ou npm run dev pois criei no package.json ao invés de node src/server.ts pois o node não reconhece tipagem
import 'dotenv/config' // to use env.proces.variable name
import fastify from 'fastify';
import cors from '@fastify/cors'// for safety
import jwt from '@fastify/jwt' // for creating jwt token
import multipart from '@fastify/multipart'; //support images
import { memoriesRoutes } from './routes/memories';
import { authRoutes } from './routes/auth';
import { uploadRoutes } from './routes/upload';
import { resolve } from 'node:path';

const app = fastify()

// HTTP Method: GET, POST, PUT, DELETE

// para testar outras rotas além do GET, basta usar HTTPie ou Postman etc

app.register(multipart) // or app.register(require('@fastify/multipart'))

app.register(require('@fastify/static'), { // to get the images by URL
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads/',
})

app.register(cors, {
  origin: true // todas URLs de front-end poderão acessar o nosso back-end
  //origin: ['http://seila.com.br/oi'] // todas URLs escolhidas de front-end poderão acessar o nosso back-end
})

app.register(jwt, {
  secret: 'spacetime', //should be a random string
})

app.register(uploadRoutes)
app.register(memoriesRoutes)
app.register(authRoutes)

app.listen({
  port: 3333,
  host: '0.0.0.0', // to work on mobile
}).then(() => {
  console.log('HTTP server running on http://localhost:3333')
})