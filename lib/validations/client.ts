import { z } from "zod";

export const clientSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().optional(),
  company: z.string().optional(),
  industry: z.string().optional(),
  website: z.string().url("URL inválida").optional().or(z.literal("")),
  address: z.string().optional(),
  notes: z.string().optional(),
  status: z.enum(["ACTIVE", "INACTIVE", "CHURNED"]).default("ACTIVE"),
});

export const updateClientSchema = clientSchema.partial().extend({
  id: z.string().cuid(),
});

export type ClientFormData = z.infer<typeof clientSchema>;
export type UpdateClientData = z.infer<typeof updateClientSchema>;
