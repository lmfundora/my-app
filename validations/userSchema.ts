import { z } from "zod";

export const logInShema = z.object({
    email: z.string().email({
        message: "Email inválido"
    }),
    password: z.string().min(6,{
        message: "Contraseña debe contener 6 caracteres mínimos"
  })
})

const phoneRegex = new RegExp(
  /^(\+53)?\s?\(?\d{4}\)?[\s.-]?\d{4}$/
);

export const singInShema = z.object({
    email: z.string().email({
        message: "Email inválido"
    }),
    userName: z.string()
      .min(4,{
        message: "Nombre de usuario debe tener más de 4 caracteres"
      })
      .max(20,{
        message: "El nombre de usuario no debe exeder los 20 caracteres"
      }),
    phone: z.string().regex(phoneRegex, "Número inválido"),
    password: z.string().min(6,{
        message: "Contraseña debe contener 6 caracteres mínimos"
    }),
    confirmpassword: z.string().min(6,{
        message: "Contraseña debe contener 6 caracteres mínimos"
    })
}).refine(data => data.password === data.confirmpassword, {
  message: "Contraseñas diferentes",
  path: ["confirmpassword"]
})
