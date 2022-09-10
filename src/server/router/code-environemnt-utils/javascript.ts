import { NodeVM } from 'vm2'

const handleJavascriptCode = async (input: any) => {
  /**
   * vm.runInNewContext runs the user submitted code in a new process.
   * this is a better alternative to using eval() because a new process is isolated from
   * the rest of our code base and does not have access to anything outside of the scope of the new process.
   * this keeps our server safe from any potentially malicious code that might try to take advantage of memory leaks
   * */

  const vm = new NodeVM({
    require: {
      external: true,
      root: './'
    }
  })

  const a = await vm.run(input.code, 'vm.js')

  return {
    success: true,
    results: ''
  }
}

export default handleJavascriptCode
