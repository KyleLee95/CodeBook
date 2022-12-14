import vm from 'vm'
import { transpile } from 'typescript'

const handleTypescriptCode = (input: any) => {
  const transpiledToJS = transpile(input.code)

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

export default handleTypescriptCode
