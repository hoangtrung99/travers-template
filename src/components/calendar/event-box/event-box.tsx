import { Box, Divider, Flex, Text } from '@mantine/core'
import { useAtomValue } from 'jotai'
import { useRef } from 'react'
import React from 'react'
import { createPortal } from 'react-dom'
import { eventAtom, eventStyleAtom, previewContainerAtom } from './atom'
import { EventPreview } from './event-preview'
import { useDragHandler } from './hooks/useDragHandler'
import { useResizeHandler } from './hooks/useResizeHandler'

const EventBoxInner = () => {
  const event = useAtomValue(eventAtom)
  const ref = useRef<HTMLDivElement>(null)
  const dividerRef = useRef<HTMLDivElement>(null)

  const previewContainer = useAtomValue(previewContainerAtom)
  const eventStyle = useAtomValue(eventStyleAtom)

  console.log('event box', event)

  useDragHandler(ref)
  useResizeHandler(dividerRef, ref)

  return (
    <>
      <Box ref={ref} style={eventStyle} onClick={(e) => e.stopPropagation()}>
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

export const EventBox = React.memo(EventBoxInner)
