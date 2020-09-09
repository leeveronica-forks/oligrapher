import React from 'react'

import NodeCircle from './NodeCircle'
import NodeLabel from './NodeLabel'
import { Node } from '../graph/node'

export default function EdgeEditorNode({ node }: EdgeEditorNodeProps) {
  const nodeCopy = Object.assign({}, node, { x: 40, y: 20, scale: 2/3 })

  return (
    <svg id="svg" version="1.1" xmlns="http://www.w3.org/2000/svg" width="80px" height="90px" preserveAspectRatio="xMidYMid">
      <NodeCircle node={nodeCopy} />
      <NodeLabel node={nodeCopy} perLineMax={15} />
    </svg>
  )
}

interface EdgeEditorNodeProps {
  node: Node
}