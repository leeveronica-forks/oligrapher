import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useHotkeys } from 'react-hotkeys-hook'
import { KeyHandler } from 'hotkeys-js'
import noop from 'lodash/noop'

import { eventTargetIsFormElement } from '../util/helpers'

export default function EditorHotKeys({ children, remove = noop }: EditorHotKeysProps) {
  const dispatch = useDispatch()
  const closeEditor = useCallback(() => { 
    dispatch({ type: 'CLOSE_EDITOR' })
  }, [dispatch]) as KeyHandler

  useHotkeys('escape', closeEditor)
  useHotkeys('backspace, del', event => {
    if (!eventTargetIsFormElement(event)) {
      remove(event)
    }
  }, undefined, [remove])

  return (
    <>
      { children }
    </>
  )
}

interface EditorHotKeysProps {
  children: JSX.Element,
  remove?: (event: KeyboardEvent) => any
}