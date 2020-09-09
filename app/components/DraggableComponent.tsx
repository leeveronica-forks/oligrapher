import React, { useState, useCallback, FC } from 'react'
import Draggable, { 
  DraggableEventHandler, DraggableEvent, DraggableData 
} from 'react-draggable'
import noop from 'lodash/noop'

import { useSelector } from '../util/helpers'
import { Point } from '../util/geometry'

/*
  Wrapper around react-draggable
  Required props: onDrag, onStop, handle
*/
export const DraggableComponent: FC<DraggableComponentProps> = ({ children, ...props }) => {
  const [isDragging, setDragging] = useState(false)
  const svgZoom = useSelector(state => state.display.svgZoom)

  const onDrag = useCallback((evt, data) => {
    setDragging(true)
    const { x, y } = data

    if (props.onDrag) {
      return props.onDrag({ x, y })
    }
  }, [props])

  const onStop = useCallback((evt: DraggableEvent, data: DraggableData) => {
    if (isDragging) {
      const { x, y } = data
      props.onStop({ x, y })
      setDragging(false)
    } else {
      props.onClick(evt, data)
    }
  }, [isDragging, props])

  // The setting the position to 0,0 has the effect of ensuring that
  // all drag deltas always start with 0,0.
  // The onStop and onDrag callbacks all work off of relative coordinates.
  const draggableProps = { 
    onDrag,
    onStop,
    onStart: props.onStart,
    scale: svgZoom,
    position: props.position,
    handle: props.handle,
    disabled: props.disabled,
    enableUserSelectHack: props.enableUserSelectHack
  }

  return (
    <Draggable {...draggableProps}>
      {children}
    </Draggable>
  )
}

export default DraggableComponent

type DragHandler = (position: Point) => any

interface DraggableComponentProps {
  onStop: DragHandler,
  onDrag?: DragHandler,
  onStart?: DraggableEventHandler,
  onClick: DraggableEventHandler,
  handle: string,
  position?: Point,
  disabled?: boolean,
  enableUserSelectHack?: boolean
}

DraggableComponent.defaultProps = {
  position: { x: 0, y: 0 },
  onDrag: noop,
  onClick: noop,
  onStart: noop
}
