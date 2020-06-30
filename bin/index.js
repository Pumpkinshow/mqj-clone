#!/usr/bin/env node
const program = require('commander');
const download = require("download-git-repo");
const ora = require('ora');
const chalk = require('chalk');

program
    .version('1.0.5', '-v, --version')
    .usage('<origin> [dist]');


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
    if (program.args.length < 1) {
        return program.help()
    } else {
        chalk.yellow('Create start')
        const spinner = ora(chalk.yellow('Create start')).start();
        const dist = program.args[1] ? program.args[1] : './';
        spinner.color = 'blue';
        spinner.text = 'Loading package from ' + program.args[0] + ' to ' + dist;
        download(program.args[0], dist, function (err) {
            if (err) {
                console.log(err);
                spinner.color = 'red';
                spinner.text = chalk.red('fail');
                spinner.fail();
            } else {
                spinner.color = 'green';
                spinner.text = chalk.green('success');
                spinner.succeed();
            }
            spinner.stop();
            spinner.clear();
        })
    }
}
help()

