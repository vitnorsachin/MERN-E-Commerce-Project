import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { ArrowRightIcon } from "@heroicons/react/20/solid";

import { Radio, RadioGroup } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchProductByIdAsync, selectedProductById } from "../productSlice";
import {
  addToCartAsync,
  resetItemStatus,
  selectItemStatus,
} from "../../cart/cartSlice";
import { selectLoggedInUser } from "../../auth/authSlice";

// TODO : In server data we will add colors, sizes, highlights etc. to each product
const colors = [
  { id: "white", name: "White", classes: "bg-white checked:outline-gray-400" },
  { id: "gray", name: "Gray", classes: "bg-gray-200 checked:outline-gray-400" },
  {
    id: "black",
    name: "Black",
    classes: "bg-gray-900 checked:outline-gray-900",
  },
];
const sizes = [
  { name: "XXS", inStock: false },
  { name: "XS", inStock: true },
  { name: "S", inStock: true },
  { name: "M", inStock: true },
  { name: "L", inStock: true },
  { name: "XL", inStock: true },
  { name: "2XL", inStock: true },
  { name: "3XL", inStock: true },
];
const highlights = [
  "Hand cut and sewn localy",
  "Dyed with our proprietory colors",
  "Pre-washed & pre-shrunk",
  "Ultra-soft 100% cotton",
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetail() {
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState(sizes[2]);
  const dispatch = useDispatch();
  const product = useSelector(selectedProductById);
  const user = useSelector(selectLoggedInUser);
  const params = useParams();

  const handleCart = (e) => {
    e.preventDefault();
    const newItem = { ...product, quantity: 1, user: user.id };
    delete newItem["id"];
    dispatch(addToCartAsync(newItem));
  };

  useEffect(() => {
    dispatch(fetchProductByIdAsync(params.id));
  }, [dispatch, params.id]);

  // logic for showing "Item added to cart" message
  const navigate = useNavigate();
  const itemStatus = useSelector(selectItemStatus);
  const [showMessage, setShowMessage] = useState(false);
  useEffect(() => {
    if (itemStatus === "success") {
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
        dispatch(resetItemStatus()); // ✅ reset Redux state
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [itemStatus]);

  return (
    <div className="bg-white">
      {product && (
        <div className="pt-6">
          {/* <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            {product.breadcrumbs &&
              product.breadcrumbs.map((breadcrumb) => (
                <li key={breadcrumb.id}>
                  <div className="flex items-center">
                    <a
                      href={breadcrumb.href}
                      className="mr-2 text-sm font-medium text-gray-900"
                    >
                      {breadcrumb.name}
                    </a>
                    <svg
                      fill="currentColor"
                      width={16}
                      height={20}
                      viewBox="0 0 16 20"
                      aria-hidden="true"
                      className="h-5 w-4 text-gray-300"
                    >
                      <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                    </svg>
                  </div>
                </li>
              ))}
            <li className="text-sm">
              <a
                href={product.href}
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {product.title}
              </a>
            </li>
          </ol>
        </nav> */}

          {/* Image gallery */}
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-8 lg:px-8">
            <img
              src={product.images[0]}
              alt={product.images.title}
              className="row-span-2 aspect-3/4 size-full rounded-lg object-cover "
            />
            <img
              src={product.images[1]}
              alt={product.images.title}
              className="col-start-2 aspect-3/2 size-full rounded-lg object-cover max-lg:hidden"
            />
            <img
              src={product.images[2]}
              alt={product.images.title}
              className="col-start-2 row-start-2 aspect-3/2 size-full rounded-lg object-cover max-lg:hidden"
            />
          </div>

          {/* Product info */}
          <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {product.title}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                ${product.price}
              </p>

              {/* Reviews */}
              <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        aria-hidden="true"
                        className={classNames(
                          product.rating > rating
                            ? "text-gray-900"
                            : "text-gray-200",
                          "size-5 shrink-0"
                        )}
                      />
                    ))}
                  </div>
                  <p className="sr-only">{product.rating} out of 5 stars</p>
                </div>
              </div>

              <form className="mt-10">
                {/* Colors */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Color</h3>
                  <fieldset aria-label="Choose a color" className="mt-4">
                    <div className="flex items-center gap-x-3">
                      {colors.map((option, optionIdx) => (
                        <div
                          key={optionIdx}
                          className="flex rounded-full outline -outline-offset-1 outline-black/10"
                        >
                          <input
                            defaultValue={option.id}
                            // defaultChecked={option.id === product.colors[0].id}
                            name="color-choice"
                            type="radio"
                            aria-label={option.name}
                            className={classNames(
                              option.classes,
                              "size-8 appearance-none rounded-full forced-color-adjust-none checked:outline-2 checked:outline-offset-2 focus-visible:outline-3 focus-visible:outline-offset-3"
                            )}
                          />
                        </div>
                      ))}
                    </div>
                  </fieldset>
                </div>

                {/* Sizes */}
                <div className="mt-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                    <a
                      href="#"
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Size guide
                    </a>
                  </div>

                  <fieldset aria-label="Choose a size" className="mt-4">
                    <RadioGroup
                      value={selectedSize}
                      onChange={setSelectedSize}
                      className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
                    >
                      {sizes.map((size) => (
                        <Radio
                          key={size.name}
                          value={size}
                          disabled={!size.inStock}
                          className={classNames(
                            size.inStock
                              ? "cursor-pointer bg-white text-gray-900 shadow-xs"
                              : "cursor-not-allowed bg-gray-50 text-gray-200",
                            "group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-hidden data-focus:ring-2 data-focus:ring-indigo-500 sm:flex-1 sm:py-6"
                          )}
                        >
                          <span>{size.name}</span>
                          {size.inStock ? (
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-checked:border-indigo-500 group-data-focus:border"
                            />
                          ) : (
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                            >
                              <svg
                                stroke="currentColor"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                                className="absolute inset-0 size-full stroke-2 text-gray-200"
                              >
                                <line
                                  x1={0}
                                  x2={100}
                                  y1={100}
                                  y2={0}
                                  vectorEffect="non-scaling-stroke"
                                />
                              </svg>
                            </span>
                          )}
                        </Radio>
                      ))}
                    </RadioGroup>
                  </fieldset>
                </div>

                {/* ✅ Item add to cart Success Message */}
                {showMessage && (
                  <div className="col-span-full">
                    <div className="my-8 rounded-md bg-green-100 p-3 border border-green-700 text-green-700 text-center font-medium">
                      ✅ Item added to your cart
                    </div>
                  </div>
                )}

                {/* <button
                  type="submit"
                  className="cursor-pointer mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
                  onClick={handleCart}
                >
                  Add to Cart
                </button>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <p>
                    <Link to="/">
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="ml-2 font-bold text-[16px] text-indigo-600 hover:text-indigo-500 cursor-pointer"
                      >
                        Continue Shopping
                        <ArrowRightIcon className="inline h-5 w-8 text-black size-2" />
                      </button>
                    </Link>
                  </p>
                </div>
                <button
                  type="submit"
                  className="cursor-pointer mt-5 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
                >
                  Go to Cart
                </button> */}

                <button
                  type="button"
                  onClick={handleCart}
                  className="cursor-pointer w-full mt-8 flex items-center justify-center rounded-md bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  🛒 Add to Cart
                </button>

                <div className="mt-6 flex justify-center text-sm text-gray-500">
                  <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="cursor-pointer text-[15px] my-2 inline-flex items-center gap-2 font-bold text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
                  >
                    Continue Shopping
                    <ArrowRightIcon className="h-5 w-5 text-indigo-600" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => navigate("/cart")}
                  className="cursor-pointer w-full mt-5 flex items-center justify-center rounded-md bg-gray-100 px-6 py-3 text-base font-semibold text-gray-800 shadow-sm hover:bg-gray-200 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400"
                >
                  🛍️ Go to Cart
                </button>
              </form>
            </div>

            {/* Description and details */}
            <div className="py-5 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16">
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Highlights
                </h3>

                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    {highlights.map((highlight) => (
                      <li key={highlight} className="text-gray-400">
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">{product.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}