import { describe, it, expect } from "vitest";
import { clientSchema, type ClientFormData } from "@/lib/validations/client";

describe("clientSchema", () => {
  describe("valid data", () => {
    it("should validate complete client data", () => {
      const validData: ClientFormData = {
        name: "Juan Pérez",
        email: "juan@empresa.com",
        phone: "+34 600 000 000",
        company: "Acme Inc.",
        industry: "Tecnología",
        website: "https://empresa.com",
        address: "Calle Principal 123, Madrid",
        notes: "Cliente importante",
        status: "ACTIVE",
      };

      const result = clientSchema.safeParse(validData);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    it("should validate minimal required data only", () => {
      const minimalData = {
        name: "JD",
        email: "test@example.com",
      };

      const result = clientSchema.safeParse(minimalData);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).toBe("JD");
        expect(result.data.email).toBe("test@example.com");
        expect(result.data.status).toBe("ACTIVE"); // default value
      }
    });

    it("should accept valid status values", () => {
      const statuses = ["ACTIVE", "INACTIVE", "CHURNED"] as const;

      statuses.forEach((status) => {
        const data = {
          name: "Test User",
          email: "test@example.com",
          status,
        };

        const result = clientSchema.safeParse(data);
        expect(result.success).toBe(true);
      });
    });

    it("should validate optional fields when provided", () => {
      const dataWithOptionals = {
        name: "Test User",
        email: "test@example.com",
        phone: "+34 611 03 19 47",
        company: "Test Company",
        industry: "Testing",
        website: "https://test.com",
        address: "Test Street 1",
        notes: "Test notes",
      };

      const result = clientSchema.safeParse(dataWithOptionals);
      expect(result.success).toBe(true);
    });
  });

  describe("invalid data", () => {
    it("should reject name shorter than 2 characters", () => {
      const data = {
        name: "A",
        email: "test@example.com",
      };

      const result = clientSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain("name");
        expect(result.error.issues[0].message).toContain("2 caracteres");
      }
    });

    it("should reject invalid email format", () => {
      const invalidEmails = [
        "notanemail",
        "missing@domain",
        "@nodomain.com",
        "spaces in@email.com",
      ];

      invalidEmails.forEach((email) => {
        const data = {
          name: "Test User",
          email,
        };

        const result = clientSchema.safeParse(data);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].path).toContain("email");
        }
      });
    });

    it("should reject invalid status values", () => {
      const data = {
        name: "Test User",
        email: "test@example.com",
        status: "INVALID_STATUS",
      };

      const result = clientSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should reject missing required fields", () => {
      const incompleteData = {
        name: "Test User",
        // missing email
      };

      const result = clientSchema.safeParse(incompleteData);
      expect(result.success).toBe(false);
      if (!result.success) {
        const emailError = result.error.issues.find((issue) =>
          issue.path.includes("email")
        );
        expect(emailError).toBeDefined();
      }
    });
  });

  describe("edge cases", () => {
    it("should handle empty strings for optional fields", () => {
      const data = {
        name: "Test User",
        email: "test@example.com",
        phone: "",
        company: "",
        industry: "",
      };

      const result = clientSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it("should not trim whitespace from strings (no .trim() in schema)", () => {
      const data = {
        name: "  Test User  ",
        email: "test@example.com",
      };

      const result = clientSchema.safeParse(data);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).toBe("  Test User  ");
        expect(result.data.email).toBe("test@example.com");
      }
    });

    it("should handle unicode characters in name", () => {
      const data = {
        name: "José García Núñez",
        email: "jose@example.com",
      };

      const result = clientSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it("should validate international phone numbers", () => {
      const phoneNumbers = [
        "+1 (555) 123-4567",
        "+44 20 7123 4567",
        "+34 611 03 19 47",
        "+81 3-1234-5678",
      ];

      phoneNumbers.forEach((phone) => {
        const data = {
          name: "Test User",
          email: "test@example.com",
          phone,
        };

        const result = clientSchema.safeParse(data);
        expect(result.success).toBe(true);
      });
    });

    it("should validate various website formats", () => {
      const websites = [
        "https://example.com",
        "http://test.co.uk",
        "https://subdomain.example.com",
        "https://example.com/path",
      ];

      websites.forEach((website) => {
        const data = {
          name: "Test User",
          email: "test@example.com",
          website,
        };

        const result = clientSchema.safeParse(data);
        expect(result.success).toBe(true);
      });
    });
  });

  describe("partial schema", () => {
    it("should allow partial updates with partial schema", () => {
      const partialData = {
        name: "Updated Name",
      };

      const result = clientSchema.partial().safeParse(partialData);
      expect(result.success).toBe(true);
    });

    it("should validate partial data with multiple fields", () => {
      const partialData = {
        phone: "+34 600 000 000",
        status: "INACTIVE" as const,
      };

      const result = clientSchema.partial().safeParse(partialData);
      expect(result.success).toBe(true);
    });
  });
});
