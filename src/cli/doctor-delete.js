'use strict';

const commander = require('commander');
const functions = {
    commonResources: require('../core/removeCommonResources'),
    transformations: require('../core/removeFormulas'),
    formulaInstances: require('../core/removeFormulaInstances'),
    instances: require('../core/removeInstances'),
    elements: require('../core/removeElements'),
    formulas: require('../core/saveFormulas')
}

const remove = (object, environment, options) => {
    if (!functions[object]) {
        console.log('Command not found: %o', object);
        process.exit(1);
    }
    try {
        functions[object](environment, options);
    } catch (err) {
        console.log("Failed to complete operation: ", err);
    }
};

commander
  .command('object [environment]', 'object')
  .action((object, environment, options) => remove(object, environment, options))
  .on('--help', () => {
    console.log('  Examples:');
    console.log('');
    console.log('    $ doctor delete objectDefinitions staging');
    console.log('    $ doctor delete formulas production');
    console.log('    $ doctor delete transformations production');
    console.log('    $ doctor delete formulaInstances productionw');
    console.log('');
  })
  .parse(process.argv);