import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import {
  deleteItemFromCartAsync,
  selectCartStatus,
  selectItems,
  updateCartAsync,
} from "../cart/cartSlice";
import { ArrowRightIcon } from "@heroicons/react/16/solid";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { discountedPrice } from "../../app/constants";
import { GridLoader } from "react-spinners";
import Modal from "../common/Modal";

export function Cart() {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  // console.log(items)
  const status = useSelector(selectCartStatus);
  const [openModal, setOpenModal] = useState(null);

  let totalAmount = items.reduce(
    (amount, item) => discountedPrice(item.product) * item.quantity + amount,
    0
  );
  totalAmount = totalAmount.toFixed(2);
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);

  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({ id: item.id, quantity: +e.target.value }));
  };

  const handleRemove = (e, id) => {
    dispatch(deleteItemFromCartAsync(id));
  };

  return (
    <>
      {/* {!items.length && <Navigate to="/" replace={true}></Navigate>} */}
      {!items.length ? (
        <div className="text-center py-20">
          <div className="flex justify-center mb-4">
            <ShoppingCartIcon className="h-20 w-20 text-gray-500" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-700">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mt-2">
            Looks like you haven't added anything yet.
          </p>
          <Link
            to="/"
            className="mt-4 inline-block text-indigo-600 hover:text-indigo-500 font-medium"
          >
            Continue Shopping
            <ArrowRightIcon className="inline h-5 w-5 ml-1" />
          </Link>
        </div>
      ) : (
        <div>
          {status === "loading" ? (
            <div className="col-span-2 mt-20 flex justify-center items-center w-full">
              <GridLoader
                color="#4639fa"
                loading={true}
                margin={10}
                size={25}
                speedMultiplier={2}
              />
            </div>
          ) : (
            <div className="rounded-xl shadow-md mx-auto bg-white max-w-7xl px-4 sm:px-6 lg:px-6">
              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
                  Cart
                </h1>
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {items.map((item) => (                      
                      <li key={item.product.id} className="flex py-6">
                        {/* {console.log(item)} */}
                        <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={item.product.thumbnail}
                            alt={item.product.title}
                            className="size-full object-cover"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a href={item.product.id}>
                                  {item.product.title}
                                </a>
                              </h3>
                              <p className="ml-4">
                                ${discountedPrice(item.product)}
                              </p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {item.product.brand}
                            </p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="text-gray-500">
                              <label
                                htmlFor="email"
                                className="inline mr-4 text-sm/6 font-medium text-gray-900"
                              >
                                Qty
                              </label>
                              <select
                                className="border-2 rounded"
                                onChange={(e) => handleQuantity(e, item)}
                                value={item.quantity}
                              >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                              </select>
                            </div>

                            <div className="flex">
                              <Modal
                                title={
                                  <>
                                    Delete Item :{" "}
                                    <span style={{ color: "red" }}>
                                      "{item.product.title}"
                                    </span>
                                  </>
                                }
                                message="Are you sure you want to delete this cart items?"
                                dangerOption="Delete"
                                cancelOption="Cancel"
                                dangerAction={(e) => handleRemove(e, item.id)}
                                cancelAction={() => setOpenModal(null)}
                                showModal={openModal === item.id}
                              ></Modal>
                              <button
                                type="button"
                                className="border px-2 py-1 rounded-md cursor-pointer font-medium text-indigo-600 hover:text-indigo-500"
                                onClick={() => setOpenModal(item.id)}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="m-2 flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>${totalAmount}</p>
                </div>
                <div className="m-2 flex justify-between text-base font-medium text-gray-900">
                  <p>Total Items in Cart</p>
                  <p>{totalItems} Items</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-6">
                  <Link
                    to="/checkout"
                    className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700"
                  >
                    Checkout
                  </Link>
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <p>
                    or{" "}
                    <Link to="/">
                      <button
                        type="button"
                        className="ml-2 font-bold text-[16px] text-indigo-600 hover:text-indigo-500 cursor-pointer"
                      >
                        Continue Shopping
                        <ArrowRightIcon className="inline h-5 w-8 text-black size-2" />
                      </button>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}