/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import ErrorHandler from '../../../Errorhandler/errorHandler'
import { IGenericResponse } from '../../../interfaces/generic.response'
import { IPaginationOptions } from './../../../interfaces/paginationOptions'

import { SortOrder } from 'mongoose'
import { ConsoleLog } from '../../shared/consoleLogForDev'
import { paginationHelpers } from '../../shared/paginationHelper'
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
  queryOptions: IPaginationOptions,
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(queryOptions)

  ConsoleLog(sortBy)
  ConsoleLog(typeof sortOrder)
  const pipeline: any[] = []
  if (skip !== undefined) {
    pipeline.push({ $skip: skip })
  }

  if (limit !== undefined) {
    pipeline.push({ $limit: limit })
  }
  if (sortBy && sortOrder) {
    const keyValue: { [key: string]: SortOrder } = {}
    keyValue[sortBy] = sortOrder
    console.log(keyValue)
    pipeline.push({
      $sort: {
        [sortBy]: sortOrder === ('asc' || '-1') ? 1 : -1,
      },
    })
    // pipeline.push({ $sort: { sortBy: sortOrder } })
  }

  console.log(pipeline)
  const result = await AcademicSemester.aggregate(pipeline)
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
