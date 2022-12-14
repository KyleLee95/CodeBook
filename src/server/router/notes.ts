import { createRouter } from './context'
import { z } from 'zod'

export const notesRouter = createRouter()
  .query('getAllNotes', {
    input: z.object({
      searchTerm: z.string()
    }),

    async resolve({ input, ctx }) {
      const notes = await ctx.prisma.note.findMany({
        where: {
          userId: ctx.session?.user?.id,
          OR: [
            {
              title: {
                contains: input?.searchTerm ? input.searchTerm : '',
                mode: 'insensitive'
              }
            },
            {
              text: {
                contains: input?.searchTerm ? input.searchTerm : '',
                mode: 'insensitive'
              }
            },
            {
              code: {
                contains: input?.searchTerm ? input.searchTerm : '',
                mode: 'insensitive'
              }
            }
          ]
        },
        orderBy: {
          updatedAt: 'desc'
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
      code: z.string().nullish(),
      language: z.string().nullish()
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
          code: input.code || undefined,
          language: input.language || undefined
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
      language: z.string().nullish()
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
  .mutation('deleteNote', {
    input: z.object({
      id: z.number()
    }),
    async resolve({ input, ctx }) {
      const deleteNote = await ctx.prisma.note.delete({
        where: {
          id: input.id
        }
      })
      return { success: true }
    }
  })
