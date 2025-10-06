export const sections: Section[] = [
  { id: crypto.randomUUID(), type: 'genres', cols: '2', title: 'Жанр', isBtn: true },
  { id: crypto.randomUUID(), type: 'years', cols: '3', title: 'Год', isBtn: true },
  { id: crypto.randomUUID(), type: 'statuses', cols: '1', title: 'Статус', isBtn: false },
];

type Section = {
  id: ReturnType<typeof crypto.randomUUID>;
  type: 'genres' | 'years' | 'statuses';
  cols: string;
  title: string;
  isBtn: boolean;
};
