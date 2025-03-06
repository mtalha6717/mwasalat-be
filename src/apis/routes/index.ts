import formRoutes from './form.routes'

import { config } from '@config'

const initialize = (app: any) => {
  app.use(`${config.app.baseUrl}/`, formRoutes)

  app.get('/', (req, res) => {
    return res.status(200).send(`app is working Date = ${new Date()}`)
  })
}

export default { initialize }
