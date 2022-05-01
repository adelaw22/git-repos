require('dotenv').config()
const axios = require('axios')
const express = require('express')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

console.log(process.env)

app.post('/authenticate', async (req, res) => {
  try {
    const { code } = req.body
    const data = {
      code,
      client_id: process.env.REACT_APP_CLIENT_ID,
      client_secret: process.env.REACT_APP_CLIENT_SECRET,
      redirect_uri: process.env.REACT_APP_REDIRECT_URI,
    }

    axios(`https://github.com/login/oauth/access_token`, {
      method: 'POST',
      body: data,
    })
      .then((response) => response.text())
      .then((paramsString) => {
        let params = new URLSearchParams(paramsString)
        const access_token = params.get('access_token')

        // Request to return data of a user that has been authenticated
        return axios(`https://api.github.com/user`, {
          headers: {
            Authorization: `token ${access_token}`,
          },
        })
      })
      .then((response) => response.json())
      .then((response) => {
        return res.status(200).json(response)
      })
      .catch((error) => {
        return res.status(400).json(error)
      })

    // return res.send(code)
  } catch (err) {
    console.log(err)
  }
})

const port = 4444

app.listen(port, () => console.log(`listening on ${port}`))
