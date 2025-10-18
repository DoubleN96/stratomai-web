# Testing Guide - Stratomai

## Overview

This document describes the testing strategy, conventions, and guidelines for the Stratomai web application.

## Test Stack

- **Test Runner**: Vitest (compatible with Vite and Next.js)
- **Assertions**: Vitest (Jest-compatible API)
- **Mocking**: Vitest built-in mocking
- **Coverage**: Vitest coverage (@vitest/coverage-v8)

## Project Structure

```
/tests
├── app/
│   └── api/
│       └── webhooks/
│           └── webhook-verification.spec.ts
├── lib/
│   ├── logging/
│   │   └── logger.spec.ts
│   └── validations/
│       ├── client.spec.ts
│       └── project.spec.ts
└── components/ (future)
```

## Test Coverage

Current coverage: **72 tests passing**

### Validation Tests (37 tests)
- Client schema validation: 15 tests
- Project schema validation: 22 tests

### Security Tests (20 tests)
- Webhook signature verification: 20 tests
- HMAC SHA-256 validation
- Timing attack resistance
- Buffer length validation

### Logging Tests (15 tests)
- Logger configuration
- Log levels and hierarchy
- Error handling
- Log formatting and redaction

## Running Tests

### All Tests
```bash
npm run test
```

### Watch Mode
```bash
npm run test:watch
```

### Coverage Report
```bash
npm run test:coverage
```

### Specific Test File
```bash
npx vitest tests/lib/validations/client.spec.ts
```

### Run with UI
```bash
npx vitest --ui
```

## Writing Tests

### Test Structure

Follow the AAA pattern (Arrange, Act, Assert):

```typescript
import { describe, it, expect } from "vitest";
import { myFunction } from "@/lib/my-module";

describe("myFunction", () => {
  describe("when condition is met", () => {
    it("should return expected result", () => {
      // Arrange
      const input = "test";

      // Act
      const result = myFunction(input);

      // Assert
      expect(result).toBe("expected");
    });
  });
});
```

### Naming Conventions

- **Test files**: `*.spec.ts` or `*.test.ts`
- **Test suites**: Use descriptive names matching the function/component being tested
- **Test cases**: Start with "should" and describe the expected behavior

### Test Organization

Group related tests using nested `describe` blocks:

```typescript
describe("clientSchema", () => {
  describe("valid data", () => {
    it("should validate complete client data", () => {});
    it("should validate minimal required data", () => {});
  });

  describe("invalid data", () => {
    it("should reject invalid email", () => {});
    it("should reject missing fields", () => {});
  });

  describe("edge cases", () => {
    it("should handle empty strings", () => {});
    it("should trim whitespace", () => {});
  });
});
```

## Testing Best Practices

### 1. Test Behavior, Not Implementation

**Good:**
```typescript
it("should authenticate user with valid credentials", async () => {
  const result = await login("user@example.com", "password");
  expect(result.success).toBe(true);
});
```

**Bad:**
```typescript
it("should call hashPassword function", () => {
  // Testing internal implementation details
});
```

### 2. One Assertion Per Test

Each test should verify one specific behavior:

```typescript
// Good
it("should return user data when login succeeds", () => {
  const result = login(validCredentials);
  expect(result.user).toBeDefined();
});

it("should set authenticated status when login succeeds", () => {
  const result = login(validCredentials);
  expect(result.authenticated).toBe(true);
});

// Avoid: Testing multiple behaviors in one test
```

### 3. Use Descriptive Test Names

**Good:**
```typescript
it("should reject client creation when email is already in use")
it("should trim whitespace from client name before validation")
it("should verify webhook signature using HMAC SHA-256")
```

**Bad:**
```typescript
it("works")
it("test email")
it("should work correctly")
```

### 4. Test Edge Cases

Always test:
- Empty values
- Null/undefined
- Maximum/minimum values
- Special characters
- Unicode characters
- Very long strings
- Concurrent operations

### 5. Avoid Test Interdependence

Each test should be independent and able to run in isolation:

```typescript
// Good: Each test creates its own data
describe("userService", () => {
  it("should create user", () => {
    const user = createUser({ name: "Test" });
    expect(user).toBeDefined();
  });

  it("should update user", () => {
    const user = createUser({ name: "Test" });
    const updated = updateUser(user.id, { name: "Updated" });
    expect(updated.name).toBe("Updated");
  });
});

// Bad: Tests depend on each other
let userId;
it("should create user", () => {
  userId = createUser({ name: "Test" }).id;
});
it("should update user", () => {
  updateUser(userId, { name: "Updated" }); // Depends on previous test
});
```

## Validation Testing

### Schema Validation Tests

Test all validation rules defined in Zod schemas:

```typescript
describe("clientSchema", () => {
  // Test valid inputs
  describe("valid data", () => {
    it("should accept all required fields", () => {
      const result = clientSchema.safeParse({
        name: "John Doe",
        email: "john@example.com",
      });
      expect(result.success).toBe(true);
    });
  });

  // Test invalid inputs
  describe("invalid data", () => {
    it("should reject invalid email format", () => {
      const result = clientSchema.safeParse({
        name: "John Doe",
        email: "invalid-email",
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain("email");
      }
    });
  });

  // Test transformations
  describe("transformations", () => {
    it("should trim whitespace from strings", () => {
      const result = clientSchema.safeParse({
        name: "  John Doe  ",
        email: "john@example.com",
      });
      expect(result.data?.name).toBe("John Doe");
    });
  });
});
```

