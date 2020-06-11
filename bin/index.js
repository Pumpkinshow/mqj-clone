#!/usr/bin/env node
const program = require('commander');
const download = require("download-git-repo");
// const exists = require('fs').existsSync;
// const path = require('path');
const chalk = require('chalk');



program
    .version('1.0.2', '-v, --version')
    .usage('<origin> [dist]')
    // .usage('<template-name> [project-name]')
    // .option('-o, --origin', 'use git clone')
    // .option('-d, --dist', 'use destination address')
    // .option('--offline', 'use cached template')

/**
* Help.
*/

program.on('--help', () => {
    console.log('  Examples: ')
    console.log()
    console.log(chalk.gray('    # mqj-clone [github/gitlab/Bitbucket]:[账户名]/[仓库名]'))
    console.log('    $ mqj-clone github:vuejs/vue-cli')
    console.log(chalk.gray('    # mqj-clone [github/gitlab/Bitbucket]:[账户名]/[仓库名] [存放地址]'))
    console.log('    $ mqj-clone github:vuejs/vue-cli ./dist')
    console.log()
});

function help () {
    program.parse(process.argv)
    // console.log(program)
    if (program.args.length < 1) {
        return program.help()
    } else {
        console.log('params: ' + JSON.stringify(program.args));
        const dist = program.args[1] ? program.args[1] : './';
        download(program.args[0], dist, function (err) {
            console.log(err ? chalk.red(err) : chalk.green('success'));
        })
    }
}
help()

