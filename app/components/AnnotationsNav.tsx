import React from 'react'
import { Button } from '@material-ui/core'

export default function AnnotationsNav({ count, currentIndex, prev, next, size = "medium" }: AnnotationsNavProps) {
  return (
    <>
      <Button 
        variant="outlined"
        size={size}
        onClick={prev}
        disabled={currentIndex === 0}
        component="button"
      >Prev</Button>
      &nbsp;
      <Button
        variant="contained"
        color="primary"
        size={size}
        onClick={next}
        disabled={currentIndex > count - 2}
        component="button"
      >Next</Button>
    </>
  )
}

interface AnnotationsNavProps {
  count: number,
  currentIndex: number,
  prev: () => any,
  next: () => any,
  size?: "medium" | "large" | "small"
}