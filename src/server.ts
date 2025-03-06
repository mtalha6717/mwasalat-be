import 'dotenv/config'
import * as express from 'express'
import * as multipart from 'connect-multiparty'
import * as morgan from 'morgan'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import Router from '@routes'
import * as path from 'path'

//  * Initializes and configures the Express application.//+
//  * Sets up middleware, initializes the database connection,//+
//  * and configures routes.//+
//  * @returns {Promise<{ app: express.Express }>} A promise that resolves to an object containing the configured Express application.//+

const bootstrap = async () => {
  const app = express()
  const multipartMiddleware = multipart()

  try {
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(morgan('tiny'))
    // app.set('trust proxy', true)
    app.use(multipartMiddleware)
    app.use(cors())
    const publicPath = path.resolve(__dirname, './public')
    app.use(express.static(publicPath))

    Router.initialize(app)
  } catch (error) {
    console.log('Unable to connect to db', error)
    process.exit(1)
  }
  return { app }
}

process.on('unhandledRejection', (err) => {
  console.log('Unhandled Rejection')
  console.log(err)
})

process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception ->')
  console.log(err)
})

export { bootstrap }
