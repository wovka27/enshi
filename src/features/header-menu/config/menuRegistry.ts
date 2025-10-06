const unauthenticated = [
  { path: '/catalog', label: 'Каталог' },
  { path: '/login', label: 'Войти' },
];

const authenticated = [
  { path: '/catalog', label: 'Каталог' },
  { path: '/user/settings', label: 'Настройки' },
];

export const menuRegistry = {
  unauthenticated,
  authenticated,
};
