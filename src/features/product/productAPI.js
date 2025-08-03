export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products/" + id);
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductsByFilters(filter, sort, pagination, admin ) {
  // filter = {"category":["smarphone"]}
  // sort = {_sort:"-price"}
  // pagination = {_page:1,_limit=10}
  // pagination = {_page=4&_per_page=9}
  // TODO : on server we will support multiple values
  // TODO : Server will filter deleted products in case of non-admin
  let queryString = "";
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length) {
      const lastCategoryValue = categoryValues[categoryValues.length - 1];
      queryString += `${key}=${lastCategoryValue}&`;
    }
  }

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  if(admin){
    queryString += "admin=true"
  }

  return new Promise(async (resolve) => {
    // http://localhost:8080/products?_sort=-price : for price sort Descending order(-)sign
    // http://localhost:8080/products?_sort=price : for price sort Acending order
    try {

      // console.log("Query String: ",queryString);

      const response = await fetch(`http://localhost:8080/products?${queryString}`);
      const result = await response.json();
      const totalItems = result.items;

      // console.log("Result: ",result)

      resolve({ data: { products: result.data, totalItems: +totalItems } });
    } catch (error) {
      console.error(error);
    }
  });
}

export function fetchCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/categories");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/brands");
    const data = await response.json();
    resolve({ data });
  });
}

export function createProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products/", {
      method: "POST",
      body: JSON.stringify(product),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function updateProduct(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8080/products/" + update.id,
      {
        method: "PATCH",
        body: JSON.stringify(update),
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    resolve({ data });
  });
}