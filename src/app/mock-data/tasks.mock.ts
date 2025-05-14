import { Task } from '../models/task.model';

export const MOCK_TASKS: Task[] = [
  {
    taskId: '1',
    name: 'Zrobić zakupy spożywcze',
    status: 'Completed',
    date: '2025-05-01',
    description: 'Muszę kupić mleko, mąkę i jajka.',
  },
  {
    taskId: '2',
    name: 'Opłacić rachunki',
    status: 'Pending',
    date: '2025-05-10',
    description: 'Tylko nie odkładaj tego na inny dzień!',
  },
  {
    taskId: '3',
    name: 'Urodziny mamy',
    status: 'Planned',
    date: '2025-05-15',
    description: 'Kupić kwiaty i tort.',
  },
  {
    taskId: '4',
    name: 'Zadzwonić do dentysty',
    status: 'Planned',
    date: '2025-05-12',
    description: 'Umówić się na kontrolę stomatologiczną.',
  },
  {
    taskId: '5',
    name: 'Posprzątać mieszkanie',
    status: 'Completed',
    date: '2025-05-08',
    description: 'Odkurzyć, umyć podłogi i uporządkować szafki.',
  },
  {
    taskId: '6',
    name: 'Przygotować prezentację',
    status: 'Pending',
    date: '2025-05-13',
    description: 'Slajdy do prezentacji na spotkanie zespołu.',
  },
];
