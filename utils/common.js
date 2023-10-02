const Theme1 = {
  primary: '#181818',
  secondary: '#252525',
  accent: '#ffffff',
  success: '#1f955c',
  danger: '#e33c32',
};

const formatThousandSeparator = (value = 0) => {
  return (+value).toLocaleString('id-ID', { minimumFractionDigits: 2 });
};

export { Theme1, formatThousandSeparator };
