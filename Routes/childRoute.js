const express = require('express');
const controller = require('../Controller/childController');
const { bodyValidation, paramIdValidator } = require('../Middelwares/childValidator');
const validatorResult = require('../Middelwares/validatorResult');
const { validate } = require('../Model/teacherModel');
/**
 * @swagger
 * tags:
 *   name: Students
 *   description: API endpoints for managing students
 */

const router = express.Router();

/**
 * @swagger
 * /api/students:
 *   get:
 *     summary: Get all students
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: Successful operation
 */
/**
 * @swagger
 * /api/students:
 *   post:
 *     summary: Add a new student
 *     tags: [Students]
 *     parameters:
 *       - in: body
 *         name: student
 *         description: Student object
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             _id:
 *               type: number
 *             fullName:
 *               type: string
 *             age:
 *               type: number
 *             level:
 *               type: string
 *               enum: ['PreKG', 'KG1', 'KG2']
 *             address:
 *               type: object
 *               properties:
 *                 city:
 *                   type: string
 *                 street:
 *                   type: string
 *                 building:
 *                   type: number
 *             image:
 *               type: string
 *     responses:
 *       201:
 *         description: Student added successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/students/{id}:
 *   get:
 *     summary: Get a student by ID
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Student ID
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: Student not found
 */

/**
 * @swagger
 * /api/students/{id}:
 *   put:
 *     summary: Update a student by ID
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Student ID
 *         required: true
 *         type: integer
 *       - in: body
 *         name: student
 *         description: Updated student object
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             fullName:
 *               type: string
 *             age:
 *               type: number
 *             level:
 *               type: string
 *               enum: ['PreKG', 'KG1', 'KG2']
 *             address:
 *               type: object
 *               properties:
 *                 city:
 *                   type: string
 *                 street:
 *                   type: string
 *                 building:
 *                   type: number
 *             image:
 *               type: string
 *     responses:
 *       200:
 *         description: Student updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Student not found
 */
/**
 * @swagger
 * /api/students/{id}:
 *   delete:
 *     summary: Delete a student by ID
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Student ID
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Student deleted successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Student not found
 */

router.route('/students')
    .get(controller.getAllStudent)
    .post(bodyValidation,validatorResult,controller.addStudent)
    .put(bodyValidation, validatorResult, controller.updateStudent)
    .delete(controller.deleteStudent);

router.route('/students/:id')
    .get(controller.getStudentById)
    .put( validatorResult, controller.updateStudent)
    .delete(controller.deleteStudent);

module.exports = router;
