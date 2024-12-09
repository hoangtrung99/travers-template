import { Box, type BoxProps } from '@mantine/core'
import { forwardRef } from 'react'

const BorderedBox = forwardRef<
  HTMLDivElement,
  { children?: React.ReactNode } & BoxProps
>(({ children, ...props }, ref) => (
  <Box
    ref={ref}
    {...props}
    style={{
      borderRight: '1px solid black',
      borderBottom: '1px solid black',
      ...props.style
    }}
  >
    {children}
  </Box>
))

export default BorderedBox
