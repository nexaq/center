const PURPOSE_REGEX = /^[A-Za-zа-яА-Я0-9Ёё\s\-_.\/\\:()"',?+*<>№]*$/;

export const PURPOSE_RULES = [
  {
    required: true,
    message: 'Обязательное поле',
  },
  {
    min: 10,
    message: 'Минимум 10 символов',
  },
  {
    pattern: PURPOSE_REGEX,
    message: 'Используются запрещенные символы',
  }
];