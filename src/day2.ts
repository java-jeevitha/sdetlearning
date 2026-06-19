interface User{
    username:string,
    password:string,
    role:string
}
// --- Optional properties (the ? means not required) ---

interface testConfig{
    browser:string,
    headless:boolean,
    timeout:number,
    baseUrl?:string
    retries?:number
}

// --- Readonly properties (can't be changed after creation) ---
interface Environment{
    readonly name:string,
    readonly apiUrl: string,
    isActive:boolean

}

interface ApiResponse{
    status:number,
    message:string,
    success:boolean,
    data?:unknown
}

const adminUser : User ={
    username:"admin123@gmail.com",
    password:"admin123",
    role:"Admin"
}
function printUser(user:User):void{
    console.log(`user ${user.username} passowrd ${user.password} role ${user.role}`)
}

const config : testConfig = {
    browser : "chrome",
    headless : true,
    timeout : 3500,
    baseUrl: "https://staging.myapp.com",
     // retries not set — that's fine because it's optional

}

function printEnvironmentDetails(TestConfig:testConfig):void{
    console.log(`browser ${TestConfig.browser}`)
    console.log(`headless ${TestConfig.headless} timeout${TestConfig.timeout}`)
    if(TestConfig.baseUrl){
        console.log(`Base url ${TestConfig.baseUrl}`)
    }
    if (config.retries) {
    console.log(`Retries: ${config.retries}`);
  }
   
}

const stagingEnv : Environment = {
  name: "staging",
  apiUrl: "https://api.staging.myapp.com",
  isActive: true,
};

function envdetails(environment:Environment ):void{
    console.log(`${environment.name},${environment.apiUrl},${environment.isActive}`)
}

// this will throw a TypeScript error — try it!
// stagingEnv.apiUrl = "sample url"

const loginSuccessResponse: ApiResponse = {
  status: 200,
  message: "Login successful",
  success: true,
  data: { token: "abc123xyz" },
};

const loginFailResponse: ApiResponse = {
  status: 401,
  message: "Invalid credentials",
  success: false,
  // data not set — fine because it's optional
};

function printApiResponse(response: ApiResponse): void {
  const status = response.success ? "SUCCESS" : "FAILED";
  console.log(`[${response.status}] ${status}: ${response.message}`);
}

// -----------------------------------------------
// Run everything
// -----------------------------------------------

console.log("=== Users ===");
printUser(adminUser);

console.log("\n=== Config ===");
printEnvironmentDetails(config);

console.log("\n=== API Responses ===");
printApiResponse(loginSuccessResponse);
printApiResponse(loginFailResponse);

console.log("\n=== Environment ===");
console.log(`Env: ${stagingEnv.name} | Active: ${stagingEnv.isActive}`);

console.log("\n === ENV ===")
envdetails(stagingEnv)

