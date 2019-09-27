import Cancel from './Cancel.svelte'
import Change from './Change.svelte'
import List from './List.svelte'
import Request from './Request.svelte'

import { getType } from '../ObjectData.js'

export default {
  Cancel,
  Change,
  List,
  Request,
  resolve (commandObj) {
    let commandLower = getType(commandObj).toLowerCase()
    console.log(commandLower)
    switch (commandLower) {
      case 'cancel':
        return Cancel
      case 'change':
        return Change
      case 'list':
        return List
      case 'request':
        return Request
      default:
        throw new Error(`No valid command element: ${commandLower}`)
    }
  }
}
