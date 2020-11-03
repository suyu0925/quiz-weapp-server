if (!process.env.IS_TS_NODE) {
  // tslint:disable-next-line:no-var-requires
  require('module-alias/register')
}

import { Logger } from '@nestjs/common'
import { NestApplication, NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

const logger = new Logger('main')
let app: NestApplication

async function bootstrap() {
  app = await NestFactory.create(AppModule)
  const port = app.get('ConfigService').get('port')
  await app.listen(port, '0.0.0.0')

  logger.log(`Magic happens on port ${port}...`)

  if (process.send) {
    process.send('ready')
  }
}

bootstrap()

process.on('SIGINT', () => {
  logger.log(`recieve SIGINT`)
  app.close()
    .then(() => {
      logger.log(`now we cat exit gracefully`)
      process.exit(0)
    })
    .catch((err) => {
      logger.error(`shutdown catch ${err.stack}`)
      process.exit(-1)
    })
})
