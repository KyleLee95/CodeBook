import { createRouter } from './context'
import { z } from 'zod'
import fs from 'fs'
import { PythonShell } from 'python-shell'
export const codeEnvironmentsRouter = createRouter()
  .mutation('javascript', {
    input: z.object({
      code: z.string().nullish()
    }),
    async resolve({ input }) {
      return {
        success: true,
        code: input.code
      }
    }
  })
  .mutation('python', {
    input: z.object({
      code: z.string().nullish()
    }),
    async resolve({ input }) {
      fs.writeFileSync('test.py', 'print(1+1)')
      let options = {
        mode: 'text',
        pythonOptions: ['-u'],
        args: [1, 2, 3]
      }
      PythonShell.run('test.py', options, (err, results) => {
        console.log('results:', results)
      })
      return {
        success: true,
        code: input.code
      }
    }
  })
