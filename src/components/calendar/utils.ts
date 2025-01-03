import localeDayjs from '@/lib/dayjs'
import type { DragLocationHistory } from '@atlaskit/pragmatic-drag-and-drop/dist/types/internal-types'
import {
  CELL_HEIGHT,
  CELL_TEAM_WIDTH,
  CELL_WIDTH,
  COL_WIDTH,
  END_TIME_AFTERNOON,
  END_TIME_MORNING,
  EVENT_BOX_MAX_WIDTH,
  EVENT_BOX_MIN_WIDTH,
  EVENT_BOX_PADDING,
  START_TIME_AFTERNOON,
  START_TIME_MORNING
} from './constants'
import type { MachineEvent } from './types'

export const getEventPosition = (dateStr: string) => {
  const date = localeDayjs(dateStr)
  const hour = date.hour()
  return {
    day: date.date(),
    isAfternoon: hour >= 13
  }
}

export const getEventDurationCellCount = (event: MachineEvent) => {
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

export const calculateEventStartPositionByDay = (from: string) => {
  const startPos = getEventPosition(from)
  const additionLeftPosition = startPos.isAfternoon ? CELL_WIDTH : 0
  const leftPosition = (startPos.day - 1) * COL_WIDTH + CELL_TEAM_WIDTH
  // if start is afternoon, add 1 cell width
  return leftPosition + additionLeftPosition
}

export const calculateEventStartPositionByCellNumber = (cellNumber: number) => {
  const newFrom = getNewEventFromByCellNumber(cellNumber)
  return calculateEventStartPositionByDay(newFrom)
}

export const getDayFromCellNumber = (cellNumber: number) => {
  return Math.floor((cellNumber - 2) / 2) + 1
}

export const getStartCellNumberByEvent = (event: MachineEvent) => {
  return getStartCellNumberByDay(event.from)
}

export const getStartCellNumberByDay = (day: string) => {
  const startPos = getEventPosition(day)

  return 1 + (startPos.day - 1) * 2 + (startPos.isAfternoon ? 2 : 1)
}

export const calculateEndCellNumber = (
  startCellNumber: number,
  durationCellCount: number
) => {
  return startCellNumber + durationCellCount - 1
}

export const getNewEventPosition = (
  eventDurationCellCount: number,
  targetCellNumber: number
) => {
  const newFrom = getNewEventFromByCellNumber(targetCellNumber)

  const startCellNumber = getStartCellNumberByDay(newFrom)
  const endCellNumber = calculateEndCellNumber(
    startCellNumber,
    eventDurationCellCount
  )

  const newTo = getNewEventToByCellNumber(endCellNumber)

  return {
    newFrom,
    newTo
  }
}

export const getNewEventFromByCellNumber = (cellNumber: number) => {
  const newDay = getDayFromCellNumber(cellNumber)
  const isAfternoon = isAfternoonCell(cellNumber)
  const newFrom = localeDayjs()
    .date(newDay)
    .hour(isAfternoon ? START_TIME_AFTERNOON : START_TIME_MORNING)
    .minute(0)
    .second(0)
    .format('YYYY-MM-DD HH:mm:ss')

  return newFrom
}

export const getNewEventToByCellNumber = (endCellNumber: number) => {
  const endDay = getDayFromCellNumber(endCellNumber)
  const isAfternoon = isAfternoonCell(endCellNumber)

  const newTo = localeDayjs()
    .date(endDay)
    .hour(isAfternoon ? END_TIME_AFTERNOON : END_TIME_MORNING)
    .minute(0)
    .second(0)
    .format('YYYY-MM-DD HH:mm:ss')

  return newTo
}

export const isAfternoonCell = (cellNumber: number) => {
  // Odd numbers are afternoon cells
  return cellNumber % 2 === 1
}

export const getEventStyle = (isDragging: boolean): React.CSSProperties => ({
  position: 'absolute',
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

export const getProposedWidth = ({
  initialWidth,
  location
}: {
  initialWidth: number
  location: DragLocationHistory
}) => {
  const diffX = location.current.input.clientX - location.initial.input.clientX
  const cellDiff = Math.round(diffX / CELL_WIDTH)
  const proposedWidth = initialWidth + cellDiff * CELL_WIDTH

  // ensure we don't go below the min or above the max allowed widths
  return Math.min(
    Math.max(EVENT_BOX_MIN_WIDTH, proposedWidth),
    EVENT_BOX_MAX_WIDTH
  )
}

export const getNewEventEndTimeFromWidth = ({
  startTime,
  width
}: {
  startTime: string
  width: number
}) => {
  const cellCount = Math.round((width + EVENT_BOX_PADDING) / CELL_WIDTH)
  const startPos = getEventPosition(startTime)
  const startDay = startPos.day
  const startIsAfternoon = startPos.isAfternoon

  // Calculate end day and period based on cell count
  const totalHalfDays = cellCount + (startIsAfternoon ? 1 : 0)
  const endDay = startDay + Math.floor(totalHalfDays / 2)
  const endIsAfternoon = totalHalfDays % 2 === 1

  return localeDayjs()
    .date(endDay)
    .hour(endIsAfternoon ? END_TIME_AFTERNOON : END_TIME_MORNING)
    .minute(0)
    .second(0)
    .format('YYYY-MM-DD HH:mm:ss')
}
