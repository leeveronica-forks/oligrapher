import React, { useRef, useEffect, useCallback } from 'react'
import ReactResizeDetector from 'react-resize-detector'

import { styleForCaption } from './CaptionTextbox'
import { Caption } from '../graph/caption'

export default function CaptionEditorTextarea({ caption, updateCaption, setForeignObjectSize }: CaptionEditorTextareaProps) {
  const textareaRef = useRef() as React.MutableRefObject<HTMLTextAreaElement>

  const onResize = useCallback(() => {
    const { width, height } = textareaRef.current.style
    setForeignObjectSize({ width: parseInt(width) + 10, height: parseInt(height) + 10 })
  }, [setForeignObjectSize])
  
  useEffect(() => {
    let node = textareaRef.current

    if (caption.text === 'New Caption') {
      node.select()
    } else {
      node.focus()
    }

    // save resize on close
    return () => {
      const { width, height } = node.style
      const text = node.value
      updateCaption({ text, width: parseInt(width), height: parseInt(height) })  
    }
  }, [caption, updateCaption, onResize])

  const style = styleForCaption(caption) as React.CSSProperties

  return (
    <div>
      <textarea
        ref={textareaRef}
        className="edit-caption-textarea"
        defaultValue={caption.text}
        style={style}>
      </textarea>
      <ReactResizeDetector 
        handleWidth 
        handleHeight 
        querySelector=".edit-caption-textarea"
        onResize={onResize} 
        skipOnMount={true} />
    </div>
  )
}

interface CaptionEditorTextareaProps {
  caption: Caption,
  updateCaption: (attributes: { text: string, width: number, height: number }) => any,
  setForeignObjectSize: (size: { width: number, height: number }) => any
}