import { makeClient } from '../fauna/make-client'
import { setup } from '../fauna/setup'

setup(
  makeClient({
    secret: process.env.FAUNA_ADMIN_KEY,
    domain: process.env.FAUNA_DOMAIN,
  })
)
