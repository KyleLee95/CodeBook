import DropDown from './DropDown'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useUpdateNote } from '../hooks/useUpdateNote'
import { useRunUserCode } from '../hooks/useRunUserCode'
import AceEditor from 'react-ace'

const themes = [
  { name: 'monokai', editorProp: 'monokai' },
  { name: 'github', editorProp: 'github' },
  { name: 'tomorrow', editorProp: 'tomorrow' },
  { name: 'kuroir', editorProp: 'kuroir' },
  { name: 'twilight', editorProp: 'twilight' },
  { name: 'xcode', editorProp: 'xcode' },
  { name: 'textmate', editorProp: 'textmate' },
  { name: 'solarized (Dark)', editorProp: 'solarized_dark' },
  { name: 'solarized (Light)', editorProp: 'solarized_light' },
  { name: 'terminal', editorProp: 'terminal' }
]

import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/src-noconflict/mode-typescript'
import 'ace-builds/src-noconflict/mode-c_cpp'
import 'ace-builds/src-noconflict/mode-java'
import 'ace-builds/src-noconflict/mode-golang'
import 'ace-builds/src-noconflict/mode-csharp'
import 'ace-builds/src-noconflict/mode-html'
import 'ace-builds/src-noconflict/mode-css'
import 'ace-builds/src-noconflict/mode-elixir'

import 'ace-builds/src-noconflict/snippets/javascript'
import 'ace-builds/src-noconflict/snippets/python'
import 'ace-builds/src-noconflict/snippets/typescript'
import 'ace-builds/src-noconflict/snippets/c_cpp'
import 'ace-builds/src-noconflict/snippets/java'
import 'ace-builds/src-noconflict/snippets/golang'
import 'ace-builds/src-noconflict/snippets/csharp'
import 'ace-builds/src-noconflict/snippets/html'
import 'ace-builds/src-noconflict/snippets/css'
import 'ace-builds/src-noconflict/snippets/elixir'

import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/theme-github'
import 'ace-builds/src-noconflict/theme-tomorrow'
import 'ace-builds/src-noconflict/theme-kuroir'
import 'ace-builds/src-noconflict/theme-twilight'
import 'ace-builds/src-noconflict/theme-xcode'
import 'ace-builds/src-noconflict/theme-textmate'
import 'ace-builds/src-noconflict/theme-solarized_dark'
import 'ace-builds/src-noconflict/theme-solarized_light'
import 'ace-builds/src-noconflict/theme-terminal'

import 'ace-builds/src-noconflict/ext-language_tools'

interface CodeEditorProps {
  code?: string | null
  defaultLanguage?: string | null
}
const languages = [
  { name: 'javascript', editorProp: 'javascript' },
  { name: 'typescript', editorProp: 'typescript' },
  { name: 'python', editorProp: 'python' },
  { name: 'java', editorProp: 'java' },
  { name: 'golang', editorProp: 'golang' },
  { name: 'elixir', editorProp: 'exlixir' },
  { name: 'c#', editorProp: 'csharp' },
  { name: 'c++', editorProp: 'c_cpp' },
  { name: 'html', editorProp: 'html' },
  { name: 'css', editorProp: 'css' }
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

  const [editorTheme, setEditorTheme] = useState<any>({
    name: 'monokai',
    editorProp: 'monokai'
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
    <div className="h-full">
      <div>
        <DropDown
          text="Language"
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
        <DropDown
          text="Theme"
          selectedOption={editorTheme}
          options={themes}
          setFn={(option: any) => {
            setEditorTheme(option)
          }}
        />
        {/* <Button
          text="Run Code"
          handleClick={() => {
            if (!code) return
            handleSubmit(code)
          }}
        /> */}
      </div>
      <AceEditor
        style={{ height: '100%', maxHeight: '90%', width: '100%' }}
        mode={language.editorProp}
        theme={editorTheme.editorProp}
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
      {/* <div>results: {userSubmittedCodeResults}</div> */}
    </div>
  )
}

export default CodeEditor
