import type { Team } from './types'

export const teams: Team[] = [
  {
    id: 'team1',
    name: 'Team A',
    events: [
      {
        id: 'event1',
        from: '2024-12-02 08:00:00',
        to: '2024-12-03 12:00:00',
        title: 'テスト1',
        team_id: 'team1'
      },
      {
        id: 'event2',
        from: '2024-12-06 13:00:00',
        to: '2024-12-08 17:00:00',
        title: 'テスト2',
        team_id: 'team1'
      }
    ]
  },
  {
    id: 'team2',
    name: 'Team B',
    events: [
      {
        id: 'event3',
        from: '2024-12-05 08:00:00',
        to: '2024-12-06 12:00:00',
        title: 'テスト3',
        team_id: 'team2'
      }
    ]
  },
  {
    id: 'team3',
    name: 'Team C',
    events: [
      {
        id: 'event4',
        from: '2024-12-04 08:00:00',
        to: '2024-12-05 17:00:00',
        title: 'テスト4',
        team_id: 'team3'
      }
    ]
  },
  {
    id: 'team4',
    name: 'Team D',
    events: [
      {
        id: 'event5',
        from: '2024-12-10 13:00:00',
        to: '2024-12-12 12:00:00',
        title: 'テスト5',
        team_id: 'team4'
      }
    ]
  },
  {
    id: 'team5',
    name: 'Team E',
    events: [
      {
        id: 'event6',
        from: '2024-12-08 08:00:00',
        to: '2024-12-09 17:00:00',
        title: 'テスト6',
        team_id: 'team5'
      }
    ]
  },
  {
    id: 'team6',
    name: 'Team F',
    events: [
      {
        id: 'event7',
        from: '2024-12-15 08:00:00',
        to: '2024-12-16 12:00:00',
        title: 'テスト7',
        team_id: 'team6'
      }
    ]
  },
  {
    id: 'team7',
    name: 'Team G',
    events: [
      {
        id: 'event8',
        from: '2024-12-13 13:00:00',
        to: '2024-12-15 17:00:00',
        title: 'テスト8',
        team_id: 'team7'
      }
    ]
  },
  {
    id: 'team8',
    name: 'Team H',
    events: [
      {
        id: 'event9',
        from: '2024-12-18 08:00:00',
        to: '2024-12-19 12:00:00',
        title: 'テスト9',
        team_id: 'team8'
      }
    ]
  },
  {
    id: 'team9',
    name: 'Team I',
    events: [
      {
        id: 'event10',
        from: '2024-12-20 13:00:00',
        to: '2024-12-22 17:00:00',
        title: 'テスト10',
        team_id: 'team9'
      }
    ]
  },
  {
    id: 'team10',
    name: 'Team J',
    events: [
      {
        id: 'event11',
        from: '2024-12-25 08:00:00',
        to: '2024-12-26 12:00:00',
        title: 'テスト11',
        team_id: 'team10'
      }
    ]
  }
]
