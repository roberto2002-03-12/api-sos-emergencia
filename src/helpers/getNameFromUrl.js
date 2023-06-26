const getName = (url) => {
  if (!url || url === 'empty') return 'empty';
  const link = url;
  const strs = link.split('/');
  const nombre = strs.at(3);
  return nombre;
};

module.exports = { getName };

/*
  This now is useless, using the new aws sdk s3 gives
  you the key, so you don't need this for getting names.
  But maybe in the future you could use it for something else.
*/
