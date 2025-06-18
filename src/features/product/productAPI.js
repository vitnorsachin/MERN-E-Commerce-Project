export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    // TODO: we will not hardcoded server url
    const response = await fetch("http://localhost:8080/products");
    const data = await response.json();
    resolve({ data });
  });
}


export function fetchProductsByFilters(filter) {
  // filter = {"category":"smarphone"}
  // TODO : on server we will support multiple values
  let queryString = "";
  for (let key in filter) {
    queryString += `${key}=${filter[key]}&`;
  }
  return new Promise(async (resolve) => {
    // TODO: we will not hardcoded server url
    const response = await fetch(
      "http://localhost:8080/products?" + queryString
    );
    const data = await response.json();
    resolve({ data });
  });
}
