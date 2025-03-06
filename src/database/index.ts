import { DataSource } from 'typeorm'
const { SnakeNamingStrategy } = require('typeorm-naming-strategies')

require('dotenv').config()

/*
 * Initializes a new DataSource instance for connecting to a MySQL database.//+
 * @type {string} type - The type of database, in this case, 'mysql'.//+
 * @param {string} host - The database host, retrieved from environment variables.//+
 * @param {number} port - The port number for the database connection, converted from a string to a number.//+
 * @param {string} username - The username for authenticating with the database, retrieved from environment variables.//+
 * @param {string} password - The password for authenticating with the database, retrieved from environment variables. Defaults to an empty string if not provided.//+
 * @param {string} database - The name of the database to connect to, retrieved from environment variables.//+
 * @param {Array<string>} entities - An array of paths to the entity files, using TypeScript or JavaScript extensions.//+
 * @param {Array<string>} migrations - An array of paths to the migration files, using TypeScript or JavaScript extensions.//+
 * @param {object} namingStrategy - An instance of SnakeNamingStrategy for naming conventions in the database.//+
 * @param {boolean} logging - A flag indicating whether to enable logging. Set to false.//+
 * @param {boolean} ssl - A flag indicating whether to use SSL for the connection. Set to false.//+
 * //+
 * @returns {DataSource} A configured DataSource instance for database operations.//+
 */

const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME,
  entities: [`${__dirname}/entities/*{.ts,.js}`],
  migrations: [`${__dirname}/migrations/*{.ts,.js}`],
  namingStrategy: new SnakeNamingStrategy(),
  logging: false,
  ssl: false
})

/**
 * Initializes the data source and logs a success message.
 */
AppDataSource.initialize()
  .then(async () => {
    console.log('Data Source initialized successfully')
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err)
  })

export default AppDataSource
