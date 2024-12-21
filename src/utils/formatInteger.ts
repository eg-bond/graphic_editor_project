export const formatInteger = (value: any, prev: any) => {
  return Math.round(+((value ?? prev)?.toString()?.replaceAll?.(',', '.') ?? '0')).toString();
}