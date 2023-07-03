/* eslint-env node */
import { SocialIcon } from '../../dist/react-social-icons.js'
import { renderToString, renderToPipeableStream  } from 'react-dom/server'
import { createElement as c} from 'react'
import express from 'express'

const port = Number(process.argv[2]) || 0 // use port from CLI else random port
const app = express()

function Shell(props) {
  return c('html', null,
    c('head', null,
      c('meta', { charSet: 'utf-8' }),
      c('link', { rel: 'stylesheet', href: './app.css' })
    ),
    c('body', null,
      props.children
    ),
  )
}

app.get('/', (req, res) => { // to check if server is up
  res.end()
})

app.get('/render-to-string', (req, res) => {
  res.send(
    renderToString(
      c(Shell, null,
        c(SocialIcon, { network: 'pinterest' })
      )
    )
  )
})

app.get('/render-to-pipeable-stream', (req, res) => {
  const { pipe } = renderToPipeableStream(
    c(Shell, null,
      c(SocialIcon, { network: 'pinterest' })
    ),
    {
      onShellReady() {
        res.setHeader('content-type', 'text/html')
        pipe(res)
      }
    }
  )
})

app.listen(port)
