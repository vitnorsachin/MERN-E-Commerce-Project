export function createOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/orders", {
      method: "POST",
      body: JSON.stringify(order),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function updateOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/orders/" + order.id, {
      method: "PATCH",
      body: JSON.stringify(order),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllOrders({ sort, pagination }) {
  let queryString = "";
  for(let key in sort){
    queryString += `${key}=${sort[key]}&`;
    // console.log("QueryString: ",queryString);
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
  return new Promise(async (resolve) => {
    // http://localhost:8080/orders?_sort=-id : sort id in desceding order(-id)
    const response = await fetch(`http://localhost:8080/orders?${queryString}`);
    const result = await response.json();
    resolve({ data: { orders: result.data, totalOrders: +result.items } });
  });
}