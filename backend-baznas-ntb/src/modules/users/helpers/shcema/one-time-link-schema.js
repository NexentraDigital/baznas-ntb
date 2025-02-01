import {z} from "zod";

const oneTimeLinkSchema = z.object({
  email: z.string().min(1, "Email wajib diisi").email("Email tidak valid, mohon masukkan email valid")
}) 
export default oneTimeLinkSchema;