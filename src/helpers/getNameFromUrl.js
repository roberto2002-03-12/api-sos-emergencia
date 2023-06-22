const getName = (url) => {
  if (!url || url === 'empty') return 'empty';
  const link = url;
  const strs = link.split('/');
  const nombre = strs.at(3);
  return nombre;
};

module.exports = { getName };
