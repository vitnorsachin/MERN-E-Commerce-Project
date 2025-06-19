export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    // TODO: we will not hardcoded server url
    const response = await fetch("http://localhost:8080/products?");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductsByFilters(filter, sort, pagination) {
  // filter = {"category":["smarphone"]}
  // sort = {_sort:"-price"}
  // pagination = {_page:1,_limit=10}
  // pagination = {_page=4&_per_page=9}

  // TODO : on server we will support multiple values
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

  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/products?${queryString}`);
    const result = await response.json();
    const totalItems = result.items;
    resolve({ data: {products: result.data, totalItems: +totalItems }});
  });
}