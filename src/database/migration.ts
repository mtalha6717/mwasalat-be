import { exec } from 'child_process'
exec(`yarn typeorm migration:generate -d ./src/database/index.ts ./src/database/migrations/${process.argv[2]}`)
