import Calendar from '@/components/calendar/calendar'
import { Container, Stack, Title } from '@mantine/core'
import { connection } from 'next/server'

export default async function Page() {
  await connection()

  return (
    <Stack gap="xl">
      <Container size="xl">
        <Title order={1}>Hello</Title>
        <Calendar />
      </Container>
    </Stack>
  )
}
