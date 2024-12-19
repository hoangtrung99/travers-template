import localeDayjs from '@/lib/dayjs'
import { autoScrollForElements } from '@atlaskit/pragmatic-drag-and-drop-auto-scroll/element'
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine'
import {
  dropTargetForElements,
  monitorForElements
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { Box, Flex, Stack, Text } from '@mantine/core'
import { create } from 'mutative'
import { useCallback, useEffect, useRef, useState } from 'react'
import BorderedBox from './border-box'
import CalenderHeader from './calendar-header'
import { CELL_HEIGHT, CELL_TEAM_WIDTH, CELL_WIDTH } from './constants'
import EventBox from './event-box'
import EventPreview from './event-preview'
import { type MachineEvent, teams as mockTeams } from './mock-data'
import {
  calculateEventStartPositionByCellNumber,
  getEventDurationCellCount,
  getNewEventPosition
} from './utils'

export default function CalendarGrid() {
  const [teams, setTeams] = useState(mockTeams)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cleanup = combine(
      autoScrollForElements({
        element: scrollRef.current!
      }),
      monitorForElements({
        onDrop: ({ source, location }) => {
          if (source.data.type === 'divider') return

          const targetData = location.current.dropTargets[0].data
          const event = source.data.event as MachineEvent
          const teamId = targetData.teamId as string
          const targetCellNumber = targetData.targetCellNumber as number

          handleEventMove(event, targetCellNumber, teamId)
        }
      })
    )

    return () => cleanup()
  }, [])

  const handleEventMove = useCallback(
    (event: MachineEvent, targetCellNumber: number, targetTeamId: string) => {
      setTeams((prevTeams) => {
        return create(prevTeams, (draft) => {
          const sourceTeam = draft.find((t) =>
            t.events.some((e) => e.id === event.id)
          )

          if (!sourceTeam) return

          sourceTeam.events = sourceTeam.events.filter((e) => e.id !== event.id)

          const targetTeam = draft.find((t) => t.id === targetTeamId)

          if (targetTeam) {
            const durationCellCount = getEventDurationCellCount(event)
            const { newFrom, newTo } = getNewEventPosition(
              durationCellCount,
              targetCellNumber
            )

            targetTeam.events.push({
              ...event,
              from: newFrom,
              to: newTo
            })
          }
        })
      })
    },
    []
  )

  return (
    <>
      <Stack
        gap={0}
        maw={1320}
        ref={scrollRef}
        style={{
          overflow: 'auto',
          position: 'relative'
        }}
      >
        <CalenderHeader />
        {teams.map((team, index) => (
          <CalendarBody
            key={team.id}
            events={team.events}
            row={index}
            teamId={team.id}
            teamName={team.name}
          />
        ))}
      </Stack>
      <Box mah={400} style={{ overflow: 'auto' }}>
        <pre
          style={{
            whiteSpace: 'pre-wrap',
            fontSize: '14px',
            padding: '12px',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px'
          }}
        >
          {JSON.stringify(teams, null, 2)}
        </pre>
      </Box>
    </>
  )
}

function CalendarBody({
  events,
  row,
  teamId,
  teamName
}: {
  events: MachineEvent[]
  row: number
  teamId: string
  teamName: string
}) {
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
              <BorderedBox
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
              </BorderedBox>
            )

          const cells = [day * 2, day * 2 + 1]

          return (
            <Flex key={day} miw={160}>
              <BorderedBox
                w={CELL_WIDTH}
                h={CELL_HEIGHT}
                ref={(el: HTMLDivElement | null) => {
                  cellRefs.current[cells[0]] = el
                }}
              >
                {cells[0]}
              </BorderedBox>
              <BorderedBox
                w={CELL_WIDTH}
                h={CELL_HEIGHT}
                ref={(el: HTMLDivElement | null) => {
                  cellRefs.current[cells[1]] = el
                }}
              >
                {cells[1]}
              </BorderedBox>
            </Flex>
          )
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
            <EventBox key={`${event.from}-${event.to}`} event={event} />
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
