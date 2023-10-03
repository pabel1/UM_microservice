/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import ErrorHandler from '../../../Errorhandler/errorHandler'
import { IGenericResponse } from '../../../interfaces/generic.response'
import { IPaginationOptions } from './../../../interfaces/paginationOptions'

import { SortOrder } from 'mongoose'
import { ConsoleLog } from '../../shared/consoleLogForDev'
import { createDynamicFilter } from '../../shared/filteringHelper'
import { paginationHelpers } from '../../shared/paginationHelper'
import { createSearchQuery } from '../../shared/searchHelper'
import {
  IAcademicSemester,
  IAcademicSemesterFilters,
} from './academicSemester.interface'
import { AcademicSemester } from './academicSemester.model'
import {
  academicSemesterSearchableFields,
  asTitleCodeConstant,
} from './as.constant'

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
  filters: IAcademicSemesterFilters,
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const matchAnd: any[] = []
  const pipeline: any[] = []
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(queryOptions)

  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters
  console.log(filtersData)

  //? Search needs $or for searching in specified fields
  const academicQuery = createSearchQuery(
    searchTerm,
    academicSemesterSearchableFields,
  )
  if (academicQuery) {
    matchAnd.push(academicQuery)
  }
  ConsoleLog(academicQuery)
  // ?filtering added
  const dynamicFilter = createDynamicFilter(filtersData)

  if (dynamicFilter) {
    matchAnd.push(dynamicFilter)
  }
  ConsoleLog(dynamicFilter)
  ConsoleLog(sortBy)
  ConsoleLog(typeof sortOrder)

  // ? dynamic sorting

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

  if (matchAnd.length) {
    pipeline.unshift({
      $match: { $and: matchAnd },
    })
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

// update academic semester
const updateSemesterToDB = async (
  id: string,
  payload: Partial<IAcademicSemester>,
): Promise<IAcademicSemester | null> => {
  if (payload.title && payload.code) {
    throw new ErrorHandler('Invalid Semester Code', httpStatus.BAD_REQUEST)
  }

  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

// delete semester
const deleteSemsterFromDB = async (
  id: string,
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findByIdAndDelete(
    { _id: id },
    {
      new: true,
    },
  )
  return result
}

export const academicSemesterServices = {
  createSemesterToDB,
  getAllSemesterFromDB,
  updateSemesterToDB,
  deleteSemsterFromDB,
}
