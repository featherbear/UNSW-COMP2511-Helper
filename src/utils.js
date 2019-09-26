// Event factory: Execute callback if Enter key was pressed
export const keyDownEventFactory = callback => e => {
  e.keyCode && e.keyCode === 13 && callback()
}

export const objKeys = {
  pack (obj) {
    // Convert {key: value} into {value: [key, ...]}
    let res = {}
    for (let [key, val] of Object.entries(obj)) {
      if (!(val in res)) res[val] = []
      res[val].push(key)
    }
    return res
  },
  unpack (obj) {
    // Convert {value: [key, ...]} into {key: value}
    let res = {}
    for (let [val, keys] of Object.entries(obj)) {
      for (let key of keys) {
        res[key] = val
      }
    }
    return res
  }
}
