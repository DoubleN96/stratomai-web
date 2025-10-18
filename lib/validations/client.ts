import { z } from "zod";

export const clientSchema = z.object({
  name: z.string().trim().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().trim().email("Email inválido"),
  phone: z.string().trim().optional(),
  company: z.string().trim().optional(),
  industry: z.string().trim().optional(),
  website: z.string().trim().url("URL inválida").optional().or(z.literal("")),
  address: z.string().trim().optional(),
  notes: z.string().trim().optional(),
  status: z.enum(["ACTIVE", "INACTIVE", "CHURNED"]).default("ACTIVE"),
});

export const updateClientSchema = clientSchema.partial().extend({
  id: z.string().cuid(),
});

export type ClientFormData = z.infer<typeof clientSchema>;
export type UpdateClientData = z.infer<typeof updateClientSchema>;
