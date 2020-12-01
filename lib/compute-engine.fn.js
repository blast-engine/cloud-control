const kexec = require('kexec')

const { getCurrentContext } = require('@blast-engine/context')
const { activateServiceAccount } = require('./gcloud.fn')

async function replaceProcessWithCloudSSH({ zone, name }) {

  await activateServiceAccount()

  const context = await getCurrentContext({
    directory: __dirname,
    errorOutIfNone: true
  })

  kexec('gcloud', [
    'compute',
    'ssh',
    '--project',
    context.projectName,
    '--zone',
    zone,
    name
  ])

}

module.exports = { replaceProcessWithCloudSSH }