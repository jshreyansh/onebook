export const userData = {
  '8770026706': {
    name: 'John Doe',
    number: '8770026706',
    flashCards: {
      active: [
        {
          id: '1',
          title: 'React Native Basics',
          content: 'Components are the building blocks of React Native apps. They can be functional or class-based. Props are used for data passing.',
          image: 'https://picsum.photos/400/300',
          createdAt: '2024-03-10',
          status: 'active'
        },
        {
          id: '2',
          title: 'JavaScript ES6',
          content: 'Arrow functions provide a shorter syntax. Let and const are block-scoped. Template literals use backticks.',
          image: 'https://picsum.photos/400/301',
          createdAt: '2024-03-11',
          status: 'active'
        }
      ],
      completed: [
        {
          id: '3',
          title: 'Git Commands',
          content: 'git add stages changes. git commit saves changes. git push uploads to remote.',
          createdAt: '2024-03-09',
          status: 'completed'
        }
      ],
      archived: [
        {
          id: '4',
          title: 'Old Notes',
          content: 'These are old study notes from previous topics.',
          createdAt: '2024-03-08',
          status: 'archived'
        }
      ]
    }
  },
  '9929995821': {
    name: 'Jane Smith',
    number: '9929995821',
    flashCards: {
      active: [
        {
          id: '5',
          title: 'Python Basics',
          content: 'Python is dynamically typed. Indentation matters. Lists are mutable.',
          createdAt: '2024-03-10',
          status: 'active'
        }
      ],
      completed: [
        {
          id: '6',
          title: 'SQL Queries',
          content: 'SELECT retrieves data. WHERE filters results. JOIN combines tables.',
          createdAt: '2024-03-09',
          status: 'completed'
        }
      ],
      archived: [
        {
          id: '7',
          title: 'Database Design',
          content: 'Normalization reduces redundancy. Primary keys uniquely identify records.',
          createdAt: '2024-03-08',
          status: 'archived'
        }
      ]
    }
  }
}; 