import Cancel from './Cancel.svelte'
import Change from './Change.svelte'
import List from './List.svelte'
import Request from './Request.svelte'
import Base from './_base.svelte'
import { getType } from '../ObjectData.js'

export default {
  Base,
  Cancel,
  Change,
  List,
  Request,
  resolve (commandObj) {
    let commandLower = getType(commandObj).toLowerCase()
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
