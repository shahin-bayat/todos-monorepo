import express from "express"
import * as trpc from "@trpc/server"
import * as trpcExpress from "@trpc/server/adapters/express"
import cors from "cors"
import superjson from "superjson"

import { todosRouter } from "./router/todos"

export const appRouter = trpc
  .router()
  .transformer(superjson)
  .merge("todos.", todosRouter)

// export type definition of API
export type AppRouter = typeof appRouter

const app = express()
const port = 8080

app.use(cors())
app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: () => null,
  })
)

app.get("/", (req, res) => {
  res.send("Hello from server")
})

app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`)
})
