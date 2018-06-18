module.exports = (ctx) => {
  const DEBUG = ctx.env !== 'production';

  return {
    plugins: {
      'postcss-import': {},
      'postcss-cssnext': {
        browsers: ['> 1%', 'last 2 versions'],
      },
      cssnano: !DEBUG,
    },
  };
};
