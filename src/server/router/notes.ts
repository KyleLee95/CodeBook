import { createRouter } from './context'
import { z } from 'zod'
import { resolve } from 'path'

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
  .mutation('updateNoteById', {
    input: z.object({
      id: z.number(),
      title: z.string(),
      text: z.string(),
      code: z.string()
    }),
    async resolve({ ctx, input }) {
      const stringText = JSON.stringify(input.text)
      const test = await ctx.prisma.note.update({
        where: {
          id: input.id
        },
        data: {
          title: input.title,
          text: input.text,
          code: input.code
        }
      })

      return {
        success: true
      }
    }
  })
