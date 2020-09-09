import React from 'react'

import { callWithTargetValue } from '../util/helpers'

export default function Title({ text, editable, onChange, url }: TitleProps) {

  return (
    <h1 id="oligrapher-title">
      {
        editable && onChange
        ? <input value={text || ''}
            onChange={callWithTargetValue(onChange)}
            placeholder="Title" />
        : url ? <a href={url} target="_blank" rel="noreferrer" title="View this map on LittleSis">{text}</a> : text
      }
    </h1>
  )
}

interface TitleProps {
  text: string | null,
  editable: boolean,
  onChange?: (text: string) => any,
  url: string | null
}