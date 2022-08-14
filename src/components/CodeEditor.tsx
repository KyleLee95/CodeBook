import { javascript } from '@codemirror/lang-javascript'
import { python } from '@codemirror/lang-python'
import CodeMirror from '@uiw/react-codemirror'
// import { okaidia } from '@uiw/codemirror-theme-okaidia'
// import { eclipse } from '@uiw/codemirror-theme-eclipse'
import Button from '../components/Button'
import { trpc } from '../utils/trpc'
import { useState, SyntheticEvent } from 'react'

interface CodeEditorProps {
  code: string
}

const languages = ['typescript', 'javascript', 'python']
const CodeEditor = ({ code }: CodeEditorProps) => {
  const [codeEditor, setCodeEditor] = useState(code || '')
  const [language, setLanguage] = useState<string>('javascript')
  const [theme, handleTheme] = useState<string>('dark')
  const submitCode = (language: string) => {
    const queryString = 'codeEnvironments.' + language
    return trpc.useMutation([queryString], {
      onError: (err) => {
        console.log(err)
      },
      onSuccess: (data, variables, context) => {
        console.log(data)
      }
    })
  }

  const handleChange = (string: string) => {
    setCodeEditor(string)
  }
  const handleSubmit = (e: SyntheticEvent, code: string) => {
    e.preventDefault()
    // submitCode.mutate({ code })
  }
  // useEffect(() => {
  //   var minLines = 35
  //   var startingValue = ''
  //   for (var i = 0; i < minLines; i++) {
  //     startingValue += '\n'
  //   }
  //   setCodeEditor(startingValue)
  // }, [])

  return (
    <>
      <div>
        {languages.map((lang) => {
          return (
            <Button
              key={lang}
              text={lang}
              handleClick={() => setLanguage(lang)}
            >
              {lang}
            </Button>
          )
        })}
      </div>
      <div>
        <CodeMirror
          height="100%"
          width="100%"
          onChange={(string: string) => {
            handleChange(string)
          }}
          value={codeEditor}
          extensions={[javascript({ jsx: true }), python()]}
        />
      </div>
      <div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={(e: SyntheticEvent) => handleSubmit(e, code)}
        >
          Run {language} code
        </button>
      </div>
    </>
  )
}

export default CodeEditor
