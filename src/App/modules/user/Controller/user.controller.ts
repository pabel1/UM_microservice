import { Request, Response } from 'express'
import { RequestHandler } from 'express-serve-static-core'
import httpStatus from 'http-status'
import catchAsyncError from '../../../../Errorhandler/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { IUser } from '../Interface/user.interface'
import { UserService } from '../Services/user.services'

const createStudent: RequestHandler = catchAsyncError(
  async (req: Request, res: Response) => {
    const { student, ...userData } = req.body
    const result = await UserService.createStudent(student, userData)

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student created successfully!',
      data: result,
    })
  },
)

const createFaculy: RequestHandler = catchAsyncError(
  async (req: Request, res: Response) => {
    const { faculty, ...userData } = req.body
    const result = await UserService.createFaculty(faculty, userData)

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty created successfully!',
      data: result,
    })
  },
)

const createAdmin: RequestHandler = catchAsyncError(
  async (req: Request, res: Response) => {
    const { admin, ...userData } = req.body
    const result = await UserService.createAdmin(admin, userData)

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin created successfully!',
      data: result,
    })
  },
)

export const UserController = {
  createStudent,
  createFaculy,
  createAdmin,
}
