import React from 'react'
import { useSelector } from 'react-redux'

import { StateWithHistory } from '../util/defaultState'
import { Caption } from '../graph/caption'

export const styleForCaption = (caption: Caption) => {
  return {
    fontFamily: caption.font,
    fontSize: caption.size + 'px',
    fontWeight: caption.weight,
    height: caption.height + 'px',
    width: caption.width + 'px'
  }
}

export default function CaptionTextbox({ caption, status }: CaptionTextboxProps) {
  const style = styleForCaption(caption) as React.CSSProperties
  const editMode = useSelector<StateWithHistory, boolean>(state => state.display.modes.editor)
  const className = `caption-text caption-text-${status}` 
    + (editMode ? ' editing' : '')

  return (
    <div
      // @ts-ignore: xmlns is a valid attribute because this 
      // component will appear within svg <foreignObject>
      xmlns="http://www.w3.org/1999/xhtml"
      className={className}
      style={style}>
      { caption.text }
    </div>
  )
}

interface CaptionTextboxProps {
  caption: Caption,
status: string
}
