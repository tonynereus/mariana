const path = require('path');

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  },
  reactStrictMode: false,
  images: {
    domains: ['mariana.elonmuskreeve.com','admin.emarketpod.com','localhost'],
    unoptimized:true
  },
  output: 'export'
};
