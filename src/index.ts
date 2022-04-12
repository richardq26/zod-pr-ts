import { z } from "zod";
/*npx ts-node-dev --respawn src/index.ts*/
// npx tsc --init para que cree tsconfig.json y lo use en vez del de vscode

const UserSchema = z.object({
  name: z.string(),
  age: z.number(),
  email: z.string().email().optional(),
  phoneNumber: z
    .string()
    .regex(/^([0-9])*$/)
    .optional(),
});

const AddressSchema = z.object({
  street: z.string(),
  city: z.string(),
});

type UserType = z.infer<typeof UserSchema>;
// Combinando los schemas
const CitizenSchema = UserSchema.merge(AddressSchema);
type CitizenType = z.infer<typeof CitizenSchema>;

const user: UserType = {
  name: "John",
  age: 30,
  phoneNumber: "1234567890",
  email: "r@gmail.com",
};
const resultUser = UserSchema.parse(user);

const citizen: CitizenType = {
  name: "John",
  age: 30,
  phoneNumber: "1234567890",
  email: "r2@gmail.com",
  street: "Calle 123",
  city: "Ciudad",
};

const resultCitizen = CitizenSchema.parse(citizen);
console.log(resultCitizen);
console.log(resultUser);

const stringSchema = z.string();
// safeParse para no acabar la ejecución del programa
// El error se guarda en el programa
const resultStringSchema = stringSchema.safeParse(455);
// console.log(resultStringSchema);

const arrayStringSchema = z.array(z.string());
type nmberArrayType = z.infer<typeof arrayStringSchema>;

const otherUserSchema = z.object({ name: z.string(), age: z.number() });

const personsSchema = z.array(otherUserSchema);

const unionPersonSchema = z.array(
  z.object({ name: z.string(), age: z.number() })
);

personsSchema.parse([
  { name: "John", age: 30 },
  { name: "John", age: 30 },
]);

// Siempre el tipo de dato primero, antes del array
const s1 = z.string().optional().array();
// s1: Un arreglo de (strings o de opcionales)
// const s2 = z.array().string();
const s2 = z.string().array().optional();
// s2: Un (arreglo de strings) o (opcional)
type s1Type = z.infer<typeof s1>;
type s2Type = z.infer<typeof s2>;

const results1 = s1.parse(["a", "b", undefined]);
const results2 = s2.parse(["a", "b"] || undefined);
