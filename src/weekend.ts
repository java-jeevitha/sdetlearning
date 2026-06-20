// src/weekend.ts
import {createUser,createAdminUser,createProduct,createOrder,fetchUser,getBaseUrl,logResult,formatDate,UserRole,OrderStatus,Environment,} from "./testData";

async function main(): Promise<void> {

  console.log("=== Creating test users ===");
  const regularUser = createUser();
  const adminUser = createAdminUser();
  console.log(`Regular: ${regularUser.email} | Role: ${regularUser.role}`);
  console.log(`Admin  : ${adminUser.email}   | Role: ${adminUser.role}`);

  console.log("\n=== Creating products ===");
  const laptop = createProduct({ name: "Laptop", price: 999 });
  const phone  = createProduct({ name: "Phone",  price: 499 });
  const tablet = createProduct({ name: "Tablet", price: 299, inStock: false });
  console.log(`${laptop.name}: $${laptop.price} | In stock: ${laptop.inStock}`);
  console.log(`${phone.name} : $${phone.price}  | In stock: ${phone.inStock}`);
  console.log(`${tablet.name}: $${tablet.price} | In stock: ${tablet.inStock}`);

  console.log("\n=== Creating order ===");
  const order = createOrder(regularUser, [laptop, phone]);
  console.log(`Order ID: ${order.orderId}`);
  console.log(`Total   : $${order.totalAmount}`);
  console.log(`Status  : ${order.status}`);
  console.log(`Date    : ${formatDate(order.createdAt)}`);

  console.log("\n=== Environment URLs ===");
  console.log(`DEV      : ${getBaseUrl(Environment.DEV)}`);
  console.log(`STAGING  : ${getBaseUrl(Environment.STAGING)}`);
  console.log(`PROD     : ${getBaseUrl(Environment.PRODUCTION)}`);

  console.log("\n=== Fetching real user ===");
  const fetchedUser = await fetchUser(1);
  if (fetchedUser) {
    console.log(`Fetched: ${fetchedUser.name} | ${fetchedUser.email}`);
  }

  console.log("\n=== Simulated test results ===");
  logResult("login_valid_user",     true,  980);
  logResult("login_wrong_password", true,  750);
  logResult("checkout_flow",        false, 5200);
  logResult("profile_update",       true,  430);
}

main();