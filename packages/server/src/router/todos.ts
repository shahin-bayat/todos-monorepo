import { z } from "zod"
import * as trpc from "@trpc/server"

import { prisma } from "../db/client"

export const todosRouter = trpc
  .router()
  .query("list", {
    async resolve() {
      const todos = await prisma.todo.findMany()
      return { todos }
    },
  })
  .mutation("create", {
    input: z.string(),
    async resolve({ input }) {
      const newTodo = await prisma.todo.create({
        data: {
          label: input,
        },
      })
      return newTodo
    },
  })
