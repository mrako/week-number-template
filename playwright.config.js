const config = {
  testMatch: 'test/**/*.spec.js',
  use: {
    baseURL: 'http://127.0.0.1:1234',
  },
  webServer: {
    command: 'npm start',
    port: 1234,
    timeout: 120 * 1000,
  },
};

module.exports = config;
