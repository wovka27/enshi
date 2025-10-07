import { computed } from 'vue';
import { useUserStore } from '@entities/user/model';

export const useUserStats = () => {
  const userStore = useUserStore();

  const data = computed(() => {
    if (!userStore.stats) return [];

    const { coun_favorites, coun_estimations, coun_comments } = userStore.stats;

    return [
      {
        title: 'Статистика',
        isLine: true,
        textData: [{ value: coun_favorites, label: 'В избранном' }],
      },
      {
        title: 'Всего',
        textData: [
          { value: coun_estimations, label: 'Оценок' },
          { value: coun_comments, label: 'Комментариев' },
        ],
      },
    ];
  });

  return { data };
};
