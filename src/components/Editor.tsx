import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import hljs from 'highlight.js'
import 'react-quill/dist/quill.snow.css'
import 'highlight.js/styles/monokai-sublime.css'
import { Sources } from 'quill'
import { UnprivilegedEditor } from 'react-quill'

interface EditorProps {
  text: string
}

//turn off SSR for react quill because it requires rendering a textarea as a backup which will cause the app to break
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
hljs.configure({
  // optionally configure hljs
  languages: ['typescript', 'javascript', 'python']
})

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' }
    ],
    ['link', 'image'],
    ['clean']
  ],
  syntax: { highlight: (text: string) => hljs.highlightAuto(text).value }
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'code-block'
]

const placeholders = [
  'Typesafety is next to godliness...',
  'Are you off by one?',
  'Is running an o(n^2) algorithm really the best use of your time?'
]
const placeholderToRender =
  placeholders[getRandomInt(0, placeholders.length - 1)]

const Editor = ({ text }: EditorProps) => {
  const [value, setValue] = useState<any>('')
  useEffect(() => {
    const parsedText = JSON.parse(text)
    setValue(parsedText)
  }, [text])

  const handleChange = (
    content: string,
    delta: any, //Deltastatic type definition doesn't exist due to library changes. GitHub issue fix was to just cast it to any🤷‍♂️
    source: Sources,
    editor: UnprivilegedEditor
  ) => {
    setValue(editor.getContents())
  }

  return (
    <ReactQuill
      style={{ height: '100%' }}
      placeholder={placeholderToRender}
      theme="snow"
      modules={modules}
      formats={formats}
      value={value}
      onChange={handleChange}
    />
  )
}

export default Editor
