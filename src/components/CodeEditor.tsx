import DropDownButton from './DropDown'
import Button from './Button'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useUpdateNote } from '../hooks/useUpdateNote'
import { useRunUserCode } from '../hooks/useRunUserCode'
// import dynamic from 'next/dynamic'
import AceEditor from 'react-ace'
// import 'ace-builds/src-noconflict/ace'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/theme-monokai'
// import 'ace-builds/src-noconflict/mode-c_cpp'
// import 'ace-builds/src-noconflict/theme-github'

interface CodeEditorProps {
  code?: string | null
}
//turn off SSR for react quill because it requires rendering a textarea as a backup which will cause the app to break
// const AceEditor = dynamic(
//   async () => {
//     const ace = await import('react-ace')
//     import('ace-builds/src-noconflict/ace')
//     import('ace-builds/src-noconflict/mode-javascript')
//     import('ace-builds/src-noconflict/theme-monokai')
//     return ace
//   },
//   {
//     // eslint-disable-next-line react/display-name
//     loading: () => null,
//     ssr: false
//   }
// )

const languages = ['typescript', 'javascript', 'python']

import 'ace-builds/src-noconflict/mode-java'
import 'ace-builds/src-noconflict/theme-github'
import 'ace-builds/src-noconflict/ext-language_tools'

const CodeEditor = ({ code }: CodeEditorProps) => {
  const updateNote = useUpdateNote()

  const router = useRouter()
  const [userSubmittedCodeResults, setUserSubmittedCodeResults] = useState('')
  //passing set state function as a parameter
  const [language, setLanguage] = useState<string>('Javascript')
  const runUserCode = useRunUserCode(setUserSubmittedCodeResults, language)

  const handleSubmit = (code?: string) => {
    console.log('code', code)
    if (!code) return
    runUserCode.mutate({ code: code, language: language })
  }

  return (
    <div>
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
      {/* <div id="cm-wrapper">
        
      </div> */}
      <div>results: {userSubmittedCodeResults}</div>
    </div>
  )
}

export default CodeEditor
