export function validateLayerName(
  name: string,
  existingNames: string[]
): string | null {
  const trimmedName = name.trim();

  // Проверка длины имени
  if (trimmedName.length < 1 || trimmedName.length > 12) {
    return "Имя слоя должно быть от 1 до 12 символов";
  }

  if (
    existingNames.some(
      existingName => existingName.toLowerCase() === trimmedName.toLowerCase()
    )
  ) {
    return "Слой с таким именем уже существует";
  }

  // Проверка на недопустимые символы
  const invalidChars = /[^a-zA-Zа-яА-Я0-9 _-]/;
  if (invalidChars.test(trimmedName)) {
    return 'Имя слоя может содержать только буквы, цифры, пробелы, "_" или "-"';
  }

  // Проверка на только цифры
  if (/^\d+$/.test(trimmedName)) {
    return "Имя слоя не может состоять только из цифр";
  }

  return null;
}
