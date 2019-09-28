// Room definition object
const createRoom = (venue, room, size) => ({
  command: 'room',
  venue: venue,
  room: room,
  size: size
})

// Request definition object
const createRequest = (id, startDate, endDate, nSmall, nMedium, nLarge) => ({
  command: 'request',
  id: id,
  start: startDate instanceof Date ? dateToString(startDate) : startDate,
  end: endDate instanceof Date ? dateToString(endDate) : endDate,
  small: nSmall || 0,
  medium: nMedium || 0,
  large: nLarge || 0
})

// Change definition object
const createChange = (id, startDate, endDate, nSmall, nMedium, nLarge) => ({
  command: 'change',
  id: id,
  start: startDate instanceof Date ? dateToString(startDate) : startDate,
  end: endDate instanceof Date ? dateToString(endDate) : endDate,
  small: nSmall || 0,
  medium: nMedium || 0,
  large: nLarge || 0
})

// Cancel definition object
const createCancel = id => ({
  command: 'cancel',
  id: id
})

// List definition object
const createList = venue => ({ command: 'list', venue: venue })

// Convert a `Date` object into `String(yyyy-mm-dd)`
const dateToString = dateObj => dateObj.format('yyyy-mm-dd')

// Convert `String(yyyy-mm-dd)` into a `Date` object
const stringToDate = str => Date.parse(str)

// Get type of command
const getType = command => command.command

// sample_input.json
const exampleJSONlines = `{ "command": "room", "venue": "Zoo", "room": "Penguin", "size": "small" }
{ "command": "room", "venue": "Zoo", "room": "Hippo", "size": "large" }
{ "command": "room", "venue": "Zoo", "room": "Elephant", "size": "large" }
{ "command": "room", "venue": "Gardens", "room": "Figtree", "size": "large" }
{ "command": "request", "id": "Annual Meeting", "start": "2019-03-25", "end": "2019-03-26", "small": 1, "medium": 0, "large": 1 }
{ "command": "request", "id": "Mattress Convention", "start": "2019-03-24", "end": "2019-03-27", "small": 0, "medium": 0, "large": 1 }
{ "command": "request", "id": "Dance Party", "start": "2019-03-26", "end": "2019-03-26", "small": 0, "medium": 0, "large": 1 }
{ "command": "change", "id": "Annual Meeting", "start": "2019-03-27", "end": "2019-03-29", "small": 1, "medium": 0, "large": 0 }
{ "command": "request", "id": "CSE Autumn Ball", "start": "2019-03-25", "end": "2019-03-26" , "small": 1, "medium": 0, "large": 0 }
{ "command": "cancel", "id": "Dance Party" }
{ "command": "request", "id": "Vivid", "start": "2019-03-26", "end": "2019-03-26", "small": 1, "medium": 0, "large": 0 }
{ "command": "list", "venue": "Zoo" }`

// Parse lines of JSON commands into ...
// {
//   venueData: {
//     [venue]: {
//       small: [String, ...],
//       medium: [String, ...],
//       large: [String, ...]
//     }
//   },
//   commands: {
//     [i]: { ... }
//   },
//   commandsOrder: [ 0 .. i-1]
// }
function parseJSONlines (json_lines) {
  let lines = json_lines
    .trim()
    .replace(/\r/g, '')
    .split('\n')

  lines = lines.map(JSON.parse)

  let venueData = {}
  let commands = {}
  let commandsOrder = []

  let commandIdxGen = 0
  for (let query of lines) {
    if (getType(query) == 'room') {
      if (!(query.venue in venueData)) {
        venueData[query.venue] = {
          small: [],
          medium: [],
          large: []
        }
      }
      venueData[query.venue][query.size].push(query.room)
    } else {
      commands[commandIdxGen++] = query
    }
    commandsOrder = [...Array(commandIdxGen).keys()]
  }

  return {
    venueData,
    commands,
    commandsOrder
  }
}

module.exports = {
  parseJSONlines,
  exampleJSONlines,
  createRoom,
  createRequest,
  createChange,
  createCancel,
  createList,
  dateToString,
  stringToDate,
  getType
}
