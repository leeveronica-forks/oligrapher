import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { calculateStatus } from '../util/helpers'
import Caption from './Caption'
import FloatingEditor from '../util/floatingEditor'
import { annotationHasHighlightsSelector } from '../util/selectors'
import { StateWithHistory, AnnotationsState } from '../util/defaultState'
import { CaptionMap } from '../graph/graph'

export default function Captions() {
  const captions = useSelector<StateWithHistory, CaptionMap>(state => state.graph.captions)
  const editedCaptionId = useSelector<StateWithHistory, string | null>(state => FloatingEditor.getId(state.display, 'caption'))
  const storyMode = useSelector<StateWithHistory, boolean>(state => state.display.modes.story)
  const { list, currentIndex } = useSelector<StateWithHistory, AnnotationsState>(state => state.annotations)
  const highlightedCaptionIds = useMemo(
    () => storyMode ? (list[currentIndex]?.captionIds || []) : [],
    [storyMode, list, currentIndex]
  )
  const annotationHasHighlights = useSelector(annotationHasHighlightsSelector)
  const editMode = useSelector<StateWithHistory, boolean>(state => state.display.modes.editor)

  return (
    <g className="captions">
      { Object.entries(captions).map(([id, caption]) => (
        <Caption 
          key={id} 
          caption={caption} 
          currentlyEdited={editMode && id === editedCaptionId} 
          status={calculateStatus(id, highlightedCaptionIds, annotationHasHighlights, editMode)} />
      )) }
    </g>
  )
}