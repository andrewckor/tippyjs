import { Selectors, Browser } from './globals'

import followCursorHandler  from './followCursorHandler'
import createPopperInstance from './createPopperInstance'

import prefix from '../utils/prefix'

/**
* Appends the popper and creates a popper instance if one does not exist
* Also updates its position if need be and enables event listeners
* @param {Object} data -  the element/popper reference data
*/
export default function mountPopper(data) {
  const {
    reference,
    popper,
    options: {
      appendTo,
      followCursor
    }
  } = data

  // Already on the DOM
  if (appendTo.contains(popper)) return

  appendTo.appendChild(popper)

  if (!data.popperInstance) {
    data.popperInstance = createPopperInstance(data)
  } else {
    data.popperInstance.update()
    if (!followCursor || Browser.touch) {
      data.popperInstance.enableEventListeners()
    }
  }

  // Since touch is determined dynamically, followCursor is set on mount
  if (followCursor && !Browser.touch) {
    reference.addEventListener('mousemove', followCursorHandler)
    data.popperInstance.disableEventListeners()
  }
}