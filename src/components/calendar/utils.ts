import localeDayjs from '@/lib/dayjs'
import {
  CELL_HEIGHT,
  CELL_TEAM_WIDTH,
  CELL_WIDTH,
  COL_WIDTH,
  EVENT_BOX_PADDING
} from './constants'
import type { MachineEvent } from './mock-data'

export const getEventPosition = (dateStr: string) => {
  const date = localeDayjs(dateStr)
  const hour = date.hour()
  return {
    day: date.date(),
    isAfternoon: hour >= 13
  }
}

export const getCellCount = (event: MachineEvent) => {
  const startPos = getEventPosition(event.from)
  const endPos = getEventPosition(event.to)
  return calculateCellCount(startPos, endPos)
}

export const calculateCellCount = (
  startPos: ReturnType<typeof getEventPosition>,
  endPos: ReturnType<typeof getEventPosition>
) => {
  const dayDiff = endPos.day - startPos.day
  let cellCount = dayDiff * 2
  cellCount -= startPos.isAfternoon ? 1 : 0
  cellCount += endPos.isAfternoon ? 2 : 1
  return cellCount
}

export const calculateEventStartPosition = (event: MachineEvent) => {
  const startPos = getEventPosition(event.from)
  const additionLeftPosition = startPos.isAfternoon ? CELL_WIDTH : 0
  const leftPosition = (startPos.day - 1) * COL_WIDTH + CELL_TEAM_WIDTH
  // if start is afternoon, add 1 cell width
  return leftPosition + additionLeftPosition
}

export const getStartCellNumberByEvent = (event: MachineEvent) => {
  return getStartCellNumberByDay(event.from)
}

export const getStartCellNumberByDay = (day: string) => {
  const startPos = getEventPosition(day)

  return 1 + (startPos.day - 1) * 2 + (startPos.isAfternoon ? 2 : 1)
}

export const calculateEventStyle = (
  cellCount: number,
  isDragging: boolean
): React.CSSProperties => ({
  position: 'absolute',
  width: `${cellCount * CELL_WIDTH - EVENT_BOX_PADDING}px`,
  height: CELL_HEIGHT - EVENT_BOX_PADDING,
  backgroundColor: '#e3f2fd',
  border: '1px solid #90caf9',
  borderRadius: '4px',
  padding: '4px',
  margin: '2px',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  zIndex: isDragging ? -1 : 10,
  opacity: isDragging ? 0.5 : 1,
  top: EVENT_BOX_PADDING / 4,
  cursor: 'grab',
  touchAction: 'none',
  userSelect: 'none'
})
