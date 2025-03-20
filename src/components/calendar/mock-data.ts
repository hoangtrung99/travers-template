import type { MachineEvent, Team } from './types'

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
      },
      {
        id: 'event101',
        from: '2024-12-12 08:00:00',
        to: '2024-12-13 12:00:00',
        title: 'Project Alpha',
        team_id: 'team1'
      },
      {
        id: 'event102',
        from: '2024-12-16 13:00:00',
        to: '2024-12-17 17:00:00',
        title: 'Strategy Meeting',
        team_id: 'team1'
      },
      {
        id: 'event103',
        from: '2024-12-22 08:00:00',
        to: '2024-12-22 17:00:00',
        title: 'Year Review',
        team_id: 'team1'
      },
      {
        id: 'event104',
        from: '2024-12-28 13:00:00',
        to: '2024-12-29 12:00:00',
        title: 'Planning 2025',
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
      },
      {
        id: 'event105',
        from: '2024-12-10 13:00:00',
        to: '2024-12-11 17:00:00',
        title: 'Product Demo',
        team_id: 'team2'
      },
      {
        id: 'event106',
        from: '2024-12-15 08:00:00',
        to: '2024-12-16 12:00:00',
        title: 'Client Meeting',
        team_id: 'team2'
      },
      {
        id: 'event107',
        from: '2024-12-20 13:00:00',
        to: '2024-12-21 17:00:00',
        title: 'Team Building',
        team_id: 'team2'
      },
      {
        id: 'event108',
        from: '2024-12-27 08:00:00',
        to: '2024-12-28 12:00:00',
        title: 'Project Beta',
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
      },
      {
        id: 'event109',
        from: '2024-12-09 13:00:00',
        to: '2024-12-10 17:00:00',
        title: 'Design Review',
        team_id: 'team3'
      },
      {
        id: 'event110',
        from: '2024-12-14 08:00:00',
        to: '2024-12-15 12:00:00',
        title: 'UI Workshop',
        team_id: 'team3'
      },
      {
        id: 'event111',
        from: '2024-12-19 13:00:00',
        to: '2024-12-20 17:00:00',
        title: 'UX Testing',
        team_id: 'team3'
      },
      {
        id: 'event112',
        from: '2024-12-26 08:00:00',
        to: '2024-12-27 12:00:00',
        title: 'Design Sprint',
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
      },
      {
        id: 'event113',
        from: '2024-12-03 08:00:00',
        to: '2024-12-04 12:00:00',
        title: 'Data Analysis',
        team_id: 'team4'
      },
      {
        id: 'event114',
        from: '2024-12-08 13:00:00',
        to: '2024-12-09 17:00:00',
        title: 'AI Training',
        team_id: 'team4'
      },
      {
        id: 'event115',
        from: '2024-12-17 08:00:00',
        to: '2024-12-18 12:00:00',
        title: 'Algorithm Review',
        team_id: 'team4'
      },
      {
        id: 'event116',
        from: '2024-12-23 13:00:00',
        to: '2024-12-24 17:00:00',
        title: 'ML Workshop',
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
      },
      {
        id: 'event117',
        from: '2024-12-13 13:00:00',
        to: '2024-12-14 17:00:00',
        title: 'Server Maintenance',
        team_id: 'team5'
      },
      {
        id: 'event118',
        from: '2024-12-18 08:00:00',
        to: '2024-12-19 12:00:00',
        title: 'Cloud Migration',
        team_id: 'team5'
      },
      {
        id: 'event119',
        from: '2024-12-24 13:00:00',
        to: '2024-12-25 17:00:00',
        title: 'DevOps Training',
        team_id: 'team5'
      },
      {
        id: 'event120',
        from: '2024-12-30 08:00:00',
        to: '2024-12-31 12:00:00',
        title: 'System Update',
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
      },
      {
        id: 'event121',
        from: '2024-12-01 13:00:00',
        to: '2024-12-02 17:00:00',
        title: 'Security Audit',
        team_id: 'team6'
      },
      {
        id: 'event122',
        from: '2024-12-07 08:00:00',
        to: '2024-12-08 12:00:00',
        title: 'Penetration Testing',
        team_id: 'team6'
      },
      {
        id: 'event123',
        from: '2024-12-21 13:00:00',
        to: '2024-12-22 17:00:00',
        title: 'Vulnerability Assessment',
        team_id: 'team6'
      },
      {
        id: 'event124',
        from: '2024-12-29 08:00:00',
        to: '2024-12-30 12:00:00',
        title: 'Compliance Review',
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
      },
      {
        id: 'event125',
        from: '2024-12-04 08:00:00',
        to: '2024-12-05 12:00:00',
        title: 'Mobile App Testing',
        team_id: 'team7'
      },
      {
        id: 'event126',
        from: '2024-12-11 13:00:00',
        to: '2024-12-12 17:00:00',
        title: 'QA Workshop',
        team_id: 'team7'
      },
      {
        id: 'event127',
        from: '2024-12-19 08:00:00',
        to: '2024-12-20 12:00:00',
        title: 'Regression Testing',
        team_id: 'team7'
      },
      {
        id: 'event128',
        from: '2024-12-27 13:00:00',
        to: '2024-12-28 17:00:00',
        title: 'Automation Framework',
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
      },
      {
        id: 'event129',
        from: '2024-12-02 13:00:00',
        to: '2024-12-03 17:00:00',
        title: 'Customer Support',
        team_id: 'team8'
      },
      {
        id: 'event130',
        from: '2024-12-09 08:00:00',
        to: '2024-12-10 12:00:00',
        title: 'User Feedback',
        team_id: 'team8'
      },
      {
        id: 'event131',
        from: '2024-12-22 13:00:00',
        to: '2024-12-23 17:00:00',
        title: 'Help Desk Training',
        team_id: 'team8'
      },
      {
        id: 'event132',
        from: '2024-12-29 08:00:00',
        to: '2024-12-30 12:00:00',
        title: 'CRM Update',
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
      },
      {
        id: 'event133',
        from: '2024-12-05 08:00:00',
        to: '2024-12-06 12:00:00',
        title: 'Marketing Campaign',
        team_id: 'team9'
      },
      {
        id: 'event134',
        from: '2024-12-11 13:00:00',
        to: '2024-12-12 17:00:00',
        title: 'Social Media Strategy',
        team_id: 'team9'
      },
      {
        id: 'event135',
        from: '2024-12-16 08:00:00',
        to: '2024-12-17 12:00:00',
        title: 'Content Creation',
        team_id: 'team9'
      },
      {
        id: 'event136',
        from: '2024-12-26 13:00:00',
        to: '2024-12-27 17:00:00',
        title: 'SEO Workshop',
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
      },
      {
        id: 'event137',
        from: '2024-12-03 13:00:00',
        to: '2024-12-04 17:00:00',
        title: 'Financial Review',
        team_id: 'team10'
      },
      {
        id: 'event138',
        from: '2024-12-10 08:00:00',
        to: '2024-12-11 12:00:00',
        title: 'Budget Planning',
        team_id: 'team10'
      },
      {
        id: 'event139',
        from: '2024-12-17 13:00:00',
        to: '2024-12-18 17:00:00',
        title: 'Audit Preparation',
        team_id: 'team10'
      },
      {
        id: 'event140',
        from: '2024-12-28 08:00:00',
        to: '2024-12-29 12:00:00',
        title: 'Year-End Closing',
        team_id: 'team10'
      }
    ]
  },
  {
    id: 'team11',
    name: 'Team K',
    events: [
      {
        id: 'event141',
        from: '2024-12-01 08:00:00',
        to: '2024-12-02 12:00:00',
        title: 'Resource Planning',
        team_id: 'team11'
      },
      {
        id: 'event142',
        from: '2024-12-07 13:00:00',
        to: '2024-12-08 17:00:00',
        title: 'Talent Acquisition',
        team_id: 'team11'
      },
      {
        id: 'event143',
        from: '2024-12-14 08:00:00',
        to: '2024-12-15 12:00:00',
        title: 'Training Workshop',
        team_id: 'team11'
      },
      {
        id: 'event144',
        from: '2024-12-21 13:00:00',
        to: '2024-12-22 17:00:00',
        title: 'Performance Review',
        team_id: 'team11'
      }
    ]
  },
  {
    id: 'team12',
    name: 'Team L',
    events: [
      {
        id: 'event145',
        from: '2024-12-02 08:00:00',
        to: '2024-12-03 12:00:00',
        title: 'Legal Compliance',
        team_id: 'team12'
      },
      {
        id: 'event146',
        from: '2024-12-09 13:00:00',
        to: '2024-12-10 17:00:00',
        title: 'Contract Review',
        team_id: 'team12'
      },
      {
        id: 'event147',
        from: '2024-12-16 08:00:00',
        to: '2024-12-17 12:00:00',
        title: 'IP Protection',
        team_id: 'team12'
      },
      {
        id: 'event148',
        from: '2024-12-23 13:00:00',
        to: '2024-12-24 17:00:00',
        title: 'Legal Workshop',
        team_id: 'team12'
      }
    ]
  },
  {
    id: 'team13',
    name: 'Team M',
    events: [
      {
        id: 'event149',
        from: '2024-12-04 08:00:00',
        to: '2024-12-05 12:00:00',
        title: 'Product Roadmap',
        team_id: 'team13'
      },
      {
        id: 'event150',
        from: '2024-12-11 13:00:00',
        to: '2024-12-12 17:00:00',
        title: 'Feature Planning',
        team_id: 'team13'
      },
      {
        id: 'event151',
        from: '2024-12-18 08:00:00',
        to: '2024-12-19 12:00:00',
        title: 'Market Research',
        team_id: 'team13'
      },
      {
        id: 'event152',
        from: '2024-12-25 13:00:00',
        to: '2024-12-26 17:00:00',
        title: 'Competitive Analysis',
        team_id: 'team13'
      }
    ]
  },
  {
    id: 'team14',
    name: 'Team N',
    events: [
      {
        id: 'event153',
        from: '2024-12-01 13:00:00',
        to: '2024-12-02 17:00:00',
        title: 'Infrastructure Planning',
        team_id: 'team14'
      },
      {
        id: 'event154',
        from: '2024-12-08 08:00:00',
        to: '2024-12-09 12:00:00',
        title: 'Network Upgrade',
        team_id: 'team14'
      },
      {
        id: 'event155',
        from: '2024-12-15 13:00:00',
        to: '2024-12-16 17:00:00',
        title: 'Hardware Review',
        team_id: 'team14'
      },
      {
        id: 'event156',
        from: '2024-12-22 08:00:00',
        to: '2024-12-23 12:00:00',
        title: 'Data Center Visit',
        team_id: 'team14'
      }
    ]
  },
  {
    id: 'team15',
    name: 'Team O',
    events: [
      {
        id: 'event157',
        from: '2024-12-03 08:00:00',
        to: '2024-12-04 12:00:00',
        title: 'API Development',
        team_id: 'team15'
      },
      {
        id: 'event158',
        from: '2024-12-10 13:00:00',
        to: '2024-12-11 17:00:00',
        title: 'Microservices Design',
        team_id: 'team15'
      },
      {
        id: 'event159',
        from: '2024-12-17 08:00:00',
        to: '2024-12-18 12:00:00',
        title: 'Backend Review',
        team_id: 'team15'
      },
      {
        id: 'event160',
        from: '2024-12-24 13:00:00',
        to: '2024-12-25 17:00:00',
        title: 'Database Optimization',
        team_id: 'team15'
      }
    ]
  },
  {
    id: 'team16',
    name: 'Team P',
    events: [
      {
        id: 'event161',
        from: '2024-12-05 08:00:00',
        to: '2024-12-06 12:00:00',
        title: 'Frontend Development',
        team_id: 'team16'
      },
      {
        id: 'event162',
        from: '2024-12-12 13:00:00',
        to: '2024-12-13 17:00:00',
        title: 'Responsive Design',
        team_id: 'team16'
      },
      {
        id: 'event163',
        from: '2024-12-19 08:00:00',
        to: '2024-12-20 12:00:00',
        title: 'UI Framework Update',
        team_id: 'team16'
      },
      {
        id: 'event164',
        from: '2024-12-26 13:00:00',
        to: '2024-12-27 17:00:00',
        title: 'Performance Optimization',
        team_id: 'team16'
      }
    ]
  },
  {
    id: 'team17',
    name: 'Team Q',
    events: [
      {
        id: 'event165',
        from: '2024-12-01 08:00:00',
        to: '2024-12-02 12:00:00',
        title: 'International Expansion',
        team_id: 'team17'
      },
      {
        id: 'event166',
        from: '2024-12-08 13:00:00',
        to: '2024-12-09 17:00:00',
        title: 'Market Entry Strategy',
        team_id: 'team17'
      },
      {
        id: 'event167',
        from: '2024-12-15 08:00:00',
        to: '2024-12-16 12:00:00',
        title: 'Global Partnerships',
        team_id: 'team17'
      },
      {
        id: 'event168',
        from: '2024-12-22 13:00:00',
        to: '2024-12-23 17:00:00',
        title: 'Localization Planning',
        team_id: 'team17'
      }
    ]
  },
  {
    id: 'team18',
    name: 'Team R',
    events: [
      {
        id: 'event169',
        from: '2024-12-03 13:00:00',
        to: '2024-12-04 17:00:00',
        title: 'Customer Experience',
        team_id: 'team18'
      },
      {
        id: 'event170',
        from: '2024-12-10 08:00:00',
        to: '2024-12-11 12:00:00',
        title: 'Journey Mapping',
        team_id: 'team18'
      },
      {
        id: 'event171',
        from: '2024-12-17 13:00:00',
        to: '2024-12-18 17:00:00',
        title: 'Service Design',
        team_id: 'team18'
      },
      {
        id: 'event172',
        from: '2024-12-24 08:00:00',
        to: '2024-12-25 12:00:00',
        title: 'CX Strategy',
        team_id: 'team18'
      }
    ]
  },
  {
    id: 'team19',
    name: 'Team S',
    events: [
      {
        id: 'event173',
        from: '2024-12-05 13:00:00',
        to: '2024-12-06 17:00:00',
        title: 'Innovation Workshop',
        team_id: 'team19'
      },
      {
        id: 'event174',
        from: '2024-12-12 08:00:00',
        to: '2024-12-13 12:00:00',
        title: 'R&D Planning',
        team_id: 'team19'
      },
      {
        id: 'event175',
        from: '2024-12-19 13:00:00',
        to: '2024-12-20 17:00:00',
        title: 'Prototype Review',
        team_id: 'team19'
      },
      {
        id: 'event176',
        from: '2024-12-26 08:00:00',
        to: '2024-12-27 12:00:00',
        title: 'Technology Trends',
        team_id: 'team19'
      }
    ]
  },
  {
    id: 'team20',
    name: 'Team T',
    events: [
      {
        id: 'event177',
        from: '2024-12-02 13:00:00',
        to: '2024-12-03 17:00:00',
        title: 'Risk Assessment',
        team_id: 'team20'
      },
      {
        id: 'event178',
        from: '2024-12-09 08:00:00',
        to: '2024-12-10 12:00:00',
        title: 'Continuity Planning',
        team_id: 'team20'
      },
      {
        id: 'event179',
        from: '2024-12-16 13:00:00',
        to: '2024-12-17 17:00:00',
        title: 'Crisis Management',
        team_id: 'team20'
      },
      {
        id: 'event180',
        from: '2024-12-23 08:00:00',
        to: '2024-12-24 12:00:00',
        title: 'Mitigation Strategies',
        team_id: 'team20'
      }
    ]
  },
  {
    id: 'team21',
    name: 'Team U',
    events: [
      {
        id: 'event181',
        from: '2024-12-02 08:00:00',
        to: '2024-12-03 12:00:00',
        title: 'Sustainability Initiative',
        team_id: 'team21'
      },
      {
        id: 'event182',
        from: '2024-12-10 13:00:00',
        to: '2024-12-11 17:00:00',
        title: 'Green Energy Planning',
        team_id: 'team21'
      },
      {
        id: 'event183',
        from: '2024-12-18 08:00:00',
        to: '2024-12-19 12:00:00',
        title: 'Carbon Footprint Analysis',
        team_id: 'team21'
      },
      {
        id: 'event184',
        from: '2024-12-26 13:00:00',
        to: '2024-12-27 17:00:00',
        title: 'ESG Reporting',
        team_id: 'team21'
      }
    ]
  },
  {
    id: 'team22',
    name: 'Team V',
    events: [
      {
        id: 'event185',
        from: '2024-12-04 08:00:00',
        to: '2024-12-05 12:00:00',
        title: 'Supply Chain Optimization',
        team_id: 'team22'
      },
      {
        id: 'event186',
        from: '2024-12-12 13:00:00',
        to: '2024-12-13 17:00:00',
        title: 'Logistics Planning',
        team_id: 'team22'
      },
      {
        id: 'event187',
        from: '2024-12-20 08:00:00',
        to: '2024-12-21 12:00:00',
        title: 'Vendor Management',
        team_id: 'team22'
      },
      {
        id: 'event188',
        from: '2024-12-28 13:00:00',
        to: '2024-12-29 17:00:00',
        title: 'Inventory Control',
        team_id: 'team22'
      }
    ]
  },
  {
    id: 'team23',
    name: 'Team W',
    events: [
      {
        id: 'event189',
        from: '2024-12-01 13:00:00',
        to: '2024-12-02 17:00:00',
        title: 'Digital Transformation',
        team_id: 'team23'
      },
      {
        id: 'event190',
        from: '2024-12-09 08:00:00',
        to: '2024-12-10 12:00:00',
        title: 'Technology Roadmap',
        team_id: 'team23'
      },
      {
        id: 'event191',
        from: '2024-12-17 13:00:00',
        to: '2024-12-18 17:00:00',
        title: 'Change Management',
        team_id: 'team23'
      },
      {
        id: 'event192',
        from: '2024-12-25 08:00:00',
        to: '2024-12-26 12:00:00',
        title: 'Process Reengineering',
        team_id: 'team23'
      }
    ]
  },
  {
    id: 'team24',
    name: 'Team X',
    events: [
      {
        id: 'event193',
        from: '2024-12-03 08:00:00',
        to: '2024-12-04 12:00:00',
        title: 'Strategic Partnership',
        team_id: 'team24'
      },
      {
        id: 'event194',
        from: '2024-12-11 13:00:00',
        to: '2024-12-12 17:00:00',
        title: 'Alliance Management',
        team_id: 'team24'
      },
      {
        id: 'event195',
        from: '2024-12-19 08:00:00',
        to: '2024-12-20 12:00:00',
        title: 'Joint Venture Planning',
        team_id: 'team24'
      },
      {
        id: 'event196',
        from: '2024-12-27 13:00:00',
        to: '2024-12-28 17:00:00',
        title: 'Collaboration Framework',
        team_id: 'team24'
      }
    ]
  },
  {
    id: 'team25',
    name: 'Team Y',
    events: [
      {
        id: 'event197',
        from: '2024-12-05 08:00:00',
        to: '2024-12-06 12:00:00',
        title: 'Research Collaboration',
        team_id: 'team25'
      },
      {
        id: 'event198',
        from: '2024-12-13 13:00:00',
        to: '2024-12-14 17:00:00',
        title: 'Academic Partnership',
        team_id: 'team25'
      },
      {
        id: 'event199',
        from: '2024-12-21 08:00:00',
        to: '2024-12-22 12:00:00',
        title: 'Publication Review',
        team_id: 'team25'
      },
      {
        id: 'event200',
        from: '2024-12-29 13:00:00',
        to: '2024-12-30 17:00:00',
        title: 'Scientific Symposium',
        team_id: 'team25'
      }
    ]
  }
]

