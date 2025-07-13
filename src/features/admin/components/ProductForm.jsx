import { useDispatch, useSelector } from "react-redux";
import {
  clearSelectedProduct,
  createProductAsync,
  fetchProductByIdAsync,
  selectBrands,
  selectCategories,
  selectedProductById,
  updateProductAsync,
} from "../../product/productSlice";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "../../common/Modal";

const ProductForm = () => {
  const navigate = useNavigate();
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const dispatch = useDispatch();
  const params = useParams();
  const selectedProduct = useSelector(selectedProductById);
  const [openModal, setOpenModal] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (params.id) {
      dispatch(fetchProductByIdAsync(params.id));
    } else {
      dispatch(clearSelectedProduct());
    }
  }, [dispatch, params.id]);

  useEffect(() => {
    if (selectedProduct && params.id) {
      setValue("title", selectedProduct.title);
      setValue("description", selectedProduct.description);
      setValue("category", selectedProduct.category);
      setValue("brand", selectedProduct.brand);
      setValue("price", selectedProduct.price);
      setValue("discountPercentage", selectedProduct.discountPercentage);
      setValue("stock", selectedProduct.stock);
      setValue("thumbnail", selectedProduct.thumbnail);
      setValue("image1", selectedProduct.images[0]);
      setValue("image2", selectedProduct.images[1]);
      setValue("image3", selectedProduct.images[2]);
      setValue("rating", selectedProduct.rating);
    }
  }, [selectedProduct, params.id, setValue]);

  const handleDelete = () => {
    const product = { ...selectedProduct };
    product.deleted = true;
    dispatch(updateProductAsync(product));
  };

  return (
    <>
      <form
        noValidate
        onSubmit={handleSubmit((data) => {
          const product = { ...data };
          product.images = [product.image1, product.image2, product.image3];
          product.price = +product.price;
          product.discountPercentage = +product.discountPercentage;
          product.stock = +product.stock;
          delete product["image1"];
          delete product["image2"];
          delete product["image3"];
          // console.log(product);
          if (params.id) {
            product.id = params.id;
            product.rating = selectedProduct?.rating ?? 0; // keep existing or fallback to 0
            dispatch(updateProductAsync(product));
            reset();
            navigate("/admin"); // ✅ navigate after update
          } else {
            product.rating = 0;
            dispatch(createProductAsync(product));
            reset();
            navigate("/admin"); // ✅ navigate after creation
          }
        })}
      >
        <div className="space-y-12 bg-white p-4 md:p-12 rounded-xl shadow-md">
          {selectedProduct?.deleted && (
            <p className="text-red-500 font-bold text-lg mb-6">
              This product is deleted
            </p>
          )}
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="bg-gray-100 px-2 text-xl font-semibold text-gray-900">
              Add Product
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="title"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Product Name
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white pl-1.5 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <input
                      id="title"
                      {...register("title", {
                        required: "product name is required",
                      })}
                      type="text"
                      className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none"
                    />
                  </div>
                  {errors.title && (
                    <p className="text-red-500 font-semibold text-[15px] w-full">
                      {errors.title.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    {...register("description", {
                      required: "description is required",
                    })}
                    rows={3}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    defaultValue={""}
                  />
                  {errors.description && (
                    <p className="text-red-500 font-semibold text-[15px] w-full">
                      {errors.description.message}
                    </p>
                  )}
                </div>
                <p className="mt-3 text-sm/6 text-gray-600">
                  Write a few sentences about Product.
                </p>
              </div>

              <div className="col-span-3">
                <label
                  htmlFor="category"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Categories
                </label>
                <div className="mt-2 flex gap-x-2">
                  <select
                    className="border rounded px-1 py-0.5"
                    {...register("category", {
                      required: "category is required",
                    })}
                  >
                    <option value="">Choose Category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="text-red-500 font-semibold text-[15px] w-full inline-block">
                      {errors.category.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="col-span-3">
                <label
                  htmlFor="brand"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Brand
                </label>
                <div className="mt-2 flex gap-x-3">
                  <select
                    className="border rounded px-1 py-0.5"
                    {...register("brand", {
                      required: "brand is required",
                    })}
                  >
                    <option value="">Choose Brand</option>
                    {brands.map((brand) => (
                      <option key={brand.id} value={brand.value}>
                        {brand.label}
                      </option>
                    ))}
                  </select>
                  {errors.brand && (
                    <p className="text-red-500 font-semibold text-[15px] w-full">
                      {errors.brand.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="col-span-2 mt-2">
                <label
                  htmlFor="price"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Price
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white pl-1.5 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <input
                      id="price"
                      {...register("price", {
                        required: "price is required",
                        min: 1,
                        max: 1000000,
                      })}
                      type="number"
                      className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none"
                    />
                  </div>
                  {errors.price && (
                    <p className="text-red-500 font-semibold text-[15px] w-full">
                      {errors.price.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="col-span-2 mt-2">
                <label
                  htmlFor="discountPercentage"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Discount
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white pl-1.5 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <input
                      id="discountPercentage"
                      {...register("discountPercentage", {
                        required: "discount percentage is required",
                        min: 1,
                        max: {
                          value: 100,
                          message:
                            "Maximum %percentage value is 100, enter bellow of 100",
                        },
                      })}
                      type="number"
                      className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none"
                    />
                  </div>
                  {errors.discountPercentage && (
                    <p className="text-red-500 font-semibold text-[15px] w-full">
                      {errors.discountPercentage.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="col-span-2 mt-2">
                <label
                  htmlFor="stock"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Stock
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white pl-1.5 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <input
                      id="stock"
                      {...register("stock", {
                        required: "stock is required",
                        min: -1,
                        max: 1000000,
                      })}
                      type="number"
                      className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none"
                    />
                  </div>
                  {errors.stock && (
                    <p className="text-red-500 font-semibold text-[15px] w-full">
                      {errors.stock.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="thumbnail"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Thumbnail
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white pl-1.5 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <input
                      id="thumbnail"
                      {...register("thumbnail", {
                        required: "thumbnail is required",
                      })}
                      type="text"
                      className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none"
                    />
                  </div>
                  {errors.thumbnail && (
                    <p className="text-red-500 font-semibold text-[15px] w-full">
                      {errors.thumbnail.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="image1"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Image 1
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white pl-1.5 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <input
                      id="image1"
                      {...register("image1", {
                        required: "image is required",
                      })}
                      type="text"
                      className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none"
                    />
                  </div>
                  {errors.image1 && (
                    <p className="text-red-500 font-semibold text-[15px] w-full">
                      {errors.image1.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="image2"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Image 2
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white pl-1.5 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <input
                      id="image2"
                      {...register("image2")}
                      type="text"
                      className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none"
                    />
                  </div>
                  {errors.image2 && (
                    <p className="text-red-500 font-semibold text-[15px] w-full">
                      {errors.image2.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="image3"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Image 3
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white pl-1.5 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <input
                      id="image3"
                      {...register("image3")}
                      type="text"
                      className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none"
                    />
                  </div>
                  {errors.image3 && (
                    <p className="text-red-500 font-semibold text-[15px] w-full">
                      {errors.image3.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 space-y-10">
              <fieldset>
                <legend className="text-sm/6 font-semibold text-gray-900">
                  By email
                </legend>
                <div className="mt-6 space-y-6">
                  <div className="flex gap-3">
                    <div className="flex h-6 shrink-0 items-center">
                      <div className="group grid size-4 grid-cols-1">
                        <input
                          defaultChecked
                          id="comments"
                          name="comments"
                          type="checkbox"
                          aria-describedby="comments-description"
                          className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                        />
                        <svg
                          fill="none"
                          viewBox="0 0 14 14"
                          className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                        >
                          <path
                            d="M3 8L6 11L11 3.5"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="opacity-0 group-has-checked:opacity-100"
                          />
                          <path
                            d="M3 7H11"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="opacity-0 group-has-indeterminate:opacity-100"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="text-sm/6">
                      <label
                        htmlFor="comments"
                        className="font-medium text-gray-900"
                      >
                        Comments
                      </label>
                      <p id="comments-description" className="text-gray-500">
                        Get notified when someones posts a comment on a posting.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex h-6 shrink-0 items-center">
                      <div className="group grid size-4 grid-cols-1">
                        <input
                          id="candidates"
                          name="candidates"
                          type="checkbox"
                          aria-describedby="candidates-description"
                          className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                        />
                        <svg
                          fill="none"
                          viewBox="0 0 14 14"
                          className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                        >
                          <path
                            d="M3 8L6 11L11 3.5"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="opacity-0 group-has-checked:opacity-100"
                          />
                          <path
                            d="M3 7H11"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="opacity-0 group-has-indeterminate:opacity-100"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="text-sm/6">
                      <label
                        htmlFor="candidates"
                        className="font-medium text-gray-900"
                      >
                        Candidates
                      </label>
                      <p id="candidates-description" className="text-gray-500">
                        Get notified when a candidate applies for a job.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex h-6 shrink-0 items-center">
                      <div className="group grid size-4 grid-cols-1">
                        <input
                          id="offers"
                          name="offers"
                          type="checkbox"
                          aria-describedby="offers-description"
                          className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                        />
                        <svg
                          fill="none"
                          viewBox="0 0 14 14"
                          className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                        >
                          <path
                            d="M3 8L6 11L11 3.5"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="opacity-0 group-has-checked:opacity-100"
                          />
                          <path
                            d="M3 7H11"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="opacity-0 group-has-indeterminate:opacity-100"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="text-sm/6">
                      <label
                        htmlFor="offers"
                        className="font-medium text-gray-900"
                      >
                        Offers
                      </label>
                      <p id="offers-description" className="text-gray-500">
                        Get notified when a candidate accepts or rejects an
                        offer.
                      </p>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            onClick={() => navigate("/admin")}
            className="cursor-pointer rounded-md px-3 py-2 text-sm font-semibold shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 bg-indigo-500 text-white border border-indigo-600 hover:bg-indigo-600"
          >
            Go back
          </button>

          <button
            type="button"
            onClick={() => reset()}
            className="cursor-pointer rounded-md px-3 py-2 text-sm font-semibold shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 bg-cyan-100 text-cyan-900 border border-cyan-300 hover:bg-cyan-200"
          >
            Reset
          </button>

          {selectedProduct && !selectedProduct?.deleted && (
            <button
              type="button"
              onClick={() => setOpenModal(true)}
              className="text-sm/6 font-semibold text-white cursor-pointer rounded-md bg-red-500 px-3 py-1.5 shadow-xs  hover:bg-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Delete
            </button>
          )}

          <button
            type="submit"
            className="cursor-pointer rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Save
          </button>
        </div>
      </form>
      <Modal
        title={
          <>
            Delete{" "}
            <span style={{ color: "green" }}>"{selectedProduct?.title}"</span>
          </>
        }
        message="Are you sure you want to delete this Products?"
        dangerOption="Delete"
        cancelOption="Cancel"
        dangerAction={handleDelete}
        cancelAction={() => setOpenModal(null)}
        showModal={openModal}
      ></Modal>
    </>
  );
};
export default ProductForm;