import { rollupPluginSocialIcons as socialIcons } from './src/generate';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';

export default (async function config(){
  // TODO do I need the globals option? e.g. globals: { react: 'React' }

  const plugins = [
    socialIcons(),
    resolve(),
    babel({
      babelHelpers: 'runtime',
    }),
  ];

  const external = id => {
    if (id === 'react') return true;
    if (id === 'react-dom') return true;
    if (/@babel\/runtime/.test(id)) return true;
    if (id == '../db') return true;
    return false;
  }

  const output = [
    {
      format: 'es',
      preserveModules: true,
      dir: './dist',
    },
  ]

  return [
    {
      input: './src/react-social-icons.js',
      plugins,
      external,
      output,
    },
    {
      input: './src/component.jsx',
      plugins,
      external,
      output,
    },
    {
      input: './src/db.js',
      plugins,
      external,
      output,
    },
  ];

  // return [
  //   './src/react-social-icons.js',
  //   './src/component.jsx',
  // ].map(input => {
  //   return {
  //     input,
  //     plugins: ,
  //     output: [
  //       {
  //         format: 'es',
  //         preserveModules: true,
  //         dir: './dist',
  //       },
  //       {
  //         file: input.replace('./src', './dist').replace('.js', '.umd.js'),
  //         format: 'umd',
  //         name: 'SocialIcon',
  //       },
  //     ],
  //     external: ,
  //   }
  // });

  // return [
  //   {
  //     input: './src/react-social-icons.js',
  //     plugins: [
  //       resolve(),
  //       babel({ 
  //         babelHelpers: 'runtime',
  //       }),
  //       socialIcons(),
  //     ],
  //     output: [
  //       {
  //         file: './dist/react-social-icons.es.js',
  //         format: 'es',
  //       },
  //     ],
  //     external: id => {
  //       if (id === 'react') return true;
  //       if (id === 'react-dom') return true;
  //       if (/@babel\/runtime/.test(id)) return true;
  //       return false;
  //     },
  //   },
  //   {
  //     input: './src/component.jsx',
  //     plugins: [
  //       resolve(),
  //       babel({
  //         babelHelpers: 'runtime'
  //       }),
  //       socialIcons()
  //   ],
  //     output: [
  //       {
  //         file: './dist/component.es.js',
  //         format: 'es',
  //       },
  //     ],
  //     external: id => {
  //       if (id === 'react') return true;
  //       if (id === 'react-dom') return true;
  //       if (/@babel\/runtime/.test(id)) return true;
  //       return false;
  //     },
  //   },
  //   // ... all icons
  // ];
})();
