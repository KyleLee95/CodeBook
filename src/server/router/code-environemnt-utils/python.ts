import fs from 'fs'
import { PythonShell } from 'python-shell'
const pyshell = new PythonShell('./test.py')
const handlePythonCode = (input: any) => {
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
}

export default handlePythonCode
