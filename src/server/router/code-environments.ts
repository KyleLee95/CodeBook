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
      // fs.writeFileSync('test.py', input.code)
      // let options = {
      //   mode: 'json',
      //   pythonOptions: ['-u'],
      //   args: [1, 2, 3]
      // }
      let pyshell = new PythonShell('my_script.py')
      // console.log('hit here!')
      let res
      // pyshell.send('hello')
      pyshell.on('message', function (message) {
        // received a message sent from the Python script (a simple "print" statement)
        // console.log(message)
      })

      return {
        success: true,
        results: res
      }
      // PythonShell.run('test.py', options, (err, results) => {})
    }
  })
  .mutation('runCode', {
    input: z.object({
      code: z.string(),
      language: z.string()
    }),
    async resolve({ input }) {
      /**
       *
       * python
       */
      if (input.language === 'python') {
        //write code to .py file
        fs.writeFileSync('test.py', input.code)
        let options = {
          mode: 'text',
          pythonOptions: ['-u'],
          args: [1, 2, 3]
        }
        // let res
        // pyshell.on('message', function (message) {
        //   // received a message sent from the Python script (a simple "print" statement)
        //   res = message
        // })
        // return {
        //   success: true,
        //   results: res
        // }
        let pyshell = new PythonShell('test.py')
        console.log('hit here!')
        let res
        // PythonShell.run('test.py', options, (err, result) => {
        //   if (err) throw err
        //   // result is an array consisting of messages collected
        //   //during execution of script.
        //   console.log('result: ', result?.toString())
        //   return {
        //     success: true,
        //     results: result?.toString()
        //   }
        // })
        // pyshell.on('message', function (message) {
        //   // received a message sent from the Python script (a simple "print" statement)
        //   console.log('hello world!')
        // })
        // pyshell.end(function (err, code, signal) {
        //   if (err) throw err
        //   console.log('The exit code was: ' + code)
        //   console.log('The exit signal was: ' + signal)
        //   console.log('finished')
        // })
      } else if (input.language === 'javascript') {
        /**
         *
         * javascript
         */
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
      } else if (input.language === 'typescript') {
        /**
         *
         * typescirpt
         */

        //transpile the TS to JS
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
      } else {
        return {
          success: true,
          results: ''
        }
      }
    }
  })
