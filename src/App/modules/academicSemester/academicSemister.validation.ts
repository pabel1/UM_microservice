import { z } from 'zod'

const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is Required!!',
    }),
    year: z.string({
      required_error: 'year is Required!!',
    }),
    code: z.enum(['01', '02', '03'], {
      required_error: 'Code is required and must follow the enum value ',
    }),
    startMonth: z.string({
      required_error: 'startMonth is Required!!',
    }),
    endMonth: z.string({
      required_error: 'endMonth is Required!!',
    }),
  }),
})

const updateAcademicSemesterZodSchema = z
  .object({
    body: z.object({
      title: z
        .string({
          required_error: 'Title is required',
        })
        .optional(),
      year: z
        .string({
          required_error: 'Year is required ',
        })
        .optional(),
      code: z.enum(['01', '02', '03']).optional(),
      startMonth: z
        .string({
          required_error: 'Start month is needed',
        })
        .optional(),
      endMonth: z.string({}).optional(),
    }),
  })
  .refine(
    data =>
      (data.body.title && data.body.code) ||
      (!data.body.title && !data.body.code),
    {
      message: 'Either both title and code should be provided or neither',
    },
  )

export const academicSemesterValidation = {
  createAcademicSemesterZodSchema,
  updateAcademicSemesterZodSchema,
}
