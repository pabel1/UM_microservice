import express from 'express'
import { academicSemesterRouter } from '../modules/academicSemester/academicSemester.router'

const router = express.Router()

router.use('/academic-semister', academicSemesterRouter)

export default router
