import { z } from "zod";

const loginAdminSchema = z.object({
  email: z
    .string()
    .min(1, "Email wajib diisi")
    .email("Email tidak valid, mohon masukkan email valid"),
  password: z
    .string()
    .min(1, "Password wajib diisi"),
});
export default loginAdminSchema;
