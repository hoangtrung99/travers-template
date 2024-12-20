import { atomWithToggle } from '@/lib/atom-util'
import { atom } from 'jotai'
import { CELL_WIDTH, EVENT_BOX_PADDING } from '../constants'
import type { MachineEvent } from '../types'
import {
  calculateEventStartPositionByDay,
  getEventDurationCellCount,
  getEventStyle,
  getNewEventEndTimeFromWidth
} from '../utils'

export const isDraggingAtom = atomWithToggle(false)
export const isResizingAtom = atomWithToggle(false)
export const widthAtom = atom<number | null>(null)

export const eventAtom = atom<MachineEvent>({
  id: '',
  from: '',
  to: '',
  title: '',
  team_id: ''
})

export const eventTimeAtom = atom(
  (get) => get(eventAtom),
  (get, set, newWidth: number) => {
    const event = get(eventAtom)
    const newTo = getNewEventEndTimeFromWidth({
      startTime: event.from,
      width: newWidth
    })
    set(eventAtom, {
      ...event,
      to: newTo
    })
    set(widthAtom, newWidth)
  }
)

export const previewContainerAtom = atom<HTMLElement | null>(null)

export const initialWidthAtom = atom((get) => {
  const customWidth = get(widthAtom)
  if (customWidth !== null) {
    return customWidth
  }
  const event = get(eventAtom)
  const cellCount = getEventDurationCellCount(event)
  return cellCount * CELL_WIDTH - EVENT_BOX_PADDING
})

export const leftPositionAtom = atom<number>((get) => {
  const event = get(eventAtom)
  return calculateEventStartPositionByDay(event.from)
})

export const eventStyleAtom = atom<React.CSSProperties>((get) => {
  const isDragging = get(isDraggingAtom)
  const leftPosition = get(leftPositionAtom)
  const initialWidth = get(initialWidthAtom)
  const defaultStyle = getEventStyle(isDragging)

  return {
    ...defaultStyle,
    left: `${leftPosition + EVENT_BOX_PADDING / 4}px`,
    '--local-initial-width': `${initialWidth}px`,
    width: 'var(--local-resizing-width, var(--local-initial-width))'
  }
})
