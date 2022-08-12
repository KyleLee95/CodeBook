// src/server/router/index.ts
import { createRouter } from './context'
import superjson from 'superjson'

import { codeEnvironmentsRouter } from './code-environments'
import { notesRouter } from './notes'
export const appRouter = createRouter()
  .transformer(superjson)
  .merge('codeEnvironments.', codeEnvironmentsRouter)
  .merge('notes.', notesRouter)

// export type definition of API
export type AppRouter = typeof appRouter
