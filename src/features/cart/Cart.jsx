import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteItemFromCartAsync,
  selectItems,
  updateCartAsync,
} from "../cart/cartSlice";
import { ArrowRightIcon } from "@heroicons/react/16/solid";

export function Cart() {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  let totalAmount = items.reduce(
    (amount, item) => item.price * item.quantity + amount,
    0
  );
  totalAmount = totalAmount.toFixed(2);
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);

  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({ ...item, quantity: +e.target.value }));
  };

  const handleRemove = (e, id) => {
    dispatch(deleteItemFromCartAsync(id));
  };

  return (
    <div className="mx-auto bg-white mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
          Cart
        </h1>
        <div className="flow-root">
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            {items.map((item) => (
              <li key={item.id} className="flex py-6">
                <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="size-full object-cover"
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <a href={item.href}>{item.title}</a>
                      </h3>
                      <p className="ml-4">${item.price}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{item.brand}</p>
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
                      <button
                        type="button"
                        className="cursor-pointer font-medium text-indigo-600 hover:text-indigo-500"
                        onClick={(e) => handleRemove(e, item.id)}
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
                onClick={() => setOpen(false)}
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
  );
}