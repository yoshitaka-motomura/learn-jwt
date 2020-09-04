import express = require('express')
import { Response, Request, NextFunction } from 'express'
import cors = require('cors')
import { corsOptions, jwtSecretKey } from './config'
import moment from 'moment'
import { authenticate } from './auth'
import { v4 as uuidv4 } from 'uuid'
import { sign, verify } from 'jsonwebtoken'
import * as path from 'path'

const app: express.Application = express()

app.set('superSecret', jwtSecretKey)

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.sendFile(`${path.join(__dirname)}/static/index.html`)
})
app.get('/public', (_, res) => {
  const present = moment().format('YYYY-MM-DD HH:mm:ssZ')
  res.json({
    scope: 'public',
    message: '公開エンドポイントです。閲覧に制限はありません。',
    date: present,
  })
})

/**
 * jwt verify middleware
 * @param req
 * @param res
 * @param next
 */
function jwtAuthenticateMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    res.status(401).json({ message: 'Unauthorized' })
  } else {
    const token = authHeader.split(' ')[1]
    verify(token, app.get('superSecret'), (err, data) => {
      if (err) {
        res.status(403).json({ message: err.message })
        return
      }
      req.body.user = data
      next()
    })
    return false
  }
}

app.post('/token', (req, res) => {
  const { email, password } = req.body
  const user = authenticate(email, password)
  console.log(user)
  if (!user.login) {
    res.status(401).json({
      message: 'Unauthenticated',
    })
    return
  }
  const token = sign({ email: user.email }, app.get('superSecret'), {
    expiresIn: 60 * 15,
    issuer: 'http://localhost',
    subject: `${user.id}`,
    audience: 'http://localhost/',
    jwtid: uuidv4(),
  })
  res.json({ token })
})

app.get('/private', jwtAuthenticateMiddleware, (req, res) => {
  const { user } = req.body
  res.json({ message: 'hello', token: user })
})

app.listen(8080, function () {
  console.log('http://localhost:8080')
})
