import httpStatus from 'http-status'
import ErrorHandler from '../../../Errorhandler/errorHandler'
import { IGenericResponse } from '../../../interfaces/generic.response'
import { IPaginationOptions } from '../../../interfaces/paginationOptions'
import { IAcademicSemester } from './academicSemester.interface'
import { AcademicSemester } from './academicSemester.model'
import { asTitleCodeConstant } from './as.constant'

const createSemesterToDB = async (
  payload: IAcademicSemester,
): Promise<IAcademicSemester> => {
  if (asTitleCodeConstant[payload.title] !== payload.code) {
    throw new ErrorHandler('Invalid Semester and Code', httpStatus.BAD_REQUEST)
  }
  const result = await AcademicSemester.create(payload)
  return result
}

const getAllSemesterFromDB = async (
  options: IPaginationOptions,
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const page = Number(options.page)
  const limit = Number(options.limit)

  const skip = (page - 1) * limit

  const result = await AcademicSemester.aggregate([
    { $skip: skip },
    { $limit: limit },
  ])
  const total = await AcademicSemester.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

export const academicSemesterServices = {
  createSemesterToDB,
  getAllSemesterFromDB,
}
