import React from 'react'

import { Annotation } from '../util/annotations'

export default function Annotation({ annotation: { header, text } }: AnnotationProps) {
  return (
    <div className="oligrapher-annotation">
      <div className="oligrapher-annotation-header">
        {header}
      </div>

      <div className="oligrapher-annotation-text" dangerouslySetInnerHTML={{ __html: text }}>
      </div>
    </div>
  )
}

interface AnnotationProps {
  annotation: Annotation
}