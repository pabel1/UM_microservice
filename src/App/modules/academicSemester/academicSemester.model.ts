import { Model, Schema, model } from 'mongoose'
import { IAcademicSemester } from './academicSemester.interface'

//! Create a new Model type that knows about IUserMethods...
type AcademicSemesterModel = Model<IAcademicSemester, object>

const userSchema = new Schema<IAcademicSemester>(
  {
    title: {
      type: String,

      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      required: true,
    },
    endMonth: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  'academic_Semester',
  userSchema,
)
