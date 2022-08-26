import { javascript } from '@codemirror/lang-javascript'
import { python } from '@codemirror/lang-python'
import CodeMirror from '@uiw/react-codemirror'
import Button from '../components/Button'
import { trpc } from '../utils/trpc'
import { useState, SyntheticEvent } from 'react'
import { useRouter } from 'next/router'
import { useUpdateNote } from '../hooks/useUpdateNote'
import { useRunUserCode } from '../hooks/useRunUserCode'
interface CodeEditorProps {
  code?: string | null
}

const languages = ['typescript', 'javascript', 'python']

const CodeEditor = ({ code }: CodeEditorProps) => {
  const updateNote = useUpdateNote()
  console.log('stale code', code)
  const router = useRouter()
  const [userSubmittedCodeResults, setUserSubmittedCodeResults] = useState('')
  const runUserCode = useRunUserCode(setUserSubmittedCodeResults)
  const [language, setLanguage] = useState<string>('javascript')

  const handleSubmit = (e: SyntheticEvent, code?: string) => {
    if (!code) return
    const results = runUserCode.mutate({ code: code })
    console.log('results', results)
    // setUserSubmittedCodeResults(results)
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
            />
          )
        })}
      </div>
      <div>
        <CodeMirror
          height="100%"
          width="100%"
          theme="dark"
          autoSave="true"
          onChange={(value) => {
            console.log('value', value)
            const id =
              typeof router.query.id === 'string'
                ? parseInt(router.query.id)
                : NaN
            updateNote.mutate({
              code: value,
              id
            })
          }}
          value={!code ? '' : code}
          extensions={[javascript({ jsx: true }), python()]}
        />
      </div>
      <div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={(e: SyntheticEvent) => {
            if (!code) return
            handleSubmit(e, code)
          }}
        >
          Run {language} code
        </button>
      </div>
      <div>results: {userSubmittedCodeResults}</div>
    </>
  )
}

export default CodeEditor
