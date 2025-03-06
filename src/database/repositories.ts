import AppDataSource from '@database'
import { Form } from '@entities'

const formRepository = AppDataSource.getRepository(Form)

export { formRepository }
