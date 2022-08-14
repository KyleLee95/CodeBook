import { createRouter } from './context'
import { z } from 'zod'

export const notesRouter = createRouter()
  .query('getAllNotes', {
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
  .query('getNoteById', {
    input: z.object({
      noteId: z.number()
    }),
    async resolve({ ctx, input }) {
      const note = await ctx.prisma.note.findUnique({
        where: {
          id: input.noteId
        }
      })

      return {
        note
      }
    }
  })
