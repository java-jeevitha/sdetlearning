// src/testData.ts
// This is a REAL file you will reuse in your Playwright framework

// -----------------------------------------------
// PART 1 — all your interfaces in one place
// -----------------------------------------------

export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  password: string;
  role: UserRole;
}

export interface Address {
  street: string;
  city: string;
  zipCode: string;
  country: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}

export interface Order {
  orderId: string;
  user: User;
  products: Product[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: Date;
}

export interface ApiResponse<T> {
  status: number;
  message: string;
  success: boolean;
  data?: T;
}

// -----------------------------------------------
// PART 2 — enums
// -----------------------------------------------

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
  GUEST = "guest",
}

export enum OrderStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
}

export enum Environment {
  DEV = "dev",
  STAGING = "staging",
  PRODUCTION = "production",
}

// -----------------------------------------------
// PART 3 — factory functions (create test data)
// -----------------------------------------------

// generates unique email every time
export function generateEmail(name: string): string {
  const timestamp = Date.now();
  return `${name}_${timestamp}@testmail.com`;
}

// creates a test user object
export function createUser(role: UserRole = UserRole.USER): User {
  const timestamp = Date.now();
  return {
    id: randomInt(1, 9999),
    name: "Test User",
    email: generateEmail("testuser"),
    username: `testuser_${timestamp}`,
    password: "Test@123",
    role,
  };
}

// creates an admin user
export function createAdminUser(): User {
  return {
    ...createUser(UserRole.ADMIN),
    name: "Admin User",
    email: generateEmail("admin"),
    username: "admin_user",
    password: "Admin@123",
  };
}

// creates a product object
export function createProduct(overrides?: Partial<Product>): Product {
  return {
    id: randomInt(1, 9999),
    name: "Test Product",
    price: randomInt(10, 500),
    category: "electronics",
    inStock: true,
    ...overrides, // allow overriding any field
  };
}

// creates an order object
export function createOrder(user: User, products: Product[]): Order {
  const total = products.reduce((sum, p) => sum + p.price, 0);
  return {
    orderId: `ORD_${Date.now()}`,
    user,
    products,
    totalAmount: total,
    status: OrderStatus.PENDING,
    createdAt: new Date(),
  };
}

// -----------------------------------------------
// PART 4 — helper functions
// -----------------------------------------------

export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function formatDate(date: Date): string|undefined {
  return date.toISOString().split("T")[0];
}

export function getBaseUrl(env: Environment): string {
  if (env === Environment.DEV) return "https://dev.myapp.com";
  if (env === Environment.STAGING) return "https://staging.myapp.com";
  return "https://myapp.com";
}

export function parseStatus(code: number): string {
  if (code === 200) return "OK";
  if (code === 201) return "Created";
  if (code === 400) return "Bad Request";
  if (code === 401) return "Unauthorized";
  if (code === 404) return "Not Found";
  if (code === 500) return "Server Error";
  return "Unknown";
}

export function logResult(
  testName: string,
  passed: boolean,
  duration: number
): void {
  const icon = passed ? "✓" : "✗";
  const status = passed ? "PASS" : "FAIL";
  console.log(`${icon} [${status}] ${testName.padEnd(30)} ${duration}ms`);
}

// -----------------------------------------------
// PART 5 — async fetch helpers
// -----------------------------------------------

export async function fetchUser(userId: number): Promise<User | null> {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    if (!response.ok) return null;
    const data = await response.json();
    // map API response to our User interface
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      username: data.username,
      password: "Test@123",
      role: UserRole.USER,
    };
  } catch {
    return null;
  }
}