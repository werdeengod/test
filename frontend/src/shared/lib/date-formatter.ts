export function getDateFromString(date: string) {
  return new Date(date).toLocaleDateString('ru-RU');
}
