require('dotenv').config()
const axios = require('axios')
const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

app.post('/authenticate', async (req, res) => {
  try {
    const { code } = req.body
    const data = {
      code,
      client_id: process.env.REACT_APP_CLIENT_ID,
      client_secret: process.env.REACT_APP_CLIENT_SECRET,
      redirect_uri: process.env.REACT_APP_REDIRECT_URI,
    }

    let response = await axios.post(
      `https://github.com/login/oauth/access_token`,
      data,
      {
        headers: {
          Accept: 'application/json',
        },
      },
    )

    const { access_token, token_type, scope } = response.data

    response = await axios.get(`https://api.github.com/user`, {
      headers: { Authorization: `${token_type} ${access_token}` },
    })

    return res.json(response.data)
  } catch (err) {
    console.log(err.data)
  }
})

const port = process.env.SERVER_PORT

app.listen(port, () => console.log(`listening on ${port}`))
