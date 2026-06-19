const browserName:string = "chromiun"
const Parallelworkers:number = 4
const testPassed:boolean = true
const errormessgae:string|null=null
const retryCount:number = 0
const testTag:string[] = ["smoke", "regression", "login"];
const statusCodes: number[] = [200, 201, 400, 401, 404, 500];
const checkboxStates: boolean[] = [true, false, true, true];
const testuser:{username:string,password:string} []=[ { username: "admin@test.com", password: "Admin@123" },
  { username: "user@test.com",  password: "User@456"  },
  { username: "guest@test.com", password: "Guest@789" },
]
const allTests: string[] = ["loginTest", "checkoutTest", "profileTest"];
allTests.push("paymentTest")
const first : string|undefined = allTests[0]
console.log(first)
const logNames:string[] = allTests.filter(t=>t.length>7)
console.log(logNames)
const upperCase:string[] = allTests.map(t=>t.toUpperCase())
console.log(upperCase)
const found:string[]|undefined = allTests.filter(t=>t.startsWith("login"))
console.log(found)
const envNames: string[] = ["dev", "staging", "prod"];
const retries: number[] = [1, 2, 3];
const tags: string[] = ["smoke", "regression"];
//Tuples
const testResult: [string, boolean, number] = ["loginTest", true, 1340];
const [name, passed, duration] = testResult;
console.log(`${name}: ${passed ? "PASS" : "FAIL"} in ${duration}ms`);
type Coordinate = [number, number];
const elementPosition: Coordinate = [320, 240];

type LoginRow = [string, string, boolean];
const loginScenarios: LoginRow[] = [
  ["admin@test.com",  "correct_pass",  true],
  ["admin@test.com",  "wrong_pass",    false],
  ["invalid_email",   "any_pass",      false],
];

type TestStep = [number, string, boolean];


const steps: TestStep[] = [
  [1, "Navigate to login page", true],
  [2, "Enter valid credentials", true],
  [3, "Click submit button",    true],
  [4, "Verify dashboard loads", false],
];

steps.forEach(([stepNum,desc,passed])=>{
    const status = passed?"PASS":"FAIL"
    console.log(`Step ${stepNum}: ${desc} — ${status}`);
})

type TestResult = [string,boolean,number]

const results: TestResult[] = [
  ["login_valid_user",    true,  980],
  ["login_wrong_pass",    true,  750],
  ["login_empty_fields",  true,  430],
  ["checkout_flow",       false, 5200],
];

results.forEach(([desc,passed,id])=>{
    let status = passed?"PASS":"FAIL"
    console.log(`id ${id} with ${desc} is ${status}`)
})
