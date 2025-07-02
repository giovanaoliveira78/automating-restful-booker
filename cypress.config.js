const { defineConfig } = require("cypress")

require('dotenv/config')

module.exports = defineConfig({
  video: false,
  screenshotOnRunFailure: false,
  e2e: {
    baseUrl: process.env.BASE_URL
  },
})