const express = require('express');
const controller = require ('../Controller/classController');
const {bodyValidation , paramIdValidator} = require('../Middelwares/classValidator');
const validatorResult = require('../Middelwares/validatorResult');   
/**
 * @swagger
 * tags:
 *   name: Classes
 *   description: API endpoints for managing classes
 */
const router = express.Router();

 /**
     * @swagger
     * /api/class:
     *   get:
     *     summary: Get all classes
     *     description: Retrieve all classes from the database
     *     tags:
     *       - Classes
     *     responses:
     *       200:
     *         description: A list of classes
     *         schema:
     *           type: array
     *           items:
     *             $ref: '#/definitions/Class'
     *   post:
     *     summary: Create a new class
     *     description: Create a new class with the provided data
     *     tags:
     *       - Classes
     *     requestBody:
     *       description: Class object to be created
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/definitions/ClassInput'
     *     responses:
     *       201:
     *         description: Class created successfully
     *         schema:
     *           $ref: '#/definitions/ClassResponse'
     *       400:
     *         description: Bad request
     */
     /**
     * @swagger
     * /api/class/{id}:
     *   get:
     *     summary: Get a class by ID
     *     description: Retrieve a class by its ID
     *     tags:
     *       - Classes
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: number
     *         description: Class ID
     *     responses:
     *       200:
     *         description: A class object
     *         schema:
     *           $ref: '#/definitions/ClassResponse'
     *       404:
     *         description: Class not found
     *   put:
     *     summary: Update a class by ID
     *     description: Update a class by its ID
     *     tags:
     *       - Classes
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: number
     *         description: Class ID
     *       - in: body
     *         name: body
     *         description: Updated class object
     *         required: true
     *         schema:
     *           $ref: '#/definitions/ClassInput'
     *     responses:
     *       200:
     *         description: Class updated successfully
     *         schema:
     *           $ref: '#/definitions/ClassResponse'
     *       400:
     *         description: Bad request
     *       404:
     *         description: Class not found
     *   delete:
     *     summary: Delete a class by ID
     *     description: Delete a class by its ID
     *     tags:
     *       - Classes
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: number
     *         description: Class ID
     *     responses:
     *       200:
     *         description: Class deleted successfully
     *       404:
     *         description: Class not found
     */
     /**
     * @swagger
     * /api/class/teachers/{id}:
     *   get:
     *     summary: Get class supervisor by ID
     *     description: Retrieve the supervisor (teacher) of a class by its ID
     *     tags:
     *       - Classes
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: number
     *         description: Class ID
     *     responses:
     *       200:
     *         description: Supervisor details
     *         schema:
     *           $ref: '#/definitions/TeacherResponse'
     *       404:
     *         description: Class not found
     */
     /**
     * @swagger
     * /api/class/child/{id}:
     *   get:
     *     summary: Get children of a class by ID
     *     description: Retrieve the children associated with a class by its ID
     *     tags:
     *       - Classes
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: number
     *         description: Class ID
     *     responses:
     *       200:
     *         description: List of children
     *         schema:
     *           type: object
     *           properties:
     *             data:
     *               type: array
     *               items:
     *                 $ref: '#/definitions/Child'
     *       404:
     *         description: Class not found
     */
router
    .route('/class')
    .get(controller.getAllClass)
    .post(bodyValidation,validatorResult,controller.createClass)
   

router.route("/class/:id")
.get(controller.getClassById)
.put(bodyValidation, validatorResult, controller.updateClass)
.delete( controller.deleteClass)  ;

router.route("/class/teachers/:id")
.get(controller.getClassByTeacher);

router.route("/class/child/:id")
.get(controller.getChildData)  ;

module.exports = router ;
