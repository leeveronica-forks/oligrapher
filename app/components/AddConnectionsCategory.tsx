import React from 'react'
import { Select, MenuItem } from '@material-ui/core'

export const CATEGORIES = [
  'All Categories',
  'Position',
  'Education',
  'Membership',
  'Family',
  'Donation',
  'Transaction',
  'Lobbying',
  'Social',
  'Professional',
  'Ownership',
  'Hierarchy',
  'Generic'
]

export default function AddConnectionsCategory({ categoryId, onChange }: AddConnectionsCategoryProps) {
  return (
    <Select 
      className="add-connections-category"
      MenuProps={{ transitionDuration: 0 }}
      onChange={onChange}
      value={categoryId}
      variant="outlined"
    >
      { CATEGORIES.map((name, id) => 
        <MenuItem value={id} key={id} dense={true}>{name}</MenuItem>) 
      }
    </Select>
  )
}

interface AddConnectionsCategoryProps {
  categoryId: number,
  onChange: (event: React.ChangeEvent<any>) => any
}