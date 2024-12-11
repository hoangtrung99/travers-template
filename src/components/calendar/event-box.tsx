import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { setCustomNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview'
import { Box, Text } from '@mantine/core'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import { EVENT_BOX_PADDING } from './constants'
import EventPreview from './event-preview'
import type { MachineEvent } from './mock-data'
import {
  calculateEventStartPosition,
  calculateEventStyle,
  getEventDurationCellCount
} from './utils'

const EventBox = ({
  event,
  columnStart
}: {
  event: MachineEvent
  columnStart: number
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [previewContainer, setPreviewContainer] = useState<HTMLElement | null>(
    null
  )

  const cellCount = getEventDurationCellCount(event)
  const leftPosition = calculateEventStartPosition(event.from)
  const eventStyle = calculateEventStyle(cellCount, isDragging)

  useEffect(() => {
    if (!ref.current) return

    const cleanup = draggable({
      element: ref.current,
      getInitialData: () => ({ event, columnStart }),
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
  }, [event, columnStart])

  return (
    <>
      <Box
        ref={ref}
        style={{
          ...eventStyle,
          left: `${leftPosition + EVENT_BOX_PADDING / 4}px`
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Text size="sm">{event.title}</Text>
      </Box>
      {previewContainer &&
        createPortal(<EventPreview event={event} />, previewContainer)}
    </>
  )
}

export default EventBox
