import { Flex } from '@mantine/core'
import { CELL_HEIGHT, CELL_WIDTH } from '../constants'
import GridCell from './grid-cell'

interface RenderCellProps {
  day: number
  cellRefs: React.RefObject<(HTMLDivElement | null)[]>
}

export function RenderCell({ day, cellRefs }: RenderCellProps) {
  const cells = [day * 2, day * 2 + 1]

  return (
    <Flex key={day} miw={160}>
      <GridCell
        w={CELL_WIDTH}
        h={CELL_HEIGHT}
        ref={(el: HTMLDivElement | null) => {
          cellRefs.current[cells[0]] = el
        }}
      >
        {cells[0]}
      </GridCell>
      <GridCell
        w={CELL_WIDTH}
        h={CELL_HEIGHT}
        ref={(el: HTMLDivElement | null) => {
          cellRefs.current[cells[1]] = el
        }}
      >
        {cells[1]}
      </GridCell>
    </Flex>
  )
}
