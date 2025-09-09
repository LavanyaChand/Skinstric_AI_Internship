import * as z from "zod";

// Schema
export const userName = z.object({
    name: z.string().min(2, {message: 'Please enter your full name'})
})

export const userLocation= z.object({
    location: z.string().min(3, {message: 'Please enter valid city.'})
})