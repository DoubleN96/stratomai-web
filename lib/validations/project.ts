import { z } from "zod";

export const projectSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  description: z.string().optional(),
  status: z.enum(["PLANNING", "IN_PROGRESS", "ON_HOLD", "COMPLETED", "CANCELLED"]).default("PLANNING"),
  budget: z.string().optional().transform((val) => val ? parseFloat(val) : undefined),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  clientId: z.string().cuid("ID de cliente inválido"),
  managerId: z.string().cuid("ID de manager inválido"),
});

export const updateProjectSchema = projectSchema.partial().extend({
  id: z.string().cuid(),
});

export type ProjectFormData = z.infer<typeof projectSchema>;
export type UpdateProjectData = z.infer<typeof updateProjectSchema>;
