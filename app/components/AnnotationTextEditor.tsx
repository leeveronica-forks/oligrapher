import React, { useCallback } from 'react'
// @ts-ignore: no typings provided by ckeditor
import CKEditor from '@ckeditor/ckeditor5-react'
// @ts-ignore: no typings provided by ckeditor
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

export default function AnnotationTextEditor({ text, onChange }: AnnotationTextEditorProps) {  
  const cleanup = useCallback(string => (string === '' ? null : string), [])
  const handleChange = useCallback((event, editor) => { 
    onChange(cleanup(editor.getData()))
  }, [onChange, cleanup])

  const config = {
    placeholder: 'Annotation text',
    toolbar: [
      'bold', 'italic', 'link', 'bulletedList', 'numberedList',
      'blockQuote', 'undo', 'redo'
    ]
  }

  return (
    <CKEditor
      editor={ClassicEditor}
      data={text || '<p></p>'}
      onChange={handleChange}
      config={config}
      />
  )
}

interface AnnotationTextEditorProps {
  text: string,
  onChange: (arg: string | null) => void
}