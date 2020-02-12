import React, { useEffect, useState, useRef } from 'react'

import PropTypes from 'prop-types'

import flow from 'lodash/flow'
import pick from 'lodash/pick'

import { addPaddingToRectangle } from '../../util/dimensions'

export default function CaptionTextbox(props) {
  const textRef = useRef(null)
  const [rectProps, setRectProps] = useState(null)

  // <text> => (updates state)
  const updateRectangle = flow([
    textElement => pick(textElement.getBBox(), 'x', 'y', 'width', 'height'),
    addPaddingToRectangle(10),
    setRectProps
  ])

  useEffect(() => void updateRectangle(textRef.current),
            [props.text, props.x, props.y])

  return  <g className="caption-textbox">
            { rectProps && <rect {...rectProps} className="background-rect" /> }

            <text x={props.x} y={props.y} ref={textRef}>
              {props.text}
            </text>
          </g>
}

CaptionTextbox.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  width: PropTypes.number
}

CaptionTextbox.defaultProps = {
  width: 100
}


// export default CaptionTextbox

// export function CaptionTextbox(props) {
//   return <foreignObject x={props.x} y={props.y}>
//            <div xmlns="http://www.w3.org/1999/xhtml"
//                      className="caption-text"
//                      value={props.text}
//                      onChange={props.handleTextChange}
//                      style={{backgroundColor: 'red'}}
//            >
//            </div>
//          </foreignObject>
// }