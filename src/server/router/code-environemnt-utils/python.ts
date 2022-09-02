import { PythonShell } from 'python-shell'
import fs from 'fs'
const handlePythonCode = async (input: any) => {
  fs.writeFileSync('test.py', input.code)

  let results = await new Promise((resolve, reject) => {
    return PythonShell.run(
      './test.py',
      undefined,
      function (err: any, results: any) {
        // received a message sent from the Python script (a simple "print" statement)
        if (err) {
          console.log('err', err)
          return resolve(err)
        }
        return resolve(results)
      }
    )
  })
  console.log('results', results)
  return {
    success: true,
    results: results
  }
}

export default handlePythonCode
