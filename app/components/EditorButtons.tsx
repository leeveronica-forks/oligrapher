import React from 'react'
import noop from 'lodash/noop'
import { Button } from '@material-ui/core'

export default function EditorButtons({ handleDelete = noop, page, setPage }: EditorButtonsProps)  {
  return (
    <div className="editor-buttons">
      { (!page || page === 'main') && 
        <Button 
          onClick={handleDelete} 
          variant="contained" 
          color="secondary" 
          size="small" 
          disableElevation={true}
        >Delete</Button> 
      }

      { page && (page !== 'main') && setPage &&
        <Button 
          onClick={() => setPage('main')} 
          variant="contained" 
          color="primary" 
          size="small" 
          disableElevation={true}
        >Back</Button> 
      }
    </div>
  )
}

interface EditorButtonsProps {
  handleDelete: () => any,
  page?: string,
  setPage?: (string: any) => any
}