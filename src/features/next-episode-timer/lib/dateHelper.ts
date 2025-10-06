export type InputDate = Date | string | number | null | undefined;

export interface FormattedDateRu {
  weekday: string;
  date: string;
}

const WEEKDAYS_RU: string[] = [
  'в воскресенье',
  'в понедельник',
  'во вторник',
  'в среду',
  'в четверг',
  'в пятницу',
  'в субботу',
];

const pad2 = (n: number): string => (n < 10 ? '0' : '') + n;

const toValidDate = (d: InputDate): Date | null => {
  if (d == null) return null;
  if (d instanceof Date) return isNaN(d.getTime()) ? null : d;

  const parsed = new Date(d);

  return isNaN(parsed.getTime()) ? null : parsed;
};

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

export const dateHelper = (input: InputDate): FormattedDateRu | null => {
  const d = toValidDate(input);
  if (!d) return null;

  const now = new Date();

  let weekday: string;

  if (isSameDay(d, now)) {
    weekday = 'сегодня';
  } else {
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);

    if (isSameDay(d, tomorrow)) {
      weekday = 'завтра';
    } else {
      weekday = WEEKDAYS_RU[d.getDay()];
    }
  }

  const dd = pad2(d.getDate());
  const mm = pad2(d.getMonth() + 1);

  return {
    weekday,
    date: `${dd}.${mm}`,
  };
};
