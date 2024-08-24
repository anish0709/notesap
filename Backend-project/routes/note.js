const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const {body, validationResult} = require('express-validator');
const becrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');



