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

router.get('/', function(req, res, next) {
	res.send('qrcode generate')
})

router.get('/qr',function(req, res, next) {
	var tel = req.query.tel
	var money = 0
	var amount = req.query.amount
	if(amount != null) {
		try {
			const number = Number(amount)
			if(number > 0){
				money = number
			}
		}catch(err) {
			console.log(err)
		}
	}
	const payload = generatePayload(tel, {"amount" : money})
	res.json({qr:payload})
})

router.get('/qr/image',(req, res, next) => {
	var tel = req.query.tel 
	var money = 0
	var amount = req.query.amount
	if(amount != null) {
		try {
			const number = Number(amount)
			if(number > 0){
				money = number
			}
		}catch(err) {
			console.log(err)
		}
	}
	const payload = generatePayload(tel, {"amount" : money})
	const option = {type: 'svg', color: {dark: '#000', light: '#fff'}}
	qrcode.toString(payload,option, (err, svg) => {
		console.log(payload)
		res.send(svg)
	})
})

module.exports = router;
