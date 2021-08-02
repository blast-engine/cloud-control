const { execSync } = require('child_process')

const { getCurrentContext } = require('@blast-engine/context')
const { activateServiceAccount } = require('./gcloud.fn')

async function replaceProcessWithCloudSSH({ zone, name }) {

  await activateServiceAccount()

  const context = await getCurrentContext({
    directory: __dirname,
    errorOutIfNone: true
  })

  execSync(
    `gcloud compute ssh `
   + `--project ${context.projectName} `
   + `--zone ${zone} ` 
   + name,
   { stdio: 'inherit' }
  )

}

module.exports = { replaceProcessWithCloudSSH }