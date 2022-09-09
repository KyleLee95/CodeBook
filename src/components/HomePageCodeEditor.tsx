// code-editor.js
import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/ext-language_tools'
export default function HomePageEditor() {
  return (
    <AceEditor
      style={{ height: '100%', maxHeight: '90%', width: '100%' }}
      mode="javascript"
      theme="monokai"
      defaultValue={'try me!'}
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
  )
}
