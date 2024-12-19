import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { disableNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/disable-native-drag-preview'
import { setCustomNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview'
import { preventUnhandled } from '@atlaskit/pragmatic-drag-and-drop/prevent-unhandled'
import { Box, Divider, Flex, Text } from '@mantine/core'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import invariant from 'tiny-invariant'

import type { DragLocationHistory } from '@atlaskit/pragmatic-drag-and-drop/dist/types/internal-types'
import { CELL_WIDTH, EVENT_BOX_PADDING } from './constants'
import EventPreview from './event-preview'
import type { MachineEvent } from './mock-data'
import {
  calculateEventStartPositionByDay,
  calculateEventStyle,
  getEventDurationCellCount
} from './utils'

const widths = {
  min: 100,
  max: 1000
}

const noPointerEventsStyles = {
  pointerEvents: 'none'
}

function getProposedWidth({
  initialWidth,
  location
}: {
  initialWidth: number
  location: DragLocationHistory
}): number {
  const diffX = location.current.input.clientX - location.initial.input.clientX
  const proposedWidth = initialWidth + diffX

  // ensure we don't go below the min or above the max allowed widths
  return Math.min(Math.max(widths.min, proposedWidth), widths.max)
}

const sidebarDividerStyles = {
  // width: 'calc(var(--grid) * 4)',
  width: '2px',
  height: '100%',
  cursor: 'ew-resize',
  flexGrow: '0',
  flexShrink: '0',
  position: 'relative',
  background: 'transparent',
  '&::before': {
    background: '#0C66E4',
    content: '""',
    position: 'absolute',
    top: 0,
    bottom: 0,
    // width: 'var(--border-width)',
    width: '2px'
  }
}

type State =
  | {
      type: 'idle'
    }
  | {
      type: 'dragging'
    }

const EventBox = ({
  event
}: {
  event: MachineEvent
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const dividerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [previewContainer, setPreviewContainer] = useState<HTMLElement | null>(
    null
  )

  const cellCount = getEventDurationCellCount(event)
  const leftPosition = calculateEventStartPositionByDay(event.from)
  const eventStyle = calculateEventStyle(cellCount, isDragging)

  const [initialWidth, setInitialWidth] = useState(
    cellCount * CELL_WIDTH - EVENT_BOX_PADDING
  )
  const [state, setState] = useState<State>({
    type: 'idle'
  })
  console.log(12121212, isDragging)

  useEffect(() => {
    if (!ref.current) return

    const cleanup = draggable({
      element: ref.current,
      getInitialData: () => ({ event }),
      onDragStart: () => setIsDragging(true),
      onDrop: () => {
        setIsDragging(false)
        setPreviewContainer(null)
      },
      onGenerateDragPreview({ nativeSetDragImage }) {
        setCustomNativeDragPreview({
          render({ container }) {
            setPreviewContainer(container)
          },
          nativeSetDragImage,
          getOffset: () => ({ x: 8, y: 8 })
        })
      }
    })

    return cleanup
  }, [event])

  useEffect(() => {
    const divider = dividerRef.current
    invariant(divider)

    return draggable({
      element: divider,
      getInitialData: () => ({ type: 'divider' }),
      onGenerateDragPreview: ({ nativeSetDragImage }) => {
        // we will be moving the line to indicate a drag
        // we can disable the native drag preview
        disableNativeDragPreview({ nativeSetDragImage })
        // we don't want any native drop animation for when the user
        // does not drop on a drop target. we want the drag to finish immediately
        preventUnhandled.start()
      },
      onDragStart() {
        setState({ type: 'dragging' })
      },
      onDrag({ location }) {
        ref.current?.style.setProperty(
          '--local-resizing-width',
          `${getProposedWidth({ initialWidth, location })}px`
        )
      },
      onDrop({ location }) {
        preventUnhandled.stop()
        setState({ type: 'idle' })

        setInitialWidth(getProposedWidth({ initialWidth, location }))
        ref.current?.style.removeProperty('--local-resizing-width')
      }
    })
  }, [initialWidth])

  return (
    <>
      <Box
        ref={ref}
        style={{
          ...eventStyle,
          left: `${leftPosition + EVENT_BOX_PADDING / 4}px`,
          '--local-resizing-width': `${initialWidth}px`,
          width: 'var(--local-resizing-width, var(--local-initial-width))'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Flex pos="relative" h="100%">
          <Text size="sm">{event.title}</Text>

          <Divider
            ref={dividerRef}
            onClick={(e) => e.stopPropagation()}
            orientation="vertical"
            size="sm"
            color="#0C66E4"
            style={{
              cursor: 'ew-resize',
              position: 'absolute',
              right: -4,
              bottom: 0,
              top: 0,
              zIndex: 1200
            }}
          />
        </Flex>
      </Box>
      {previewContainer &&
        createPortal(<EventPreview event={event} />, previewContainer)}
    </>
  )
}

export default EventBox
