export const filterData = {
  years: ((y) =>
    Array.from({ length: y + 1 - 1998 }).map((_, i) => ({
      label: y - i,
      value: y - i,
    })))(new Date().getFullYear()),
  genres: [
    'Военное',
    'Комедия',
    'Драма',
    'Школа',
    'Гарем',
    'Спорт',
    'Сёнен',
    'Фэнтези',
    'Демоны',
    'Космос',
    'Вампиры',
    'Игры',
    'Гурман',
    'Меха',
    'Экшен',
  ].map((i) => ({ label: i, value: i })),
  statuses: [
    ['Завершено', 'released'],
    ['Онгоинг', 'ongoing'],
    ['Анонс', 'anons'],
  ].map(([label, value]) => ({ label, value })),
};
