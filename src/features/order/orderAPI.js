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
    // http://localhost:8080/orders?_sort=-id             => sort id in desceding order(-id)
    // http://localhost:8080/orders?_page=1&_per_page=10  => pagination
    const response = await fetch(`http://localhost:8080/orders?${queryString}`);
    const result = await response.json();
    // console.log(result)
    resolve({ data: { orders: result.data, totalOrders: +result.items } });
  });
}