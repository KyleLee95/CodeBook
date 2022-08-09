// src/server/router/index.ts
import { createRouter } from './context'
import superjson from 'superjson'

import { exampleRouter } from './example'
import { codeEnvironmentsRouter } from './code-environments'
export const appRouter = createRouter()
  .transformer(superjson)
  .merge('example.', exampleRouter)
  .merge('codeEnvironments.', codeEnvironmentsRouter)

// export type definition of API
export type AppRouter = typeof appRouter
