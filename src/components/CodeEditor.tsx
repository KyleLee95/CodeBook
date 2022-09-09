import DropDown from './DropDown'
import Button from './Button'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useUpdateNote } from '../hooks/useUpdateNote'
import { useRunUserCode } from '../hooks/useRunUserCode'
import AceEditor from 'react-ace'

import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/src-noconflict/mode-typescript'
import 'ace-builds/src-noconflict/mode-c_cpp'

import 'ace-builds/src-noconflict/snippets/javascript'
import 'ace-builds/src-noconflict/snippets/python'
import 'ace-builds/src-noconflict/snippets/typescript'
import 'ace-builds/src-noconflict/snippets/c_cpp'

import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/theme-github'
import 'ace-builds/src-noconflict/ext-language_tools'

interface CodeEditorProps {
  code?: string | null
  defaultLanguage?: string | null
}
const languages = [
  { name: 'javascript', editorProp: 'javascript' },
  { name: 'typescript', editorProp: 'typescript' },
  { name: 'python', editorProp: 'python' },
  { name: 'c++', editorProp: 'c_cpp' }
]

const CodeEditor = ({ code, defaultLanguage }: CodeEditorProps) => {
  const updateNote = useUpdateNote()
  const router = useRouter()

  const [userSubmittedCodeResults, setUserSubmittedCodeResults] = useState('')
  //passing set state function as a parameter

  const [language, setLanguage] = useState<any>({
    name: 'javascript',
    editorProp: 'javascript'
  })
  const runUserCode = useRunUserCode(setUserSubmittedCodeResults, language.name)

  const handleSubmit = (code?: string) => {
    if (!code) return
    runUserCode.mutate({ code: code, language: language.name })
  }

  useEffect(() => {
    if (typeof defaultLanguage !== 'string') {
      return
    } else {
      setLanguage(JSON.parse(defaultLanguage))
    }
  }, [defaultLanguage])

  if (!defaultLanguage) return null
  return (
    <div>
      <div>
        <DropDown
          selectedOption={language}
          options={languages}
          setFn={(option: any) => {
            setLanguage(option)
            updateNote.mutate({
              id:
                typeof router.query.id === 'string'
                  ? parseInt(router.query.id)
                  : NaN,
              language: JSON.stringify(option)
            })
          }}
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
        mode={language.editorProp}
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
        name="aceEditor"
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
