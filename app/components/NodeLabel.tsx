import React from 'react'

import textLines from '../util/textLines'
import { Node, NODE_RADIUS } from '../graph/node'

const FONT_SIZE = 16

export default function NodeLabel({ node, perLineMax, status = 'normal' }: NodeLabelProps) {
  const { name, x, y, scale } = node

  const color = {
    normal: "#000",
    highlighted: "#000",
    faded: "#ddd"
  }[status]

  // we use a cube root so that font size and line height 
  // don't grow too much as node scale increases
  const scalePower = scale > 1 ? 1/3 : 1
  const fontSize = FONT_SIZE * Math.pow(scale, scalePower)
  const lineHeight = fontSize * 1.25
  const radius = NODE_RADIUS * scale

  const rects = textLines(name, perLineMax).map((line, i) => {
    const width = line.length * 8
    const height = lineHeight
    const dy = radius + 4 + (i * lineHeight)

    return (
      <rect
        key={i}
        className="nodeLabelRect"
        fill="#fff"
        opacity="1"
        rx={5}
        ry={5}
        x={x - width/2}
        width={width}
        height={height}
        y={y + dy}
        filter="url(#blur)"
        />
    )
  })

  const lines = textLines(name, perLineMax).map((line, i) => (
    <text
      key={i}
      x={x}
      y={radius + y + lineHeight}
      dy={i * lineHeight}
      textAnchor="middle"
      fontFamily="Helvetica Neue Medium, Helvetica, Arial, sans-serif"
      fontSize={fontSize + 'px'}
      fill={color}
    >
      {line}
    </text>
  ))

  return (
    <g>
      { rects }

      <g className="node-label">
        {lines}
      </g>
    </g>
  )
}

interface NodeLabelProps {
  node: Node,
  perLineMax: number,
  status?: 'normal' | 'highlighted' | 'faded'
}
