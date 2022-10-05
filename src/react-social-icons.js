import ASocialIcon from './social-icon.js'
import { init } from './networks'
import db from './_networks-db'
export { keyFor } from './networks'

init(db)

const SocialIcon = ASocialIcon

export { SocialIcon }
