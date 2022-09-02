import vm from 'vm'
import { Script, createContext } from 'vm'

const handleJavascriptCode = (input: any) => {
  /**
   * vm.runInNewContext runs the user submitted code in a new process.
   * this is a better alternative to using eval() because a new process is isolated from
   * the rest of our code base and does not have access to anything outside of the scope of the new process.
   * this keeps our server safe from any potentially malicious code that might try to take advantage of memory leaks
   * */

  let contextObj = {
    console: {
      log: (...args) => {
        console.log(...args)
      }
    }
  }

  const vmContext = createContext(contextObj)
  const script = new Script(input.code)

  const results = script.runInContext(vmContext)
  // const results = vm.runInNewContext(input.code)
  // const results = vm.runInThisContext(input.code)

  return {
    success: true,
    stdout: script,
    results: results
  }
}

export default handleJavascriptCode
