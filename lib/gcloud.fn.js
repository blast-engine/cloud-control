const { execSync, spawn } = require('child_process')
const { getCurrentContext } = require('@blast-engine/context')
const { findFileRecursivelyUp } = require('@blast-engine/find-recursively-up')

const activateServiceAccount = async (quiet = true) => {
  
  // @todo: context should add in extras with "onSelect"
  const serviceKeyFilePath = await findFileRecursivelyUp('current-service-key', __dirname)

  return new Promise(async (resolve, reject) => {

    const gcloud = spawn(
      'gcloud', [
        'auth',
        'activate-service-account',
        '--key-file',
        serviceKeyFilePath
      ]
    )

    gcloud.on('close', code => resolve())

    const handleData = data => {
      if (!quiet) console.log(data.toString())
    }

    gcloud.stderr.on('data', handleData)
    gcloud.stdout.on('data', handleData)

  })

}

module.exports = { activateServiceAccount }