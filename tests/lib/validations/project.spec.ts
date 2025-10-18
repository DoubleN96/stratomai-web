import { describe, it, expect } from "vitest";
import { projectSchema, type ProjectFormData } from "@/lib/validations/project";

describe("projectSchema", () => {
  describe("valid data", () => {
    it("should validate complete project data", () => {
      const validData = {
        name: "Website Redesign",
        description: "Complete website redesign project",
        status: "IN_PROGRESS" as const,
        budget: "50000.00",
        startDate: "2025-01-01",
        endDate: "2025-06-30",
        clientId: "clabcdef1234567890123456",
        managerId: "clabcdef1234567890123457",
      };

      const result = projectSchema.safeParse(validData);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).toBe(validData.name);
        expect(result.data.budget).toBe(50000);
        expect(result.data.clientId).toBe(validData.clientId);
      }
    });

    it("should validate minimal required data", () => {
      const minimalData = {
        name: "AB",
        clientId: "clabcdef1234567890123456",
        managerId: "clabcdef1234567890123457",
      };

      const result = projectSchema.safeParse(minimalData);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.status).toBe("PLANNING"); // default value
        expect(result.data.budget).toBeUndefined();
      }
    });

    it("should accept all valid status values", () => {
      const statuses = [
        "PLANNING",
        "IN_PROGRESS",
        "ON_HOLD",
        "COMPLETED",
        "CANCELLED",
      ] as const;

      statuses.forEach((status) => {
        const data = {
          name: "Test Project",
          clientId: "clabcdef1234567890123456",
          managerId: "clabcdef1234567890123457",
          status,
        };

        const result = projectSchema.safeParse(data);
        expect(result.success).toBe(true);
      });
    });

    it("should transform budget string to number", () => {
      const testCases = [
        { input: "1000", expected: 1000 },
        { input: "1000.50", expected: 1000.5 },
        { input: "999.99", expected: 999.99 },
        { input: "0.01", expected: 0.01 },
      ];

      testCases.forEach(({ input, expected }) => {
        const data = {
          name: "Test Project",
          clientId: "clabcdef1234567890123456",
          managerId: "clabcdef1234567890123457",
          budget: input,
        };

        const result = projectSchema.safeParse(data);
        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data.budget).toBe(expected);
        }
      });
    });
  });

  describe("invalid data", () => {
    it("should reject name shorter than 2 characters", () => {
      const data = {
        name: "A",
        clientId: "clabcdef1234567890123456",
        managerId: "clabcdef1234567890123457",
      };

      const result = projectSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain("name");
        expect(result.error.issues[0].message).toContain("2 caracteres");
      }
    });

    it("should reject invalid CUID for clientId", () => {
      const invalidIds = [
        "invalid-id",
        "123456",
        "not-a-cuid",
        "",
      ];

      invalidIds.forEach((clientId) => {
        const data = {
          name: "Test Project",
          clientId,
          managerId: "clabcdef1234567890123457",
        };

        const result = projectSchema.safeParse(data);
        expect(result.success).toBe(false);
        if (!result.success) {
          const clientIdError = result.error.issues.find((issue) =>
            issue.path.includes("clientId")
          );
          expect(clientIdError).toBeDefined();
        }
      });
    });

    it("should reject invalid CUID for managerId", () => {
      const data = {
        name: "Test Project",
        clientId: "clabcdef1234567890123456",
        managerId: "invalid-manager-id",
      };

      const result = projectSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        const managerIdError = result.error.issues.find((issue) =>
          issue.path.includes("managerId")
        );
        expect(managerIdError).toBeDefined();
      }
    });

    it("should reject invalid status values", () => {
      const data = {
        name: "Test Project",
        clientId: "clabcdef1234567890123456",
        managerId: "clabcdef1234567890123457",
        status: "INVALID_STATUS",
      };

      const result = projectSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should reject missing required fields", () => {
      const incompleteDataSets = [
        { name: "Test" }, // missing clientId and managerId
        { name: "Test", clientId: "clabcdef1234567890123456" }, // missing managerId
        { clientId: "clabcdef1234567890123456", managerId: "clabcdef1234567890123457" }, // missing name
      ];

      incompleteDataSets.forEach((data) => {
        const result = projectSchema.safeParse(data);
        expect(result.success).toBe(false);
      });
    });
  });

  describe("budget transformation", () => {
    it("should handle undefined budget", () => {
      const data = {
        name: "Test Project",
        clientId: "clabcdef1234567890123456",
        managerId: "clabcdef1234567890123457",
      };

      const result = projectSchema.safeParse(data);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.budget).toBeUndefined();
      }
    });

    it("should handle empty string budget", () => {
      const data = {
        name: "Test Project",
        clientId: "clabcdef1234567890123456",
        managerId: "clabcdef1234567890123457",
        budget: "",
      };

      const result = projectSchema.safeParse(data);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.budget).toBeUndefined();
      }
    });

    it("should handle invalid budget formats (parseFloat may return NaN)", () => {
      const invalidBudgets = [
        "not-a-number",
        "abc123",
        "12.34.56",
      ];

      invalidBudgets.forEach((budget) => {
        const data = {
          name: "Test Project",
          clientId: "clabcdef1234567890123456",
          managerId: "clabcdef1234567890123457",
          budget,
        };

        const result = projectSchema.safeParse(data);
        // Schema allows parseFloat to return NaN - this is actually a validation gap
        // but the transform succeeds (doesn't throw)
        expect(result.success).toBe(true);
      });
    });

    it("should handle budget with thousands separators", () => {
      // Note: parseFloat doesn't handle thousand separators well
      const data = {
        name: "Test Project",
        clientId: "clabcdef1234567890123456",
        managerId: "clabcdef1234567890123457",
        budget: "1,000,000.50",
      };

      const result = projectSchema.safeParse(data);
      expect(result.success).toBe(true);
      // parseFloat("1,000,000.50") === 1 (stops at comma)
      if (result.success) {
        expect(result.data.budget).toBe(1);
      }
    });
  });

  describe("date fields", () => {
    it("should accept valid ISO date strings", () => {
      const data = {
        name: "Test Project",
        clientId: "clabcdef1234567890123456",
        managerId: "clabcdef1234567890123457",
        startDate: "2025-01-01",
        endDate: "2025-12-31",
      };

      const result = projectSchema.safeParse(data);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.startDate).toBe("2025-01-01");
        expect(result.data.endDate).toBe("2025-12-31");
      }
    });

    it("should handle undefined dates", () => {
      const data = {
        name: "Test Project",
        clientId: "clabcdef1234567890123456",
        managerId: "clabcdef1234567890123457",
      };

      const result = projectSchema.safeParse(data);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.startDate).toBeUndefined();
        expect(result.data.endDate).toBeUndefined();
      }
    });

    it("should allow end date before start date (validation not enforced)", () => {
      // Note: Schema doesn't validate date logic, only format
      const data = {
        name: "Test Project",
        clientId: "clabcdef1234567890123456",
        managerId: "clabcdef1234567890123457",
        startDate: "2025-12-31",
        endDate: "2025-01-01",
      };

      const result = projectSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });

  describe("edge cases", () => {
    it("should handle very long descriptions", () => {
      const longDescription = "A".repeat(10000);
      const data = {
        name: "Test Project",
        description: longDescription,
        clientId: "clabcdef1234567890123456",
        managerId: "clabcdef1234567890123457",
      };

      const result = projectSchema.safeParse(data);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.description).toBe(longDescription);
      }
    });

    it("should not trim whitespace from name (no .trim() in schema)", () => {
      const data = {
        name: "  Test Project  ",
        clientId: "clabcdef1234567890123456",
        managerId: "clabcdef1234567890123457",
      };

      const result = projectSchema.safeParse(data);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).toBe("  Test Project  ");
      }
    });

    it("should handle unicode characters in name and description", () => {
      const data = {
        name: "Proyecto de Diseño Web",
        description: "Rediseño completo del sitio web con tecnología moderna",
        clientId: "clabcdef1234567890123456",
        managerId: "clabcdef1234567890123457",
      };

      const result = projectSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });

  describe("partial schema", () => {
    it("should allow partial updates with partial schema", () => {
      const partialData = {
        name: "Updated Project Name",
      };

      const result = projectSchema.partial().safeParse(partialData);
      expect(result.success).toBe(true);
    });

    it("should validate partial data with status change only", () => {
      const partialData = {
        status: "COMPLETED" as const,
      };

      const result = projectSchema.partial().safeParse(partialData);
      expect(result.success).toBe(true);
    });

    it("should validate partial data with budget update", () => {
      const partialData = {
        budget: "75000.50",
      };

      const result = projectSchema.partial().safeParse(partialData);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.budget).toBe(75000.5);
      }
    });
  });
});
