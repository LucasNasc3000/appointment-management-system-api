export function GetDateObject(stringDate: string) {
  const localDateReplace = stringDate.replaceAll('/', '-');
  const year = localDateReplace.slice(6, 11);
  const month = localDateReplace.slice(3, 5);
  const day = localDateReplace.slice(0, 2);

  const localDateForeignFormat = `${year}-${month}-${day}`;

  const date = new Date(localDateForeignFormat);
  date.setHours(0, 0, 0, 0);

  return date;
}