## Security Testing

### Webhook Signature Verification

Test cryptographic operations thoroughly:

```typescript
describe("verifyWebhookSignature", () => {
  const testSecret = "test-secret";
  const testPayload = JSON.stringify({ event: "test" });

  function generateSignature(payload: string, secret: string): string {
    return crypto.createHmac("sha256", secret)
      .update(payload)
      .digest("hex");
  }

  it("should verify correct signature", () => {
    const signature = generateSignature(testPayload, testSecret);
    const result = verifyWebhookSignature(testPayload, signature, testSecret);
    expect(result).toBe(true);
  });

  it("should reject tampered payload", () => {
    const signature = generateSignature(testPayload, testSecret);
    const tamperedPayload = testPayload + "malicious";
    const result = verifyWebhookSignature(tamperedPayload, signature, testSecret);
    expect(result).toBe(false);
  });

  it("should prevent timing attacks", () => {
    // Verify using timingSafeEqual for constant-time comparison
    const signature = generateSignature(testPayload, testSecret);
    const wrongSignature = "a".repeat(signature.length);

    expect(() => {
      verifyWebhookSignature(testPayload, wrongSignature, testSecret);
    }).not.toThrow();
  });
});
```

## Mocking

### Mocking External Dependencies

```typescript
import { vi } from "vitest";

describe("apiClient", () => {
  it("should handle fetch errors", async () => {
    const mockFetch = vi.fn().mockRejectedValue(new Error("Network error"));
    global.fetch = mockFetch;

    await expect(apiClient.get("/users")).rejects.toThrow("Network error");
  });
});
```

### Mocking Prisma

```typescript
import { vi } from "vitest";
import { prisma } from "@/lib/db";

vi.mock("@/lib/db", () => ({
  prisma: {
    client: {
      create: vi.fn(),
      findUnique: vi.fn(),
      findMany: vi.fn(),
    },
  },
}));

describe("clientService", () => {
  it("should create client", async () => {
    const mockClient = { id: "1", name: "Test", email: "test@example.com" };
    (prisma.client.create as any).mockResolvedValue(mockClient);

    const result = await createClient({ name: "Test", email: "test@example.com" });
    expect(result).toEqual(mockClient);
  });
});
```

## Testing Async Code

### Promises

```typescript
it("should handle async operations", async () => {
  const result = await fetchUser("123");
  expect(result.id).toBe("123");
});
```

### Error Handling

```typescript
it("should throw on invalid input", async () => {
  await expect(fetchUser("invalid")).rejects.toThrow("User not found");
});
```

## Test Data

### Test Fixtures

Create reusable test data:

```typescript
// tests/fixtures/clients.ts
export const validClient = {
  name: "John Doe",
  email: "john@example.com",
  phone: "+34 600 000 000",
  company: "Acme Inc",
  status: "ACTIVE" as const,
};

export const invalidClients = {
  missingEmail: {
    name: "John Doe",
  },
  invalidEmail: {
    name: "John Doe",
    email: "not-an-email",
  },
};
```

Usage:

```typescript
import { validClient, invalidClients } from "@/tests/fixtures/clients";

it("should validate valid client", () => {
  const result = clientSchema.safeParse(validClient);
  expect(result.success).toBe(true);
});
```

## Coverage Goals

- **Critical paths**: 90%+ coverage
- **Business logic**: 90%+ coverage
- **Utilities**: 80%+ coverage
- **UI Components**: 70%+ coverage
- **Generated code**: Can be excluded

### Checking Coverage

```bash
npm run test:coverage
```

This generates a coverage report in `coverage/` directory.

### Coverage Configuration

Configured in `vitest.config.ts`:

```typescript
export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'lib/generated/',
        '*.config.ts',
      ],
    },
  },
});
```

## Continuous Integration

Tests run automatically on:
- Every push to `main` branch
- Every pull request
- Before deployment

See `.github/workflows/ci.yml` for CI configuration.

## Debugging Tests

### Run in Debug Mode

```bash
NODE_OPTIONS='--inspect-brk' npx vitest --no-coverage
```

Then attach your debugger (VS Code, Chrome DevTools, etc.)

### Isolate Failing Tests

Use `.only` to run a single test:

```typescript
it.only("should test this specific case", () => {
  // This test will run in isolation
});
```

Use `.skip` to temporarily skip tests:

```typescript
it.skip("should test this later", () => {
  // This test will be skipped
});
```

## Common Patterns

### Testing Form Validation

```typescript
describe("ClientForm", () => {
  it("should display validation errors", async () => {
    const { getByLabelText, getByText, findByText } = render(<ClientForm />);

    const submitButton = getByText("Crear Cliente");
    fireEvent.click(submitButton);

    expect(await findByText("El nombre es requerido")).toBeInTheDocument();
  });
});
```

### Testing API Routes

```typescript
describe("POST /api/clients", () => {
  it("should create client with valid data", async () => {
    const response = await fetch("/api/clients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validClient),
    });

    expect(response.ok).toBe(true);
    const data = await response.json();
    expect(data.id).toBeDefined();
  });
});
```

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
- [Kent C. Dodds Testing Principles](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## Contact

For questions about testing:
- WhatsApp: +34 611 03 19 47

---

**Last Updated**: 2025-01-18
**Test Coverage**: 72 tests passing
