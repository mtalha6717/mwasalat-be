import { exec } from 'child_process'

exec(
  `yarn typeorm migration:generate -d ./src/database/index.ts ./src/database/migrations/${process.argv[2]}`,
  (error, stdout, stderr) => {
    if (error) {
      console.error(`Execution error: ${error.message}`)
      return
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`)
      return
    }
    console.log(`stdout: ${stdout}`)
  }
)
