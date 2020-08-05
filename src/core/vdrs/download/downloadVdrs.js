'use strict';

const { forEachObjIndexed, type, pipeP, __ } = require('ramda')
const applyVersion = require('../../../util/applyVersion')
const saveToFile = require('../../../util/saveToFile')
const saveToDir = require('./saveVdrsToDir')
const saveTo = require('../../saveTo')
const getVdrNames = require('./getVdrNames')
const exportVdrs = require('./exportVdrs')

const getData = async (vdrName, service) => {
  let vdrNames = [];
  if (type(vdrName) === 'String') {
    vdrNames = vdrName.split(',');
  } else {
    vdrNames = await getVdrNames();
  }
  const exportData = await exportVdrs(vdrNames, service);
  return exportData;
}

const log = data => {
  forEachObjIndexed((object, key) => {
    console.log(`Saved VDR: ${key}`)
  })(data)
}

//(parms)
module.exports = params => {
  if (params.options.hasOwnProperty('version')) {
    params.options.name = params.options.name + '_' + params.options.version
  }
  return saveTo(pipeP(getData, applyVersion(__, params)), log, saveToFile, saveToDir)(params)
}
