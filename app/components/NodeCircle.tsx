import React from 'react'

import { Node, NODE_RADIUS } from '../graph/node'

export function NodeCircle({ node, status = 'normal' }: NodeCircleProps) {
  const { x, y, color, scale } = node
  const radius = NODE_RADIUS * scale
  
  const opacity = {
    normal: "1",
    highlighted: "1",
    faded: "0.2"
  }[status]

  return (
    <circle className="node-circle draggable-node-handle"
      cx={x}
      cy={y}
      r={radius}
      fill={color}
      opacity={opacity}
      onDragStart={(e) => e.preventDefault()} // to prevent HTML5 drag-n-drop (draggable="false" used to work)
      />
  )
}

interface NodeCircleProps {
  node: Node,
  status?: 'normal' | 'highlighted' | 'faded'
}

export default React.memo(NodeCircle)
