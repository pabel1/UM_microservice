import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsyncError from '../../../Errorhandler/catchAsync'
import { paginationFields } from '../../constants/pagination.constants'
import { ConsoleLog } from '../../shared/consoleLogForDev'
import pick from '../../shared/pick'
import sendResponse from '../../shared/sendResponse'
import { academicSemesterServices } from './academicSemester.services'

const academicSemesterCreate = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body
    const result = await academicSemesterServices.createSemesterToDB(payload)

    ConsoleLog(result)

    sendResponse(res, {
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
    const paginationOptions = pick(req.query, paginationFields)
    ConsoleLog(paginationOptions)

    const result = await academicSemesterServices.getAllSemesterFromDB(
      paginationOptions,
    )
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester retrieved Successfull!!',
      data: result,
    })

    // next()
  },
)

export const academicSemesterController = {
  academicSemesterCreate,
  getAllSemester,
}
