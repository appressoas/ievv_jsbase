module.exports = {
  verbose: false,
  roots: ['<rootDir>/lib/'],
  testPathIgnorePatterns: [
    "/node_modules/"
  ],
  transform: {
    "\\.jsx?$": "babel-jest",
  },
  transformIgnorePatterns: ['/node_modules/(?!(sinon)/)'],
  // transformIgnorePatterns: ['/node_modules/(?!(sinon|module1|module2)/)'],
  testEnvironment: 'jsdom'
}
