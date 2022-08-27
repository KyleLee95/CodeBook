import { javascript } from '@codemirror/lang-javascript'
import { python } from '@codemirror/lang-python'
import CodeMirror from '@uiw/react-codemirror'
import DropDownButton from './DropDown'
import Button from './Button'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useUpdateNote } from '../hooks/useUpdateNote'
import { useRunUserCode } from '../hooks/useRunUserCode'
interface CodeEditorProps {
  code?: string | null
}

const languages = ['typescript', 'javascript', 'python']

const CodeEditor = ({ code }: CodeEditorProps) => {
  const updateNote = useUpdateNote()

  const router = useRouter()
  const [userSubmittedCodeResults, setUserSubmittedCodeResults] = useState('')
  //passing set state function as a parameter
  const [language, setLanguage] = useState<string>('Javascript')
  const runUserCode = useRunUserCode(setUserSubmittedCodeResults, language)

  const handleSubmit = (code?: string) => {
    if (!code) return
    runUserCode.mutate({ code: code, language: language })
  }

  return (
    <div>
      <div id="cm-wrapper">
        <div>
          <DropDownButton
            stateOptions={languages}
            state={language}
            setState={setLanguage}
          />
          <Button
            text="Run Code"
            handleClick={() => {
              if (!code) return
              handleSubmit(code)
            }}
          />
        </div>
        <CodeMirror
          height="100%"
          width="100%"
          theme="dark"
          onChange={(value) => {
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
      <div>results: {userSubmittedCodeResults}</div>
    </div>
  )
}

export default CodeEditor
