import { StoreValue } from 'antd/es/form/interface';

export const formatInteger = (value: StoreValue, prev: StoreValue) => {
  return Math.round(
    Number((value ?? prev)?.toString()?.replaceAll?.(',', '.') ?? '0'),
  ).toString();
};
