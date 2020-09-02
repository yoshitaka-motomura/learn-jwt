import dotenv from 'dotenv'
dotenv.config()

export const corsOptions = {
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  origin: 'http://localhost',
  optionsSuccessStatus: 200,
}

export const jwtSecretKey = process.env.SECRET_KEY || 'would is secretkey that'
