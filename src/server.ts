//npx tsx src/server.ts ou npm run dev pois criei no package.json ao invés de node src/server.ts pois o node não reconhece tipagem

import fastify from 'fastify';
import cors from '@fastify/cors'// for safety
import { memoriesRoutes } from './routes/memories';

const app = fastify()

// HTTP Method: GET, POST, PUT, DELETE

// para testar outras rotas além do GET, basta usar HTTPie ou Postman etc

app.register(cors, {
  origin: true // todas URLs de front-end poderão acessar o nosso back-end
  //origin: ['http://seila.com.br/oi'] // todas URLs escolhidas de front-end poderão acessar o nosso back-end
})
app.register(memoriesRoutes)

app.listen({
  port: 3333,
}).then(() => {
  console.log('HTTP server running on http://localhost:3333')
})