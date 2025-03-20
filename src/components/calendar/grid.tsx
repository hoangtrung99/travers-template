import { autoScrollForElements } from '@atlaskit/pragmatic-drag-and-drop-auto-scroll/element'
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine'
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { Box, Stack } from '@mantine/core'
import { create } from 'mutative'
import { useCallback, useEffect, useRef, useState } from 'react'
import { CalendarBody } from './calendar-body/body-row'
import CalenderHeader from './calendar-header'
import { DRAG_RESIZE_TYPE } from './constants'
import { allTeams as mockTeams } from './mock-data'
import type { MachineEvent } from './types'
import { getEventDurationCellCount, getNewEventPosition } from './utils'

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
          if (source.data.type === DRAG_RESIZE_TYPE) return

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
