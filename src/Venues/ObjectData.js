const createRoom = (venue, room, size) => ({
  command: 'room',
  venue: venue,
  room: room,
  size: size
})

const createRequest = (id, startDate, endDate, nSmall, nMedium, nLarge) => ({
  command: 'request',
  id: id,
  start: startDate instanceof Date ? dateToString(startDate) : startDate,
  end: endDate instanceof Date ? dateToString(endDate) : endDate,
  small: nSmall || 0,
  medium: nMedium || 0,
  large: nLarge || 0
})

const createChange = (id, startDate, endDate, nSmall, nMedium, nLarge) => ({
  command: 'change',
  id: id,
  start: startDate instanceof Date ? dateToString(startDate) : startDate,
  end: endDate instanceof Date ? dateToString(endDate) : endDate,
  small: nSmall || 0,
  medium: nMedium || 0,
  large: nLarge || 0
})

const createCancel = id => ({
  command: 'cancel',
  id: id
})

const createList = venue => ({ command: 'list', venue: venue })

const dateToString = dateObj => dateObj.format('yyyy-mm-dd')

const stringToDate = str => Date.parse(str)

const getType = command => command.command

module.exports = {
  createRoom,
  createRequest,
  createChange,
  createCancel,
  createList,
  dateToString,
  stringToDate,
  getType
}
