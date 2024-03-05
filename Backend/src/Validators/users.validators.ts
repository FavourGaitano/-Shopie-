import joi from 'joi'

export const registerUserSchema = joi.object({
    name: joi.string().min(3).optional(),
    email: joi.string().email().optional(),
    password: joi.string().optional(),
    role: joi.string().min(2).optional(),
    phone_no: joi.string().min(3).optional()
})