const {type, join} = require('ramda');
const getVdrNames = require('./getVdrNames');
const exportVdrs = require('./exportVdrs');
const applyQuotes = require('../../../util/quoteString');


module.exports = async (vdrName, jobId, processId) => {
    let param = '';
    let vdrNames = [];
    if (type(vdrName) === 'String') {
        vdrNames = vdrName.split(',');
        param = { where: 'objectName in (' + applyQuotes(join(', ', vdrNames)) + ')' };
    } else if (Array.isArray(vdrName)) {
        vdrNames = vdrName.map((vdr) => vdr.name);
        param = { where: 'objectName in (' + applyQuotes(join(', ', vdrNames)) + ')' };
    }
    vdrNames = await getVdrNames(param);
    const exportData = await exportVdrs(vdrNames, vdrName, jobId, processId);
    return exportData;
};