/** @type {import('next').NextConfig} */
const path = require('path')
const { i18n } = require('./next-i18next.config')
module.exports = {
  reactStrictMode: true,
  i18n,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}
