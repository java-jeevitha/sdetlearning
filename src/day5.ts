function add(a:number,b:number):number{
    return a+b
}
function printMessgae(message:string):string{
    return message
}

const multiply = (a:number,b:number)=>a*b

console.log(add(3,3))
console.log("Hello I am typescript")
console.log(multiply(5,5))

function greeetUser(name:string,role?:string){
    if(role){
        console.log(`Hi ${name} you are logged in as ${role}`)
    }
    else{
        console.log(`Hi ${name}`)
    }
}

greeetUser('Jeevitha')
greeetUser('Jeevitha','admin')

// default param — has a default value if not passed

function createUrl(path:string,env:string = "staging"):string{
    return `https://${env}.myapp.com/${path}`;

}

console.log(createUrl("login"));
console.log(createUrl("login", "dev")); 

// helper 1 — format a date for test reports
function formatDate(date:Date):string|undefined{
    return date.toISOString().split("T")[0];
}

// helper 2 — generate a unique test email
function generateEmail(name:string){
    const timeStamp = Date.now()
     return `${name}_${timeStamp}@testmail.com`;
}
// helper 3 — generate random number between min and max
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function parseStatus(statusCode: number): string {
  if (statusCode === 200) return "OK";
  if (statusCode === 201) return "Created";
  if (statusCode === 400) return "Bad Request";
  if (statusCode === 401) return "Unauthorized";
  if (statusCode === 404) return "Not Found";
  if (statusCode === 500) return "Server Error";
  return "Unknown Status";
}
// helper 5 — wait for ms milliseconds (you will use this in Playwright)
function waitMs(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
// helper 6 — log test result cleanly
function logResult(testName: string, passed: boolean, duration: number): void {
  const icon = passed ? "✓" : "✗";
  const status = passed ? "PASS" : "FAIL";
  console.log(`${icon} [${status}] ${testName.padEnd(30)} ${duration}ms`);
}

// you can store a function in a variable with a type
type stringFormatter = (input : string) => string

const toUpperCase: stringFormatter = (input) => input.toUpperCase();
const toLowerCase: stringFormatter = (input) => input.toLowerCase();
const trimSpaces: stringFormatter  = (input) => input.trim();

// you can pass functions as parameters
function formatTestName(name: string, formatter: stringFormatter): string {
  return formatter(name);
}

console.log(formatTestName("  login Test  ", trimSpaces));  
console.log(formatTestName("login test", toUpperCase));

interface ApiUser {
  id: number;
  name: string;
  email: string;
}

// async function with typed return
async function fetchUser(userId: number): Promise<ApiUser | null> {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    if (!response.ok) return null;
    const user: ApiUser = await response.json();
    return user;
  } catch {
    return null;
  }
}

// async function that returns void
async function printUserDetails(userId: number): Promise<void> {
  const user = await fetchUser(userId);
  if (user) {
    console.log(`Name : ${user.name}`);
    console.log(`Email: ${user.email}`);
  } else {
    console.log(`User ${userId} not found`);
  }
}

async function main(): Promise<void> {

  console.log("=== Basic functions ===");
  console.log(add(10, 5));
  console.log(multiply(6, 7));
  console.log(createUrl("dashboard", "staging"));

  console.log("\n=== Test helpers ===");
  console.log("Date     :", formatDate(new Date()));
  console.log("Email    :", generateEmail("jeevitha"));
  console.log("RandomInt:", randomInt(1, 100));
  console.log("Status   :", parseStatus(404));

  console.log("\n=== Log results ===");
  logResult("login_valid_user",    true,  980);
  logResult("login_wrong_password",true,  750);
  logResult("checkout_flow",       false, 5200);
  logResult("profile_update",      true,  430);

  console.log("\n=== Wait example ===");
  console.log("waiting 1 second...");
  await waitMs(1000);
  console.log("done waiting!");

  console.log("\n=== Fetch user ===");
  await printUserDetails(1);
  await printUserDetails(9999); // invalid — tests error handling
}

main();



