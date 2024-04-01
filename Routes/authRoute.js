const express = require('express');
const authController = require('../Controller/authController');
const router = express.Router();    
/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: Authenticate user and generate token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully logged 
 *       401:
 *         description: Invalid credentials
 */
router.route('/login')
.post(authController.login)
module.exports = router;