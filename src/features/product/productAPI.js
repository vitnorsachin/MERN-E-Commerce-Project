export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    // TODO: we will not hardcoded server url
    const response = await fetch("http://localhost:8080/products");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductsByFilters(filter, sort) {
  // filter = {"category":["smarphone"]}
  // sort = {_sort:"-price"}

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

  // console.log(queryString);

  return new Promise(async (resolve) => {
    // TODO: we will not hardcoded server url
    const response = await fetch(
      "http://localhost:8080/products?" + queryString
    );
    const data = await response.json();
    resolve({ data });
  });
}