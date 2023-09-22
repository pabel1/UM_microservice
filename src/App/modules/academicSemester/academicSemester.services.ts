import httpStatus from 'http-status'
import ErrorHandler from '../../../Errorhandler/errorHandler'
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

export const academicSemesterServices = {
  createSemesterToDB,
}
