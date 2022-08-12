import { createRouter } from './context'
import { z } from 'zod'

export const notesRouter = createRouter().query('getAllNotes', {
  input: z.object({
    userId: z.number()
  }),
  async resolve({ ctx, input }) {
    const notes = await ctx.prisma.note.findMany({
      where: {
        ownerId: input.userId
      }
    })
    return {
      notes
    }
  }
})

// import { createRouter } from "./context";
// import { z } from "zod";

// export const exampleRouter = createRouter()
//   .query("hello", {
//     input: z
//       .object({
//         text: z.string().nullish(),
//       })
//       .nullish(),
//     resolve({ input }) {
//       return {
//         greeting: `Hello ${input?.text ?? "world"}`,
//       };
//     },
//   })
//   .query("getAll", {
//     async resolve({ ctx }) {
//       return await ctx.prisma.example.findMany();
//     },
//   });
