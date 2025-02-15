import { StoreValue } from 'antd/es/form/interface';

export const formatInteger = (value: StoreValue, prev: StoreValue): string => {
  const onlyNumbers = String(value ?? prev).replace(/\D/g, '');
  return onlyNumbers ? Math.round(Number(onlyNumbers)).toString() : '0';
};

export const allowOnlyNumbers = (event: React.KeyboardEvent<HTMLInputElement>): void => {
  const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab'];
  if (!/^\d$/.test(event.key) && !allowedKeys.includes(event.key)) {
    event.preventDefault();
  }
};
