function slowfunction():Promise<string>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve("data is ready")
        },3000)
    })

}
slowfunction().then(result=>{
    console.log(result)
})
// async — means this function will do something that takes time and the function will return a promise
async function getResult():Promise<void>{
     // await — means WAIT here until this finishes
    const result = await slowfunction();
    console.log(result)
}

getResult()

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

// fetch single User
async function getUser(userId:number):Promise<User>{
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
      const user:User = await response.json()
      return user
    
}

//fetch all post by user

async function getPostByUser(userId:number):Promise<Post[]>{
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    const post:Post[] = await response.json()
    return post
}

// always wrap API calls in try/catch
// because network calls CAN fail

async function getUserSafely(userId:number):Promise<User|null>{
    try{
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    
    if(!response.ok){
        console.log(`Error: server returned ${response.status}`);
      return null;

    }
        const user: User = await response.json();
    return user;
}
    catch(error){
    // this runs if network is down or fetch completely fails
    console.log("Network error:", error);
    return null;

    }

}

// WITHOUT Promise.all — slow, runs one by one
async function slowWay():Promise<void>{
    const user1 = await getUser(1)
    const user2 = await getUser(2)
    const user3 = await getUser(3)
}

// WITH Promise.all — fast, runs all at the same time

async function fastway():Promise<void>{
    const [user1,user2,user3] = await Promise.all([getUser(1),getUser(2),getUser(3)])
    console.log(user1.name, user2.name, user3.name);
}
// main function — always need one async function to start everything
async function main(): Promise<void> {

  console.log("=== Fetching single user ===");
  const user = await getUserSafely(1);
  if (user) {
    console.log(`Name  : ${user.name}`);
    console.log(`Email : ${user.email}`);
    console.log(`Handle: @${user.username}`);
  }

  console.log("\n=== Fetching posts by user ===");
  const posts = await getPostByUser(1);
  console.log(`Found ${posts.length} posts`);
  posts.slice(0, 3).forEach(post => {
    console.log(`  - ${post.title}`);
  });

  console.log("\n=== Fetching 3 users at once with Promise.all ===");
  const [u1, u2, u3] = await Promise.all([
    getUser(1),
    getUser(2),
    getUser(3),
  ]);
  console.log(`User 1: ${u1.name}`);
  console.log(`User 2: ${u2.name}`);
  console.log(`User 3: ${u3.name}`);

  console.log("\n=== Testing error handling ===");
  const badUser = await getUserSafely(9999); // user that doesn't exist
  if (!badUser) {
    console.log("Correctly handled missing user");
  }
}


main();