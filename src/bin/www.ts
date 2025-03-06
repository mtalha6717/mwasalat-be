/* eslint-disable */
import * as dotenv from 'dotenv'
require('module-alias/register')
const moduleAlias = require('module-alias')

moduleAlias.addAliases({
  '@entities': `${__dirname}/../database/entities/index`,
  '@database': `${__dirname}/../database/index`,
  '@controllers': `${__dirname}/../apis/controllers/index`,
  '@services': `${__dirname}/../apis/services/index`,
  '@validations': `${__dirname}/../apis/validations/index`,
  '@routes': `${__dirname}/../apis/routes/index`,
  '@types': `${__dirname}/../types/index`,
  '@utils': `${__dirname}/../utils/index`,
  '@middleware': `${__dirname}/../middleware/index`,
  '@config': `${__dirname}/../config/index`,
  '@helpers': `${__dirname}/../helpers/index`,
  '@repositories': `${__dirname}/../database/repositories`
})

dotenv.config()
const port = 4000

import { bootstrap } from '../server'

bootstrap()
  .then(({ app }) => {
    app.listen(port)
    console.log(`Server started on http://localhost:4000`)
  })
  .catch((err) => {
    console.log(err)
  })
