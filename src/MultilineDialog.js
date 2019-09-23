// Heavily FOSS'd from https://github.com/c0bra/svelma

// TODO: https://stackoverflow.com/questions/22659164/read-a-drag-and-dropped-file

import MultilineDialog from './MultilineDialog.svelte'

function createDialog (props) {
  if (typeof props === 'string') props = { title: props }

  const dialog = new MultilineDialog({
    target: document.body,
    props,
    intro: true
  })

  dialog.$on('destroy', () => {
    dialog.$destroy()
  })

  return dialog.promise
}

export function prompt (props) {
  if (typeof props === 'string') props = { title: props }

  return createDialog(props)
}

MultilineDialog.prompt = prompt

export default MultilineDialog
