import { Box, type BoxProps } from '@mantine/core'
import { forwardRef } from 'react'

const GridCell = forwardRef<
  HTMLDivElement,
  { children?: React.ReactNode } & BoxProps
>(({ children, ...props }, ref) => (
  <Box
    ref={ref}
    {...props}
    style={{
      border: '1px solid black',
      borderBottom: 'none',
      borderLeft: 'none',
      ...props.style
    }}
  >
    {children}
  </Box>
))

export default GridCell
