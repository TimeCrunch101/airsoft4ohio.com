const axios = require('axios');
const DB = require('../dbController')


exports.enrollMFA = async (req, res) => {
  
  const options = {
    method: 'POST',
    url: 'https://easy-authenticator.p.rapidapi.com/newAuthKey',
    params: {
      account: req.user.email,
      issuer: 'A40'
    },
    headers: {
      'X-RapidAPI-Key': process.env.RAPID_API_KEY,
      'X-RapidAPI-Host': 'easy-authenticator.p.rapidapi.com'
    }
  };
  try {
      const response = await axios.request(options);
      await DB.storeMFAtoken(response.data.secretCode, req.user.email)
      res.status(200).json({
        values: response.data
      })
  } catch (error) {
      res.status(500).json({
        error: error
      })
  }
}

exports.validate = async (req, res) => {
  const userSecret = await DB.getUserSecret(req.user.userID)
  console.log("The Secret: ",userSecret)
  console.log("The TOTP: ",req.body.totp)
  const axios = require('axios');
  const options = {
    method: 'POST',
    url: 'https://easy-authenticator.p.rapidapi.com/verify',
    params: {
      secretCode: userSecret,
      token: req.body.totp
    },
    headers: {
      'X-RapidAPI-Key': process.env.RAPID_API_KEY,
      'X-RapidAPI-Host': 'easy-authenticator.p.rapidapi.com'
    }
  };
  try {
    const response = await axios.request(options);
    res.status(200).json({
      validation: response.data
    })
  } catch (error) {
    res.status(500).json({
      error: error.message,
      cause: error.cause
    })
  }
}