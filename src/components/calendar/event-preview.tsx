import { Box, Text } from '@mantine/core'
import { CELL_HEIGHT, CELL_WIDTH } from './constants'
import { EVENT_BOX_PADDING } from './constants'
import type { MachineEvent } from './mock-data'
import { getCellCount } from './utils'

const EventPreview = ({
  event,
  style
}: {
  event: MachineEvent
  style?: React.CSSProperties
}) => {
  const cellCount = getCellCount(event)

  return (
    <Box
      style={{
        backgroundColor: '#e3f2fd',
        border: '1px solid #90caf9',
        borderRadius: '4px',
        padding: '4px',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        pointerEvents: 'none',
        width: `${cellCount * CELL_WIDTH - EVENT_BOX_PADDING}px`,
        height: CELL_HEIGHT - EVENT_BOX_PADDING,
        ...style
      }}
    >
      <Text size="sm">{event.title}</Text>
    </Box>
  )
}

export default EventPreview
