export const fieldsData = [
  {
    group: [
      {
        mb: true,
        title: 'Имя пользователя',
        subtitle: 'Название вашего аккаунта',
        field: {
          key: 'nickname',
          type: 'text',
          placeholder: 'Введите название',
        },
      },
      {
        title: 'Электронная почта',
        subtitle: 'Для регистрации и входа в аккаунт',
        field: {
          key: 'email',
          type: 'text',
          placeholder: 'Введите Email',
          disabled: true,
        },
      },
    ],
  },
  {
    group: [
      {
        title: 'Смена пароля',
        subtitle: 'Установка нового пароля',
        field: [
          {
            icon: 'password',
            key: 'current_password',
            type: 'text',
            native_type: 'password',
            placeholder: 'Введите старый пароль',
          },
          {
            icon: 'password',
            key: 'new_password',
            type: 'text',
            native_type: 'password',
            placeholder: 'Введите новый пароль',
          },
          {
            icon: 'password',
            key: 'new_password_confirmation',
            type: 'text',
            native_type: 'password',
            placeholder: 'Повторите пароль',
          },
        ],
      },
    ],
  },
  // {
  //   title: 'Оформление',
  //   subtitle: 'Кастомизация вашего профиля',
  //   field: {
  //     key: 'avatar',
  //     type: 'custom',
  //   },
  //   group: [
  //   ],
  // },
];
