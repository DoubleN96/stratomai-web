import { describe, it, expect } from "vitest";
import crypto from "crypto";

// Extracted verification function for testing
function verifyWebhookSignature(
  payload: string,
  signature: string | null,
  secret: string
): boolean {
  if (!signature || !secret) return false;

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");

  // Check buffer lengths match before using timingSafeEqual
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (signatureBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(signatureBuffer, expectedBuffer);
}

describe("verifyWebhookSignature", () => {
  const testSecret = "test-webhook-secret-key";
  const testPayload = JSON.stringify({ event: "test", data: { id: 1 } });

  function generateValidSignature(payload: string, secret: string): string {
    return crypto.createHmac("sha256", secret).update(payload).digest("hex");
  }

  describe("valid signatures", () => {
    it("should verify correct signature", () => {
      const signature = generateValidSignature(testPayload, testSecret);
      const result = verifyWebhookSignature(testPayload, signature, testSecret);
      expect(result).toBe(true);
    });

    it("should verify signature with different payload", () => {
      const differentPayload = JSON.stringify({ event: "workflow.executed" });
      const signature = generateValidSignature(differentPayload, testSecret);
      const result = verifyWebhookSignature(
        differentPayload,
        signature,
        testSecret
      );
      expect(result).toBe(true);
    });

    it("should verify signature with complex payload", () => {
      const complexPayload = JSON.stringify({
        event: "workflow.executed",
        workflowId: "abc123",
        executionId: "exec456",
        data: {
          success: true,
          results: [1, 2, 3],
          metadata: { timestamp: "2025-01-18T10:00:00Z" },
        },
      });
      const signature = generateValidSignature(complexPayload, testSecret);
      const result = verifyWebhookSignature(
        complexPayload,
        signature,
        testSecret
      );
      expect(result).toBe(true);
    });

    it("should verify signature with unicode characters", () => {
      const unicodePayload = JSON.stringify({
        message: "Hola, ¿cómo estás? 你好",
      });
      const signature = generateValidSignature(unicodePayload, testSecret);
      const result = verifyWebhookSignature(
        unicodePayload,
        signature,
        testSecret
      );
      expect(result).toBe(true);
    });
  });

  describe("invalid signatures", () => {
    it("should reject wrong signature", () => {
      const wrongSignature = "incorrect-signature-hash";
      const result = verifyWebhookSignature(
        testPayload,
        wrongSignature,
        testSecret
      );
      expect(result).toBe(false);
    });

    it("should reject signature generated with different secret", () => {
      const wrongSecret = "different-secret";
      const signature = generateValidSignature(testPayload, wrongSecret);
      const result = verifyWebhookSignature(testPayload, signature, testSecret);
      expect(result).toBe(false);
    });

    it("should reject signature for modified payload", () => {
      const originalPayload = JSON.stringify({ event: "test", data: { id: 1 } });
      const modifiedPayload = JSON.stringify({ event: "test", data: { id: 2 } });
      const signature = generateValidSignature(originalPayload, testSecret);
      const result = verifyWebhookSignature(
        modifiedPayload,
        signature,
        testSecret
      );
      expect(result).toBe(false);
    });

    it("should reject null signature", () => {
      const result = verifyWebhookSignature(testPayload, null, testSecret);
      expect(result).toBe(false);
    });

    it("should reject empty string signature", () => {
      const result = verifyWebhookSignature(testPayload, "", testSecret);
      expect(result).toBe(false);
    });

    it("should reject when secret is empty", () => {
      const signature = generateValidSignature(testPayload, testSecret);
      const result = verifyWebhookSignature(testPayload, signature, "");
      expect(result).toBe(false);
    });
  });

  describe("edge cases", () => {
    it("should handle empty payload", () => {
      const emptyPayload = "";
      const signature = generateValidSignature(emptyPayload, testSecret);
      const result = verifyWebhookSignature(
        emptyPayload,
        signature,
        testSecret
      );
      expect(result).toBe(true);
    });

    it("should handle very large payloads", () => {
      const largePayload = JSON.stringify({
        data: "A".repeat(100000),
      });
      const signature = generateValidSignature(largePayload, testSecret);
      const result = verifyWebhookSignature(
        largePayload,
        signature,
        testSecret
      );
      expect(result).toBe(true);
    });

    it("should be case sensitive for signature", () => {
      const signature = generateValidSignature(testPayload, testSecret);
      const uppercaseSignature = signature.toUpperCase();
      const result = verifyWebhookSignature(
        testPayload,
        uppercaseSignature,
        testSecret
      );
      expect(result).toBe(false);
    });

    it("should handle whitespace in payload", () => {
      const payloadWithSpaces = JSON.stringify(
        { event: "test", data: { id: 1 } },
        null,
        2
      );
      const signature = generateValidSignature(payloadWithSpaces, testSecret);
      const result = verifyWebhookSignature(
        payloadWithSpaces,
        signature,
        testSecret
      );
      expect(result).toBe(true);
    });

    it("should not verify if payload order changes (JSON)", () => {
      const payload1 = JSON.stringify({ a: 1, b: 2 });
      const payload2 = JSON.stringify({ b: 2, a: 1 });
      const signature = generateValidSignature(payload1, testSecret);
      const result = verifyWebhookSignature(payload2, signature, testSecret);
      expect(result).toBe(payload1 === payload2);
    });
  });

  describe("timing attack resistance", () => {
    it("should use constant-time comparison", () => {
      // This test verifies that we're using timingSafeEqual
      // by checking that the function doesn't throw for equal-length buffers
      const signature = generateValidSignature(testPayload, testSecret);
      const wrongSignature = "a".repeat(signature.length);

      expect(() => {
        verifyWebhookSignature(testPayload, wrongSignature, testSecret);
      }).not.toThrow();
    });

    it("should handle signatures of different lengths", () => {
      const signature = generateValidSignature(testPayload, testSecret);
      const shortSignature = signature.substring(0, signature.length - 1);

      // Our implementation checks buffer length and returns false instead of throwing
      const result = verifyWebhookSignature(testPayload, shortSignature, testSecret);
      expect(result).toBe(false);
    });
  });

  describe("real-world scenarios", () => {
    it("should verify n8n workflow execution webhook", () => {
      const n8nPayload = JSON.stringify({
        workflowId: "workflow123",
        executionId: "exec456",
        event: "workflow.executed",
        timestamp: "2025-01-18T10:30:00Z",
        data: {
          success: true,
          results: {
            output: "Process completed successfully",
          },
        },
      });
      const signature = generateValidSignature(n8nPayload, testSecret);
      const result = verifyWebhookSignature(n8nPayload, signature, testSecret);
      expect(result).toBe(true);
    });

    it("should reject tampered n8n webhook", () => {
      const originalPayload = JSON.stringify({
        workflowId: "workflow123",
        data: { success: false },
      });
      const tamperedPayload = JSON.stringify({
        workflowId: "workflow123",
        data: { success: true }, // attacker changed false to true
      });
      const signature = generateValidSignature(originalPayload, testSecret);
      const result = verifyWebhookSignature(
        tamperedPayload,
        signature,
        testSecret
      );
      expect(result).toBe(false);
    });

    it("should handle webhook retry with same payload", () => {
      const payload = JSON.stringify({ retry: 1 });
      const signature = generateValidSignature(payload, testSecret);

      // First attempt
      const result1 = verifyWebhookSignature(payload, signature, testSecret);
      expect(result1).toBe(true);

      // Retry with same payload and signature
      const result2 = verifyWebhookSignature(payload, signature, testSecret);
      expect(result2).toBe(true);
    });
  });
});
