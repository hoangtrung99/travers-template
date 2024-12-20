export interface MachineEvent {
  id: string
  from: string
  to: string
  title: string
  team_id: string
}

export interface Team {
  id: string
  name: string
  events: MachineEvent[]
}
