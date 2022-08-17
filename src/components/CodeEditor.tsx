import { javascript } from '@codemirror/lang-javascript'
import { python } from '@codemirror/lang-python'
import CodeMirror from '@uiw/react-codemirror'
// import { okaidia } from '@uiw/codemirror-theme-okaidia'
// import { eclipse } from '@uiw/codemirror-theme-eclipse'
import Button from '../components/Button'
import { trpc } from '../utils/trpc'
import { useState, SyntheticEvent } from 'react'
import { JSONValue } from 'superjson/dist/types'

interface CodeEditorProps {
  code?: string
  handleChange: (field: string, value: JSONValue | string) => void
}

const languages = ['typescript', 'javascript', 'python']
const CodeEditor = ({ code, handleChange }: CodeEditorProps) => {
  const [userSubmittedCodeResults, setUserSubmittedCodeResults] = useState('')
  const [language, setLanguage] = useState<string>('javascript')

  const submitCode = trpc.useMutation(['codeEnvironments.javascript'], {
    onSuccess: (data) => {
      setUserSubmittedCodeResults(data.results)
    },
    onMutate: () => {
      /*
      TODO:
      have some kind of running state here that creates a loading shell.
      */
    }
  })

  const handleSubmit = (e: SyntheticEvent, code?: string) => {
    e.preventDefault()
    if (!code) return

    submitCode.mutate({ code: code })
  }

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
          theme="dark"
          onChange={(value) => {
            handleChange('code', value)
          }}
          value={code}
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
      <div>results: {userSubmittedCodeResults}</div>
    </>
  )
}

export default CodeEditor
