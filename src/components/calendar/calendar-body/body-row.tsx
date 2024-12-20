import AtomsHydrator from '@/components/atoms-hydrator'
import localeDayjs from '@/lib/dayjs'
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { Box, Flex, Text } from '@mantine/core'
import { Provider } from 'jotai'
import { useEffect, useRef, useState } from 'react'
import { CELL_HEIGHT, CELL_TEAM_WIDTH } from '../constants'
import { EventBox, EventPreview } from '../event-box'
import { eventAtom } from '../event-box/atom'
import type { MachineEvent } from '../types'
import { calculateEventStartPositionByCellNumber } from '../utils'
import GridCell from './grid-cell'
import { RenderCell } from './render-cell'

interface CalendarBodyProps {
  events: MachineEvent[]
  teamId: string
  teamName: string
}

export function CalendarBody({ events, teamId, teamName }: CalendarBodyProps) {
  const days = localeDayjs().daysInMonth()
  const cellRefs = useRef<(HTMLDivElement | null)[]>([])
  const [dropTarget, setDropTarget] = useState<{
    targetCellNumber: number
    event: MachineEvent
  } | null>(null)

  useEffect(() => {
    const cleanups: Array<() => void> = []

    for (const [targetCellNumber, cell] of cellRefs.current.entries()) {
      if (cell) {
        cleanups.push(
          dropTargetForElements({
            element: cell,
            onDragEnter: ({ source }) => {
              const eventData = source.data as { event: MachineEvent }

              if (eventData.event) {
                setDropTarget({
                  targetCellNumber,
                  event: eventData.event
                })
              }
            },
            onDragLeave: () => {
              setDropTarget(null)
            },
            getData: ({ source }) => {
              return {
                ...source,
                teamId,
                targetCellNumber
              }
            },
            onDrop: () => {
              setDropTarget(null)
            }
          })
        )
      }
    }

    return () => {
      for (const cleanup of cleanups) {
        cleanup()
      }
    }
  }, [teamId])

  return (
    <Box pos="relative" w="max-content">
      <Flex>
        {[...new Array(days + 1).keys()].map((day) => {
          if (day === 0)
            return (
              <GridCell
                miw={CELL_TEAM_WIDTH}
                key={day}
                style={{
                  position: 'sticky',
                  left: 0,
                  backgroundColor: 'white',
                  zIndex: 10000,
                  borderLeft: '1px solid black'
                }}
              >
                <Text size="sm" p="xs">
                  {teamName}
                </Text>
              </GridCell>
            )

          return <RenderCell key={day} day={day} cellRefs={cellRefs} />
        })}
      </Flex>
      <Box
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: `${CELL_HEIGHT}px`,
          pointerEvents: 'none'
        }}
      >
        <Box style={{ pointerEvents: 'auto' }}>
          {events.map((event) => (
            <Provider key={`${event.from}-${event.to}`}>
              <AtomsHydrator atomValues={[[eventAtom, event]]}>
                <EventBox />
              </AtomsHydrator>
            </Provider>
          ))}
          {dropTarget && (
            <EventPreview
              event={dropTarget.event}
              style={{
                position: 'absolute',
                left: calculateEventStartPositionByCellNumber(
                  dropTarget.targetCellNumber
                ),
                opacity: 0.7,
                pointerEvents: 'none'
              }}
            />
          )}
        </Box>
      </Box>
    </Box>
  )
}
