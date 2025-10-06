export interface IToastItem {
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  text: string;
  id?: string;
  timeout?: number;
}
