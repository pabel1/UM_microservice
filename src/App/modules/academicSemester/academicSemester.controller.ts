import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsyncError from '../../../Errorhandler/catchAsync'
import { paginationFields } from '../../constants/pagination.constants'
import { ConsoleLog } from '../../shared/consoleLogForDev'
import pick from '../../shared/pick'
import sendResponse from '../../shared/sendResponse'
import { IAcademicSemester } from './academicSemester.interface'
import { academicSemesterServices } from './academicSemester.services'
import { academicSemesterFilterableFields } from './as.constant'

const academicSemesterCreate = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log('auth services')
    const payload = req.body
    const result = await academicSemesterServices.createSemesterToDB(payload)

    ConsoleLog(result)

    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Academic Semester created Successfull!!',
      data: result,
    })

    next()
  },
)

const getAllSemester = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pick(req.query, academicSemesterFilterableFields)
    const paginationOptions = pick(req.query, paginationFields)
    ConsoleLog(paginationOptions)

    const result = await academicSemesterServices.getAllSemesterFromDB(
      paginationOptions,
      filters,
    )

    sendResponse<IAcademicSemester[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester retrieved Successfull!!',
      meta: result.meta,
      data: result.data,
    })

    next()
  },
)

const updateAcademicSemester = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const updatedData = req.body

    const result = await academicSemesterServices.updateSemesterToDB(
      id,
      updatedData,
    )
    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester updated successfully !',
      data: result,
    })
  },
)
const deleteSemester = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id

    const result = await academicSemesterServices.deleteSemsterFromDB(id)

    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester deleted successfully !',
      data: result,
    })
  },
)

export const academicSemesterController = {
  academicSemesterCreate,
  getAllSemester,
  updateAcademicSemester,
  deleteSemester,
}
