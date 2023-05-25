import "@fastify/jwt"
// this is used to type the varibales in jwt token
declare module "@fastify/jwt" {
  export interface FastifyJWT {
    user: {
      sub: string,
      name: string,
      avatarUrl: number
    }
  }
}