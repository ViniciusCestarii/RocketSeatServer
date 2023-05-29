import { randomUUID } from "node:crypto"
import { extname, resolve } from "node:path"
import { FastifyInstance } from "fastify"
import { createWriteStream } from "node:fs"
import { pipeline } from "node:stream"
import { promisify } from "node:util"

const pump = promisify(pipeline)

export async function uploadRoutes(app : FastifyInstance) {
  app.addHook('preHandler', async (request) => {
    await request.jwtVerify() //verify the jwt token
  })

  app.post('/upload', async (request, reply) => {
    const upload = await request.file({
      limits: {
        fileSize: 5_242_880, //5mb
      }
    })

    if(!upload) {
      return reply.status(400).send() //bad request
    }

    const mimeTypeRegex = /^(image|video)\/[a-zA-Z]+/
    const isValidFileFormat = mimeTypeRegex.test(upload.mimetype)

    if(!isValidFileFormat){
      return reply.status(400).send()
    }

    const fileId = randomUUID()

    const extension = extname(upload.filename)

    const fileName = fileId.concat(extension)

    // stream upload data gradually
    const writeStream = createWriteStream(
      resolve(__dirname, '../../uploads/', fileName) //where i want to save the upload
    )

    // the best way to do this is using an external server like:
    // Amazon S3, Google GCS, Cloudflare R2

      await pump(upload.file, writeStream)

      const fullUrl = request.protocol.concat('://').concat(request.hostname)
      const fileUrl = new URL(`/uploads/${fileName}`, fullUrl.toString())

      return { fileUrl }
  })
}