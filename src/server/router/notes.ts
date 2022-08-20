import { createRouter } from './context'
import { z } from 'zod'
import { resolve } from 'path'

export const notesRouter = createRouter()
  .query('getAllNotes', {
    input: z.object({
      userId: z.string()
    }),
    async resolve({ ctx, input }) {
      const notes = await ctx.prisma.note.findMany({
        where: {
          userId: input.userId
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
        ...note
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
      const updatedNote = await ctx.prisma.note.update({
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
        ...updatedNote
      }
    }
  })
  .mutation('createNote', {
    input: z.object({
      id: z.number().nullish(),
      title: z.string().nullish(),
      text: z.string().nullish(),
      code: z.string().nullish(),
      userId: z.number().nullish()
    }),
    async resolve({ ctx, input }) {
      // const newNote = await ctx.prisma.note.create({
      //   data: {}
      // })
      // // update({
      // //   where: {
      // //     id: input.id
      // //   },
      // //   data: {
      // //     title: input.title,
      // //     text: input.text,
      // //     code: input.code
      // //   }
      // // })
      // return {
      //   ...newNote
      // }
    }
  })
