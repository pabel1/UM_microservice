import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsyncError from '../../../Errorhandler/catchAsync'
import { ConsoleLog } from '../../shared/consoleLogForDev'
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
  },
)

export const academicSemesterController = {
  academicSemesterCreate,
}
