import localeDayjs from '@/lib/dayjs'
import { Box, Center, Flex } from '@mantine/core'

export default function CalenderHeader() {
  const days = localeDayjs().daysInMonth()

  return (
    <Flex>
      {[...new Array(days + 1).keys()].map((day) => {
        if (day === 0) return <Box miw={80} key={day} />
        return (
          <Center key={day} miw={160}>
            {localeDayjs().locale('ja').date(day).format('dd')} {day}
          </Center>
        )
      })}
    </Flex>
  )
}
