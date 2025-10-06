export const setPageTitle = (title: string) => {
  const base = 'Enshi.';
  document.title = title ? `${base} | ${title}` : base;
};
