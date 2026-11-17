import { Request, Response, NextFunction } from 'express'
import { ZodType } from 'zod'
import { AppError } from '../utils/globalErrorHandling'

type ReqType = keyof Request
type SchemaType = Partial<Record<ReqType, ZodType>>

export const validation = (schema: SchemaType) => {
    return (req: Request, res: Response, next: NextFunction) => {
        
            const ResultError=[]
            for (const key of Object.keys(schema)as ReqType[]) {
                if (!schema[key]) continue
                const result = schema[key]?.safeParse(req[key])
                if (!result?.success) {
                    ResultError.push(result?.error.message)
                }
            }
            if (ResultError.length > 0) {
                throw new AppError(JSON.parse(ResultError.join(', ')), 400)
            }
            next()
        
    }
}
    