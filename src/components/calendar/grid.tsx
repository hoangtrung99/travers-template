import localeDayjs from '@/lib/dayjs'
import { autoScrollForElements } from '@atlaskit/pragmatic-drag-and-drop-auto-scroll/element'
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { Box, Flex, Stack, Text } from '@mantine/core'
import { create } from 'mutative'
import { useCallback, useEffect, useRef, useState } from 'react'
import BorderedBox from './border-box'
import CalenderHeader from './calendar-header'
import { CELL_HEIGHT, CELL_WIDTH } from './constants'
import EventBox from './event-box'
import { type MachineEvent, teams as mockTeams } from './mock-data'
import { getCellCount, getStartCellNumberByDay } from './utils'

function CalendarBody({
  events,
  row,
  teamId,
  teamName,
  onEventMove
}: {
  events: MachineEvent[]
  row: number
  teamId: string
  teamName: string
  onEventMove: (
    event: MachineEvent,
    newDay: number,
    isAfternoon: boolean,
    teamId: string
  ) => void
}) {
  const days = localeDayjs().daysInMonth()
  const cellRefs = useRef<(HTMLDivElement | null)[]>([])
  const [dropTarget, setDropTarget] = useState<{
    startCellNumber: number
    duration: number
  } | null>(null)

  const handleDrop = useCallback(
    (target: HTMLElement, data: { event: MachineEvent }) => {
      const day = Number(target.dataset.day)
      const isAfternoon = target.dataset.period === 'afternoon'
      if (data.event) {
        onEventMove(data.event, day, isAfternoon, teamId)
      }
      setDropTarget(null)
    },
    [onEventMove, teamId]
  )

  useEffect(() => {
    const cleanups: Array<() => void> = []

    for (const cell of cellRefs.current) {
      if (cell) {
        cleanups.push(
          dropTargetForElements({
            element: cell,
            onDragEnter: ({ source }) => {
              const eventData = source.data as { event: MachineEvent }

              if (eventData.event) {
                const startCellNumber = Number(cell.dataset.cell)
                const duration = getCellCount(eventData.event)

                setDropTarget({
                  startCellNumber,
                  duration
                })
              }
            },
            onDragLeave: () => {
              setDropTarget(null)
            },
            onDrop: ({ source }) => {
              console.log('onDrop')
              handleDrop(cell, source.data as { event: MachineEvent })
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
  }, [handleDrop])

  const shouldHighlightCell = (cellNumber: number) => {
    if (!dropTarget) return false

    const startCellIndex = dropTarget.startCellNumber
    const endCellIndex = startCellIndex + dropTarget.duration - 1

    return cellNumber >= startCellIndex && cellNumber <= endCellIndex
  }

  return (
    <Box style={{ position: 'relative' }}>
      <Flex>
        {[...new Array(days + 1).keys()].map((day) => {
          if (day === 0)
            return (
              <BorderedBox miw={80} key={day}>
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
                data-row={row}
                data-day={day}
                data-cell={cells[0]}
                data-period="morning"
                style={{
                  backgroundColor: shouldHighlightCell(cells[0])
                    ? '#e3f2fd'
                    : undefined
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
                data-row={row}
                data-day={day}
                data-cell={cells[1]}
                data-period="afternoon"
                style={{
                  backgroundColor: shouldHighlightCell(cells[1])
                    ? '#e3f2fd'
                    : undefined
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
            <EventBox
              key={`${event.from}-${event.to}`}
              event={event}
              columnStart={localeDayjs(event.from).date()}
            />
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default function CalendarGrid() {
  const [teams, setTeams] = useState(mockTeams)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cleanup = autoScrollForElements({
      element: scrollRef.current!
    })
    return () => cleanup()
  }, [])

  const handleEventMove = useCallback(
    (
      event: MachineEvent,
      newDay: number,
      isAfternoon: boolean,
      targetTeamId: string
    ) => {
      setTeams((prevTeams) => {
        return create(prevTeams, (draft) => {
          const sourceTeam = draft.find((t) =>
            t.events.some((e) => e.id === event.id)
          )

          if (!sourceTeam) return

          sourceTeam.events = sourceTeam.events.filter((e) => e.id !== event.id)

          const targetTeam = draft.find((t) => t.id === targetTeamId)
          if (targetTeam) {
            const newFrom = localeDayjs()
              .date(newDay)
              .hour(isAfternoon ? 13 : 8)
              .minute(0)
              .second(0)
              .format('YYYY-MM-DD HH:mm:ss')

            const cellCount = getCellCount(event)
            const startCellNumber = getStartCellNumberByDay(newFrom)
            const endCellNumber = startCellNumber + cellCount
            const endDay = Math.floor((endCellNumber - 1) / 2)
            const isEndAfternoon = endCellNumber % 2 === 0

            const newTo = localeDayjs()
              .date(endDay)
              .hour(isEndAfternoon ? 20 : 12)
              .minute(0)
              .second(0)
              .format('YYYY-MM-DD HH:mm:ss')

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
      <Stack gap={0} maw={1320} ref={scrollRef} style={{ overflow: 'auto' }}>
        <CalenderHeader />
        <Box style={{ position: 'relative' }}>
          <Stack
            gap={0}
            style={{
              border: '1px solid black',
              borderRight: 'none',
              borderBottom: 'none'
            }}
          >
            {teams.map((team, index) => (
              <CalendarBody
                key={team.id}
                events={team.events}
                row={index}
                teamId={team.id}
                teamName={team.name}
                onEventMove={handleEventMove}
              />
            ))}
          </Stack>
        </Box>
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
