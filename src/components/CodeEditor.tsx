import DropDown from './DropDown'
import Button from './Button'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useUpdateNote } from '../hooks/useUpdateNote'
import { useRunUserCode } from '../hooks/useRunUserCode'
import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/theme-github'
import 'ace-builds/src-noconflict/ext-language_tools'

interface CodeEditorProps {
  code?: string | null
}
const languages = ['select language', 'typescript', 'javascript', 'python']

const CodeEditor = ({ code }: CodeEditorProps) => {
  const updateNote = useUpdateNote()

  const router = useRouter()
  const [userSubmittedCodeResults, setUserSubmittedCodeResults] = useState('')
  //passing set state function as a parameter
  const [language, setLanguage] = useState<string>('select language')
  const runUserCode = useRunUserCode(setUserSubmittedCodeResults, language)

  const handleSubmit = (code?: string) => {
    if (!code) return
    runUserCode.mutate({ code: code, language: language })
  }

  return (
    <div>
      <div>
        <DropDown
          selectedOption={language}
          options={languages}
          setFn={setLanguage}
        />
        <Button
          text="Run Code"
          handleClick={() => {
            if (!code) return
            handleSubmit(code)
          }}
        />
      </div>
      <AceEditor
        style={{ width: '100%' }}
        mode="javascript"
        theme="monokai"
        defaultValue={code ? code : ''}
        onChange={(codeInEditor) => {
          updateNote.mutate({
            code: codeInEditor,
            id:
              typeof router.query.id === 'string'
                ? parseInt(router.query.id)
                : NaN
          })
        }}
        highlightActiveLine={false}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          useWorker: false,
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: false,
          showLineNumbers: true,
          tabSize: 2
        }}
      />
      <div>results: {userSubmittedCodeResults}</div>
    </div>
  )
}

export default CodeEditor
