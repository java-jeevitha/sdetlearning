// --- Enums ---
// Use enums when a value can only be one of a fixed set of options
enum TestStatus{
    PASS = "PASS",
    FAIL = "FAIL",
    SKIP = "SKIP",
    PENDING = "PENDING"

}
enum Browser{
    CHROMIUM = "chromium",
    FIREFOX = "firefox",
    WEBKIT = "webkit"
}

enum HttpStatus  {
    OK = '200',
    CREATED = '201',
    BAD_REQUEST = '400',
    UNAUTHORIZED = '401',
    NOT_FOUND ='404',
    SERVER_ERROR = '500'
}

// --- Union types ---
// Use unions when a value can be one of several types

type StringOrNumber = string | number;
type NullableString = string | null;
type Environment = "dev" | "staging" | "production";

interface TestResult {
    testName:string,
    status: TestStatus
    browser: Browser
    duration: number,
    errorMessage: string|null
}
interface apiResponse{
    status: HttpStatus,
    message: string,
    data?: unknown
}

const result1 : TestResult = {
    testName : "login_valid_user",
    status : TestStatus.PASS,
    browser: Browser.CHROMIUM,
    duration : 50,
    errorMessage: null

}

const result2 : TestResult = {
    testName : "checkout_flow",
    status : TestStatus.FAIL,
    browser : Browser.FIREFOX,
    duration : 100,
    errorMessage : "CHECK OUT FAILED"
}

const result3: TestResult = {
  testName: "profile_update",
  status: TestStatus.SKIP,
  browser: Browser.WEBKIT,
  duration: 0,
  errorMessage: null,
};

// --- Type narrowing ---
// Narrowing = checking the type before using it

function printErrorMessage (message: string|null):void{
  if (message === null) {
    // inside this block TypeScript KNOWS it's null
    console.log("  No error — test passed cleanly");
  } else {
    // inside this block TypeScript KNOWS it's a string
    console.log(`  Error: ${message.toUpperCase()}`);
  }
}
function getStatusIcon(status: TestStatus): string {
  if (status === TestStatus.PASS) return "✓";
  if (status === TestStatus.FAIL) return "✗";
  if (status === TestStatus.SKIP) return "−";
  return "?";
}

function isSuccessResponse(response: apiResponse): boolean {
  // type narrowing on HttpStatus enum
  return response.status === HttpStatus.OK ||
         response.status === HttpStatus.CREATED;
}
function PrintResult(result : TestResult):void{
    const icon = getStatusIcon(result.status)
    console.log(`${icon} ${result.testName.padEnd(25)} [${result.browser}] ${result.duration}ms`);
    printErrorMessage(result.errorMessage)
}

// --- String literal union in action ---
function getBaseUrl(env: Environment): string {
  if (env === "dev") return "https://dev.myapp.com";
  if (env === "staging") return "https://staging.myapp.com";
  return "https://myapp.com";  // production
}


// --- Run everything ---
const allResults: TestResult[] = [result1, result2, result3];

console.log("=== Test Results ===\n");
allResults.forEach(PrintResult);

const passed = allResults.filter(r => r.status === TestStatus.PASS).length;
const failed = allResults.filter(r => r.status === TestStatus.FAIL).length;
const skipped = allResults.filter(r => r.status === TestStatus.SKIP).length;

console.log(`\nSummary: ${passed} passed | ${failed} failed | ${skipped} skipped`);

console.log("\n=== Environments ===");
const envs: Environment[] = ["dev", "staging", "production"];
envs.forEach(env => {
  console.log(`${env}: ${getBaseUrl(env)}`);
});

console.log("\n=== API Responses ===");
const responses: apiResponse[] = [
  { status: HttpStatus.OK, message: "Login successful" },
  { status: HttpStatus.UNAUTHORIZED, message: "Invalid token" },
  { status: HttpStatus.NOT_FOUND, message: "User not found" },
];
responses.forEach(r => {
  const result = isSuccessResponse(r) ? "✓ success" : "✗ failed";
  console.log(`[${r.status}] ${result} — ${r.message}`);
});




