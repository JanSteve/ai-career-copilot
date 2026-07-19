import assert from "node:assert";
import { generateAIResponse, RequiresApiCredentialsError } from "../services/ai";

async function runTests() {
  console.log("Running AI Engine Integration Tests...");
  
  delete process.env.OPENAI_API_KEY;
  delete process.env.GEMINI_API_KEY;
  delete process.env.ANTHROPIC_API_KEY;

  try {
    await generateAIResponse({
      systemPrompt: "Test System Prompt",
      userPrompt: "Test User Prompt",
    });
    assert.fail("Expected RequiresApiCredentialsError to be thrown when keys are unconfigured");
  } catch (err: any) {
    assert.strictEqual(
      err instanceof RequiresApiCredentialsError || err.name === "RequiresApiCredentialsError",
      true,
      "Should throw RequiresApiCredentialsError"
    );
    console.log("✓ Test passed: Throws RequiresApiCredentialsError when keys are unconfigured.");
  }
}

runTests().catch((e) => {
  console.error("Test failed:", e);
  process.exit(1);
});
