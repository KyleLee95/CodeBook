import { createRouter } from './context'
import { z } from 'zod'

export const notesRouter = createRouter()
  .query('getAllNotes', {
    input: z
      .object({
        searchTerm: z.string()
      })
      .nullish(),
    async resolve({ input, ctx }) {
      console.log('input', input)
      const notes = await ctx.prisma.note.findMany({
        where: {
          userId: ctx.session?.user?.id,
          title: {
            contains: input?.searchTerm ? input.searchTerm : '',
            mode: 'insensitive'
          }
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
      title: z.string().nullish(),
      text: z.string().nullish(),
      code: z.string().nullish()
    }),
    async resolve({ ctx, input }) {
      const updatedNote = await ctx.prisma.note.update({
        where: {
          id: input.id
        },
        data: {
          id: input.id,
          title: input.title || undefined,
          text: input.text || undefined,
          code: input.code || undefined
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
      code: z.string().nullish()
    }),
    async resolve({ ctx }) {
      const newNote = await ctx.prisma.note.create({
        data: {
          user: {
            connect: {
              id: ctx.session?.user?.id
            }
          }
        }
      })

      return {
        ...newNote
      }
    }
  })
