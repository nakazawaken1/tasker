import express from 'express'
import session from 'express-session'
import passport from 'passport'
import { Strategy } from 'passport-github2'

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: 'auto'
  }
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new Strategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL || 'http://localhost:3000/callback'
  },
  (accessToken, refreshToken, profile, done) => {
    process.nextTick(() => done(null, {
      id: profile.id,
      name: profile.username,
      photo: profile.photos[0].value
    }))
  }
))
passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((data, done) => done(null, data))

app.get('/auth/login',
  (req, res, next) => (req.session.url = req.query.url, next()),
  passport.authenticate('github', { scope: ['user:email'] })
)
app.get('/auth/callback',
  passport.authenticate('github'),
  (req, res) => {
    res.json({ user: req.user, url: req.session.url })
  }
)
app.get('/auth/logout', (req, res) => {
  req.logout()
  res.redirect(req.query.url || '/')
})
app.get('/auth/me', (req, res) => {
  res.json({ user: req.user })
})

module.exports = {
  path: '/api',
  handler: app
}
