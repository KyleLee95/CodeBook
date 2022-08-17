import { createRouter } from './context'
import { z } from 'zod'
import fs from 'fs'
import { PythonShell } from 'python-shell'
import vm from 'vm'
import * as ts from 'typescript'
const pyshell = new PythonShell('./test.py')
export const codeEnvironmentsRouter = createRouter()
  .mutation('typescript', {
    input: z.object({
      code: z.string()
    }),
    async resolve({ input }) {
      let transpiledToJS = ts.transpile(input.code)

      /**
       * vm.runInNewContext runs the user submitted code in a new process.
       * this is a better alternative to using eval() because a new process is isolated from
       * the rest of our code base and does not have access to anything outside of the scope of the new process.
       * this keeps our server safe from any potentially malicious code that might try to take advantage of memory leaks
       * */
      const results = vm.runInNewContext(transpiledToJS)
      return {
        success: true,
        results: results
      }
    }
  })
  .mutation('javascript', {
    input: z.object({
      code: z.string()
    }),
    async resolve({ input }) {
      /**
       * vm.runInNewContext runs the user submitted code in a new process.
       * this is a better alternative to using eval() because a new process is isolated from
       * the rest of our code base and does not have access to anything outside of the scope of the new process.
       * this keeps our server safe from any potentially malicious code that might try to take advantage of memory leaks
       * */

      const results = vm.runInNewContext(input.code)

      return {
        success: true,
        results: results
      }
    }
  })
  .mutation('python', {
    input: z.object({
      code: z.string()
    }),
    async resolve({ input }) {
      //write code to .py file
      fs.writeFileSync('test.py', input.code)
      let options = {
        mode: 'text',
        pythonOptions: ['-u'],
        args: [1, 2, 3]
      }
      let res
      pyshell.on('message', function (message) {
        // received a message sent from the Python script (a simple "print" statement)
        res = message
      })

      return {
        success: true,
        results: res
      }
      // PythonShell.run('test.py', options, (err, results) => {})
    }
  })
