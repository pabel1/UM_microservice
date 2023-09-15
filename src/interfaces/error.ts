export type ErrorHandler = {
  statusCode?: number
  message?: string
  //   path?: string
  //   code?: number
  //   keyValue?: unknown
} & Error
