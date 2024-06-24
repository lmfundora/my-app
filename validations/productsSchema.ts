import { z } from "zod";

export const productsShema = z.object({
  name: z
    .string()
    .min(4, {
      message: "Nombre inválido, mínimo 4 caracteres",
    })
    .max(20, {
      message: "Nombre inválido, máximo 20 caracteres",
    }),
  description: z
    .string()
    .min(4, {
      message: "Descripción debe contener 4 caracteres mínimos",
    })
    .max(200, {
      message: "Descripción debe contener 200 caracteres máximo",
    }),
  price: z.string()
 .transform(Number) // Transforma la cadena de texto a un número
 .refine(value =>!isNaN(value), { message: "El valor debe ser un número" })
});
