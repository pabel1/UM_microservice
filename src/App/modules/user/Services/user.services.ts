import httpStatus from 'http-status'
import mongoose from 'mongoose'
import ErrorHandler from '../../../../Errorhandler/errorHandler'
import config from '../../../../config'
import { IUser } from '../Interface/user.interface'
import { User } from '../Model/user.model'
import { generateStudentId } from '../utils/user.utils'
import { IAcademicSemester } from '../../academicSemester/academicSemester.interface'
import { AcademicSemester } from '../../academicSemester/academicSemester.model'

const createStudent = async (
 
  user: IUser,
): Promise<IUser | null> => {
  // If password is not given,set default password
  if (!user.password) {
    user.password = config.defaultPass as string
  }
  // set role
  user.role = 'student'

  const academicsemester = await AcademicSemester.findById(
    student.academicSemester,
  ).lean()

  let newUserAllData = null
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    // generate student id
    const id = await generateStudentId(academicsemester as IAcademicSemester)
    // set custom id into both  student & user
    user.id = id
    student.id = id

    // Create student using sesssin
    const newStudent = await Student.create([student], { session })

    if (!newStudent.length) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, 'Failed to create student')
    }

    // set student _id (reference) into user.student
    user.student = newStudent[0]._id

    const newUser = await User.create([user], { session })

    if (!newUser.length) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, 'Failed to create user')
    }
    newUserAllData = newUser[0]

    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    })
  }

  if (newUserAllData) {
    await RedisClient.publish(
      EVENT_STUDENT_CREATED,
      JSON.stringify(newUserAllData.student),
    )
  }

  return newUserAllData
}

const createFaculty = async (
  faculty: IFaculty,
  user: IUser,
): Promise<IUser | null> => {
  // If password is not given,set default password
  if (!user.password) {
    user.password = config.default_faculty_pass as string
  }

  // set role
  user.role = 'faculty'

  let newUserAllData = null
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    // generate faculty id
    const id = await generateFacultyId()
    // set custom id into both  faculty & user
    user.id = id
    faculty.id = id
    // Create faculty using sesssin
    const newFaculty = await Faculty.create([faculty], { session })

    if (!newFaculty.length) {
      throw new Err(httpStatus.BAD_REQUEST, 'Failed to create faculty ')
    }
    // set faculty _id (reference) into user.student
    user.faculty = newFaculty[0]._id

    const newUser = await User.create([user], { session })

    if (!newUser.length) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, 'Failed to create faculty')
    }
    newUserAllData = newUser[0]

    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'faculty',
      populate: [
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    })
  }

  if (newUserAllData) {
    await RedisClient.publish(
      EVENT_FACULTY_CREATED,
      JSON.stringify(newUserAllData.faculty),
    )
  }

  return newUserAllData
}

const createAdmin = async (
  admin: IAdmin,
  user: IUser,
): Promise<IUser | null> => {
  // If password is not given,set default password
  if (!user.password) {
    user.password = config.defaultPass as string
  }
  // set role
  user.role = 'admin'

  let newUserAllData = null
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    // generate admin id
    const id = await generateAdminId()
    user.id = id
    admin.id = id

    const newAdmin = await Admin.create([admin], { session })

    if (!newAdmin.length) {
      throw new ErrorHandler(
        httpStatus.BAD_REQUEST,
        'Failed to create faculty ',
      )
    }

    user.admin = newAdmin[0]._id

    const newUser = await User.create([user], { session })

    if (!newUser.length) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, 'Failed to create admin')
    }
    newUserAllData = newUser[0]

    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'admin',
      populate: [
        {
          path: 'managementDepartment',
        },
      ],
    })
  }

  return newUserAllData
}

export const UserService = {
  createStudent,
  createFaculty,
  createAdmin,
}
