// import { z } from "zod";

// const createFundraisingSchema = z
//   .object({
//     title: z.string().trim().min(1, "Title wajib diisi"),
//     image: z.string(),
//     description: z.object({
//       title: z.string().trim().min(1, "Title wajib diisi"),

//       body: z
//         .string()
//         .trim()
//         .min(10, "Deskripsi minimal 10 karakter")
//         .max(10000, "Deskripsi maksimal 10000 karakter"),
//     }),

//     targetAmount: z
//       .number()
//       .min(10000, "Target minimal Rp 10.000")
//       .max(100000000, "Target maksimal Rp 100.000.000"),

//     programName: z
//       .string()
//       .trim()
//       .min(3, "Nama program minimal 3 karakter")
//       .max(50, "Nama program maksimal 50 karakter"),

//     programType: z.enum(["donasi", "fidyah"]).default("donasi"),

//     publicationDate: z
//       .preprocess(
//         (arg) => (typeof arg === "string" ? new Date(arg) : arg),
//         z.date()
//       )
//       .refine((date) => date <= new Date(), {
//         message: "Tanggal publikasi tidak valid",
//       }),

//     expirationDate: z
//       .preprocess(
//         (arg) => (typeof arg === "string" ? new Date(arg) : arg),
//         z.date()
//       )
//       .refine((date) => date > new Date(), {
//         message: "Tanggal kedaluwarsa, masukan yang valid",
//       }),
//   })
//   .strict();

// export default createFundraisingSchema;

import { z } from "zod";

const createFundraisingSchema = z.object({
  title: z.string().trim().min(1, "Title wajib diisi"),
  description: z.object({
    title: z.string().trim().min(1, "Title wajib diisi"),
    body: z
      .string()
      .trim()
      .min(10, "Deskripsi minimal 10 karakter")
      .max(10000, "Deskripsi maksimal 10000 karakter"),
  }),
  targetAmount: z
    .string()
    .transform((val) => Number(val))
    .pipe(
      z.number()
        .min(10000, "Target minimal Rp 10.000")
        .max(100000000, "Target maksimal Rp 100.000.000")
    ),
  programName: z
    .string()
    .trim()
    .min(3, "Nama program minimal 3 karakter")
    .max(50, "Nama program maksimal 50 karakter"),
  programType: z
    .string()
    .trim()
    .transform(val => val.toLowerCase())
    .pipe(z.enum(["donasi", "fidyah"]))
    .default("donasi"),
  publicationDate: z
    .string()
    .transform((str) => new Date(str)),
  expirationDate: z
    .string()
    .transform((str) => new Date(str))
}).passthrough(); // Allow extra fields like image

export default createFundraisingSchema;
