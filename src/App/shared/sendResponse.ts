import { Response } from 'express'

type IApiResponse<T> = {
  statusCode: number
  success: boolean
  message?: string | null
  meta?: {
    page: number | null | undefined
    limit: number | null | undefined
    total: number | null | undefined
  }
  data?: T | null
}
const sendResponse = <T>(res: Response, data: IApiResponse<T>): void => {
  const resObject: IApiResponse<T> = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message || null,
    meta: data.meta,
    data: data.data,
  }
  res.status(data.statusCode).json(resObject)
}

export default sendResponse

// sendResponse(res,{
// statusCode:httpStatus.ok,
// success:true,
// message:"s",
// data:result
// })
