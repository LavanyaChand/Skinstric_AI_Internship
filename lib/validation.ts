import * as z from "zod";

const alphabetWithSpaceRegex = /^[A-Za-z\s]+$/;

export const userName = z.object({
  name: z
    .string()
    .min(2, { message: "Please enter your full name" })
    .regex(alphabetWithSpaceRegex, {
      message: "Please enter a valid entry without numbers or special characters",
    }),
});

export const userLocation = z.object({
  location: z
    .string()
    .min(3, { message: "Please enter valid city." })
    .regex(alphabetWithSpaceRegex, {
      message: "Please enter a valid entry without numbers or special characters",
    }),
});