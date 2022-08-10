import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import hljs from 'highlight.js'
import 'react-quill/dist/quill.snow.css'
import 'highlight.js/styles/monokai-sublime.css'

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

const Editor = () => {
  const [value, setValue] = useState('')

  return (
    <ReactQuill
      placeholder="Typesafety is next to godliness..."
      theme="snow"
      modules={modules}
      formats={formats}
      value={value}
      onChange={setValue}
    />
  )
}

export default Editor
