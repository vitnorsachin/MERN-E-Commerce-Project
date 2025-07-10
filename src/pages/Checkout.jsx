import { useDispatch, useSelector } from "react-redux";
import {
  deleteItemFromCartAsync,
  selectItems,
  updateCartAsync,
} from "../features/cart/cartSlice";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { updateUserAsync } from "../features/auth/authSlice";
import { useState } from "react";
import { ArrowRightIcon } from "@heroicons/react/16/solid";
import {
  createOrderAsync,
  selectCurrentOrder,
} from "../features/order/orderSlice";
import { selectUserInfo } from "../features/user/userSlice";
import NavBar from "../features/navbar/Navbar";
import { discountedPrice } from "../app/constants";

const Chekout = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const user = useSelector(selectUserInfo);
  const currentOrder = useSelector(selectCurrentOrder);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);

  const handleAddress = (e) => {
    // console.log(e.target.value);
    setSelectedAddress(user.addresses[e.target.value]);
  };

  const handlePayment = (e) => {
    // console.log(e.target.value);
    setPaymentMethod(e.target.value);
  };

  //🟢 Cart
  let totalAmount = items.reduce(
    (amount, item) => discountedPrice(item) * item.quantity + amount,
    0
  );
  totalAmount = parseFloat(totalAmount.toFixed(2));
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);

  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({ ...item, quantity: +e.target.value }));
  };

  const handleRemove = (e, id) => {
    dispatch(deleteItemFromCartAsync(id));
  };

  const handleOrder = () => {
    if (!selectedAddress || !paymentMethod) {
      alert("❌ Please enter or select an (Address) and choose a (Payment) method.");
      return; // 🔒 stops execution here
    }

    const order = {
      items,
      totalAmount,
      totalItems,
      user,
      paymentMethod,
      selectedAddress,
      status: "pending", // other status can be deliverd, received.
    };
    dispatch(createOrderAsync(order));
    //TODO : redirect to order-success page
    //TODO : clear cart after order
    //TODO : on server change the stock number of items
  };

  return (
    <>
      {!items.length && <Navigate to="/" replace={true}></Navigate>}
      {currentOrder && (
        <Navigate
          to={`/order-success/${currentOrder.id}`}
          replace={true}
        ></Navigate>
      )}
      <NavBar>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
          {/*🟢 Address Information */}
          <div className="lg:col-span-3">
            <form
              className="bg-white px-4 py-4 rounded-xl shadow-md"
              noValidate
              onSubmit={handleSubmit((data) => {
                // console.log(data);
                dispatch(
                  updateUserAsync({
                    ...user,
                    addresses: [...user.addresses, data],
                  })
                );
                reset();
              })}
            >
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-3xl font-semibold text-gray-900">
                    Personal Information
                  </h2>
                  <p className="mt-1 text-sm/6 text-gray-600">
                    Use a permanent address where you can receive mail.
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="name"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Full name
                      </label>
                      <div className="mt-2">
                        <input
                          id="name"
                          autoComplete="name"
                          {...register("name", {
                            required: "name is required",
                          })}
                          type="text"
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                        {errors.name && (
                          <p className="text-red-500 font-semibold text-[15px] w-full">
                            {errors.name.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          autoComplete="email"
                          type="email"
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value:
                                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                              message: "Please enter a valid email",
                            },
                          })}
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                        {errors.email && (
                          <p className="text-red-500 font-semibold text-[15px] w-full">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="phone"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Phone
                      </label>
                      <div className="mt-2">
                        <input
                          id="phone"
                          autoComplete="tel" // Changed from "phone" to "tel" for better browser compatibility
                          type="tel" // Important for mobile keyboards and accessibility
                          {...register("phone", {
                            required: "Phone number is required",
                            pattern: {
                              // Regex for a 10-digit number starting with 6, 7, 8, or 9
                              value: /^[6-9]\d{9}$/,
                              message:
                                "Please enter a valid 10-digit Indian mobile number",
                            },
                            minLength: {
                              value: 10,
                              message: "Phone number must be 10 digits",
                            },
                            maxLength: {
                              value: 10,
                              message: "Phone number must be 10 digits",
                            },
                          })}
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                        {errors.phone && (
                          <p className="text-red-500 font-semibold text-[15px] w-full">
                            {errors.phone.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="street"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Street address
                      </label>
                      <div className="mt-2">
                        <input
                          id="street"
                          autoComplete="street"
                          type="text"
                          {...register("street", {
                            required: "street is required",
                          })}
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="city"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          id="city"
                          autoComplete="city"
                          type="text"
                          {...register("city", {
                            required: "city is required",
                          })}
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="state"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        State / Province
                      </label>
                      <div className="mt-2">
                        <input
                          id="state"
                          autoComplete="state"
                          type="text"
                          {...register("state", {
                            required: "state is required",
                          })}
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="pinCode"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        ZIP / Postal code
                      </label>
                      <div className="mt-2">
                        <input
                          id="pinCode"
                          autoComplete="state"
                          type="text"
                          {...register("pinCode", {
                            required: "pinCode is required",
                          })}
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="button"
                    className="cursor-pointer border border-gray-400 rounded-md px-3 py-2 text-sm font-semibold shadow-xs hover:bg-gray-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => reset()}
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="cursor-pointer rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Save Address
                  </button>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base/7 font-semibold text-gray-900">
                    Address
                  </h2>
                  <p className="mt-1 text-sm/6 text-gray-600">
                    Choose from Existing address
                  </p>

                  <ul role="list">
                    {/* 🔴 Show message if no address exists */}
                    {user.addresses.length === 0 && (
                      <p className="mt-4 text-red-600 font-medium">
                        ⚠️ You haven’t added any address yet. Please fill the
                        form above to add one.
                      </p>
                    )}

                    {user.addresses.map((address, index) => (
                      <li
                        key={index}
                        className="flex justify-between gap-x-6 px-4 py-5 border-solid border-2 border-gray-200"
                      >
                        <div className="flex min-w-0 gap-x-4">
                          <input
                            onChange={handleAddress}
                            id="address"
                            name="address"
                            type="radio"
                            value={index}
                            required
                            className="cursor-pointer mt-2 relative size-4 appearance-none rounded-full border border-gray-600 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                          />
                          <div className="min-w-0 flex-auto">
                            <p className="text-sm/6 font-semibold text-gray-900">
                              {address.name}
                            </p>
                            <p className="mt-1 truncate text-xs/5 text-gray-500">
                              {address.street}
                            </p>
                          </div>
                        </div>
                        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                          <p className="text-sm/6 text-gray-900">
                            Phone : {address.phone}
                          </p>
                          <p className="text-sm/6 text-gray-500">
                            {address.state}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-10 space-y-10">
                    <fieldset>
                      <legend className="text-sm/6 font-semibold text-gray-900">
                        Payment Method
                      </legend>
                      <p className="mt-1 text-sm/6 text-gray-600">Choose One</p>
                      <div className="mt-6 space-y-6">
                        <div className="flex items-center gap-x-3">
                          <input
                            id="cash"
                            name="payments"
                            onChange={handlePayment}
                            value="cash"
                            type="radio"
                            checked={paymentMethod === "cash"}
                            required
                            className="cursor-pointer relative size-4 appearance-none rounded-full border border-gray-500 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                          />
                          <label
                            htmlFor="cash"
                            className="cursor-pointer block text-sm/6 font-medium text-gray-900"
                          >
                            Cash
                          </label>
                        </div>
                        <div className="flex items-center gap-x-3">
                          <input
                            id="card"
                            name="payments"
                            onChange={handlePayment}
                            checked={paymentMethod === "card"}
                            value="card"
                            type="radio"
                            required
                            className="cursor-pointer relative size-4 appearance-none rounded-full border border-gray-500 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                          />
                          <label
                            htmlFor="card"
                            className="cursor-pointer block text-sm/6 font-medium text-gray-900"
                          >
                            Card Payment
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/*🟢 Cart */}
          <div className="lg:col-span-2">
            <div className="mx-auto bg-white max-w-7xl px-1 sm:px-1 lg:px-1 rounded-xl shadow-md">
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
                              <p className="ml-4">${discountedPrice(item)}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {item.brand}
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

                <div
                  onClick={handleOrder}
                  className="cursor-pointer mt-6 flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700"
                >
                  Order Now
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
          </div>
        </div>
      </div>
      </NavBar>
    </>
  );
};
export default Chekout;