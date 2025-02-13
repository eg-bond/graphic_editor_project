export const hexToRGBA = (hex: string) => {
  hex = hex.replace(/^#/, '');

  if (hex.length === 3) {
    // Формат #RGB → #RRGGBB
    hex = hex.split('').map((c: string) => c + c).join('');
  }

  if (hex.length === 6) {
    hex += 'FF';
  }

  const num = parseInt(hex, 16);
  return [
    (num >> 24) & 255,
    (num >> 16) & 255,
    (num >> 8) & 255,
    num & 255,
  ];
};
