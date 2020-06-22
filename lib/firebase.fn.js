const { execSync } = require('child_process')

const deploy = ({ whatToDeploy, projectId, adminToken }) => {
  if (
    whatToDeploy &&
    !['functions', 'database', 'storage', 'hosting'].includes(whatToDeploy)
  ) throw new Error(`invalid option passed for whatToDeploy, got "${whatToDeploy}"`)

  execSync(
    `yarn firebase`
   + ` deploy`
   + ( whatToDeploy ? ` --only ${whatToDeploy}` : '' )
   + ` --project ${projectId}` 
   + ` --token ${adminToken}` 
   + ` --force`,
   { stdio: 'inherit' }
  )
}

module.exports = { deploy }