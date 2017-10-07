import * as dotenv from 'dotenv'

dotenv.config()

export const {
  MERCHANT_ID,
  MERCHANT_SUBID,
  MERCHANT_RETURN_URL,
  ROUTING_ENDPOINT,
  PRIVATE_KEY,
  KEYNAME,
  EXPIRATION_PERIOD,
  REQUESTED_SERVICE,
  DEFAULT_LANGUAGE,
  LOA,
  ID_PREFIX,
} = process.env
