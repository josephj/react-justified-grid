process.env.NODE_ENV = 'development';
process.env.NODE_PATH = 'src/';

module.exports = function(wallaby) {
  // Babel, jest-cli and some other modules are located under
  // react-scripts/node_modules, so need to let node.js know about it
  var path = require('path');
  process.env.NODE_PATH +=
    path.delimiter +
    path.join(__dirname, 'node_modules') +
    path.delimiter +
    path.join(__dirname, 'node_modules/react-scripts-ts/node_modules');
  require('module').Module._initPaths();

  return {
    files: [
      'tsconfig.json',
      'tsconfig.test.json',
      'src/**/*.+(ts|tsx|js|jsx|json|snap|css|less|sass|scss|jpg|jpeg|gif|png|svg)',
      'package.json',
      'src/setupTests.js',
      '!src/**/*.test.js',
      '!src/**/*.spec.js'
    ],
    tests: ['src/**/*.test.js', 'src/**/*.spec.js'],
    env: {
      type: 'node',
      runner: 'node'
    },
    compilers: {
      '**/*.js': wallaby.compilers.babel({
        babel: require('babel-core'),
        presets: ['react-app']
      }),
      '**/*.ts?(x)': wallaby.compilers.typeScript({
        module: 'commonjs'
      })
    },
    setup: wallaby => {
      const jestConfig = require('react-scripts-ts/scripts/utils/createJestConfig')(
        p => require.resolve('react-scripts-ts/' + p)
      );
      Object.keys(jestConfig.transform || {}).forEach(
        k => ~k.indexOf('^.+\\.(js|jsx') && void delete jestConfig.transform[k]
      );
      delete jestConfig.testEnvironment;
      jestConfig.setupTestFrameworkScriptFile = './src/setupTests.js';
      wallaby.testFramework.configure(jestConfig);
    },
    testFramework: 'jest',
    jest: {
      modulePaths: [path.join(__dirname, 'src/')]
    }
  };
};