// Generate events for a specific team with date range in December 2024
const generateEventsForTeam = (
  teamId: string,
  startIndex: number,
  count: number
) => {
  const events: MachineEvent[] = []
  const eventTitles = [
    'Project Planning',
    'Team Meeting',
    'Status Update',
    'Client Presentation',
    'Technical Review',
    'Sprint Planning',
    'Retrospective',
    'Brainstorming Session',
    'Design Review',
    'Code Review',
    'Deployment Planning',
    'Testing Session',
    'Demo Preparation',
    'Knowledge Sharing',
    'Stakeholder Meeting',
    'Product Demo',
    'Architecture Discussion',
    'Learning Session',
    'Resource Planning',
    'Strategy Discussion',
    'Performance Review',
    'Quality Assurance',
    'Documentation',
    'Budget Planning',
    'Risk Assessment',
    'Innovation Workshop',
    'Team Building',
    'Usability Testing'
  ]

  for (let i = 0; i < count; i++) {
    const day = Math.floor(Math.random() * 31) + 1
    const startHour = Math.floor(Math.random() * 10) + 8 // 8 AM to 6 PM

    // Duration between 1 to 3 days
    const durationDays = Math.floor(Math.random() * 3) + 1
    const durationHours = Math.floor(Math.random() * 5) + 1 // 1 to 5 hours

    const startDate = new Date(2024, 11, day, startHour, 0, 0)
    const endDate = new Date(
      2024,
      11,
      day + durationDays,
      startHour + durationHours,
      0,
      0
    )

    // Format dates to string: YYYY-MM-DD HH:MM:SS
    const formatDate = (date: Date) => {
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`
    }

    const titleIndex = Math.floor(Math.random() * eventTitles.length)

    events.push({
      id: `event${startIndex + i}`,
      from: formatDate(startDate),
      to: formatDate(endDate),
      title: eventTitles[titleIndex],
      team_id: teamId
    })
  }

  return events
}

// Generate additional teams with events
export const additionalTeams: Team[] = (() => {
  const newTeams: Team[] = []
  let eventIndex = 201 // Continue from the last event ID

  for (let i = 26; i <= 75; i++) {
    const teamId = `team${i}`
    const teamName = `Team ${String.fromCharCode(64 + (i % 26 || 26))}${Math.floor(i / 26)}`
    const eventCount = Math.floor(Math.random() * 11) + 10 // 10 to 20 events per team

    newTeams.push({
      id: teamId,
      name: teamName,
      events: generateEventsForTeam(teamId, eventIndex, eventCount)
    })

    eventIndex += eventCount
  }

  return newTeams
})()

// Combine original teams with additional teams
export const allTeams: Team[] = additionalTeams
