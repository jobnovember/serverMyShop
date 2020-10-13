const { json } = require('express');
const express = require('express');
const generatePayload = require('promptpay-qr');
const qrcode = require('qrcode');
const fs = require('fs');
const admin = require('firebase-admin');
const app = require('../app');
const svg64 = require('svg64');
const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");
require("firebase/storage");
const config =  require('../config/firebaseConfig');
const serviceAccount = require("../config/servicekey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://myshop-ea026.firebaseio.com'
});

firebase.initializeApp(config)
firebase.auth().signInWithEmailAndPassword("admin@admin.com","123456")
  .catch(function(error){
    console.log(error.message)
  })

const db = admin.firestore();
var router = express.Router();

route.get('/', (req, res, next) => {
	res.json({status: 'ok'})
})

router.get('/qr',function(req, res, next) {
  var tel = req.query.tel
  var amount = req.query.amount
  const payload = generatePayload(tel, amount)
  res.send(payload)
})

module.exports = router;
