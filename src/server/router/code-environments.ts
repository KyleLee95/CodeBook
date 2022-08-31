import { createRouter } from './context'
import { z } from 'zod'
import handleJavascriptCode from './code-environemnt-utils/javascript'
import handlePythonCode from './code-environemnt-utils/python'
import handleTypescriptCode from './code-environemnt-utils/typescript'

export const codeEnvironmentsRouter = createRouter().mutation('runCode', {
  input: z.object({
    code: z.string(),
    language: z.string()
  }),
  async resolve({ input }) {
    const python = 'python'
    const javascript = 'javascript'
    const typescript = 'typescript'

    if (input.language === python) {
      return handlePythonCode(input)
    } else if (input.language === javascript) {
      return handleJavascriptCode(input)
    } else if (input.language === typescript) {
      return handleTypescriptCode(input)
    } else {
      return {
        success: true,
        results: 'No results'
      }
    }
  }
})
