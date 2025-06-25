export function createUser(userData) {
  return new Promise(async (resolve) => {
    // 🟢 This mockapi is not reload page becase it's remote api this is not modify any vite application file
    // const response = await fetch("https://685b782c89952852c2d9a0af.mockapi.io/users", {

    // 🟢 Hot reloading hot model replcement(HMR) funciton create a problem of reload page i.e in viteConfige file add [watch] and [ignore]
    const response = await fetch("http://localhost:8080/users", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    resolve(data);
  });
}

export function checkUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    const email = loginInfo.email;
    const password = loginInfo.password;
    const response = await fetch("http://localhost:8080/users?email=" + email);
    const data = await response.json();
    if (data.length) {
      if (password === data[0].password) {
        console.log(data);
        resolve({ data: data[0] });
      } else {
        reject({ message: "Wrong credentials" });
      }
    } else {
      reject({ message: "User not found" });
    }
  });
}




// import axios from "axios";
// export const createUser = async (userData) => {
//   const { data } = await axios.post("http://localhost:8080/users", userData);
//   return data;
// };

// export const getUser = async () => {
//   const { data } = await axios.get("http://localhost:8080/users");
//   return data;
// };
