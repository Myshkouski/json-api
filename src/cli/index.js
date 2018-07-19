const commander = require('commander')

const fetch = require('./fetch')

commander
  .command('fetch <type>')
  .option('-o, --options [path]', 'Load options from file')
  .option('-t, --types', 'Type modules')
  .action((type, ...args) => {
    console.log('fetch', type, args)
  })

commander.parse(process.argv)
