import { z } from "zod";

export const sendMesssageValidator = z.object({
    fileId: z.string(),
    message: z.string()
})