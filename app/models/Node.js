import { generate as generateId } from 'shortid'
import { setAttributes } from './'

export default class Node {
  id = null
  x = null
  y = null
  scale = 1

  constructor(attributes) {
    setAttributes(this, attributes)

    if (!this.id) {
      this.id = generateId()
    }
  }
}
