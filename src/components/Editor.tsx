import React from 'react'
import dynamic from 'next/dynamic'
import hljs from 'highlight.js'
import 'react-quill/dist/quill.snow.css'
import 'highlight.js/styles/monokai-sublime.css'
import { useUpdateNote } from '../hooks/useUpdateNote'
import { useRouter } from 'next/router'

interface EditorProps {
  text: string | undefined | null
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
  'Is running an o(n^2) algorithm really the best use of your time?',
  'Learning Dynamic Programming is hard. Trying to learn Dynamic Programming during your interview is harder.'
]

const Editor = ({ text }: EditorProps) => {
  const updateNoteOnDB = useUpdateNote()
  const router = useRouter()
  const id =
    typeof router.query.id === 'string' ? parseInt(router.query.id) : NaN

  const placeholderToRender =
    placeholders[getRandomInt(0, placeholders.length - 1)]
  return (
    <ReactQuill
      style={{ height: '100%', maxHeight: '85%' }}
      placeholder={placeholderToRender}
      theme="snow"
      modules={modules}
      formats={formats}
      defaultValue={!text ? '' : text}
      onChange={(value, _delta, _source, _editor) => {
        if (!id) return
        updateNoteOnDB.mutate({
          text: JSON.stringify(value),
          id
        })
      }}
    />
  )
}

export default Editor
