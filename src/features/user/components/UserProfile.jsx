import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo, updateUserAsync } from "../userSlice";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { PlusIcon } from "@heroicons/react/16/solid";
import Modal from "../../common/Modal";

export default function UserProfile() {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  // console.log(userInfo);
  const [selectedEditIndex, setSelectedEditIndex] = useState(-1);
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const [openModal, setOpenModal] = useState(null);
  

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const handleRemove = (e, index) => {
    const newUser = { ...userInfo, addresses: [...userInfo.addresses] }; // for shallow copy issue
    newUser.addresses.splice(index, 1); // remove address as given index
    dispatch(updateUserAsync(newUser)); // send newUser updated userInfo to
  };

  const handleEdit = (addressUpdate, index) => {
    const newUser = { ...userInfo, addresses: [...userInfo.addresses] };
    newUser.addresses.splice(index, 1, addressUpdate); // undestand this how splice works
    dispatch(updateUserAsync(newUser));
    setSelectedEditIndex(-1);
  };

  const handleEditForm = (index) => {
    setSelectedEditIndex(index);
    const address = userInfo.addresses[index];
    setValue("name", address.name);
    setValue("email", address.email);
    setValue("phone", address.phone);
    setValue("street", address.street);
    setValue("city", address.city);
    setValue("state", address.state);
    setValue("pinCode", address.pinCode);
  };

  const handleAdd = (address) => {
    const newUser = { ...userInfo, addresses: [...userInfo.addresses, address] }; // undestand this how it works
    dispatch(updateUserAsync(newUser));
    setShowAddAddressForm(false);
  };

  return (
    <>
      <h2 className="font-semibold text-2xl mb-4">My Profile</h2>
      <div className="mx-auto bg-white max-w-7xl px-4 sm:px-6 lg:px-10 rounded-xl shadow-md">
        <div className="border-t border-gray-200 py-6 sm:px-6">
          <h1 className="text-2xl my-5 font-bold tracking-tight text-gray-900">
            {/* Name : {userInfo.name ? userInfo.name : "Guest User"}🟡 update in future */}
            Name : {userInfo?.name || userInfo?.addresses?.[0]?.name || "Guest User"}
          </h1>
          <h3 className="mb-0 text-lg text-blue-500 my-5 font-bold tracking-tight">
            Email address : {userInfo.email}
          </h3>
          {userInfo.role === "admin" && (
            <h3 className="bg-amber-400 inline-block py-1 px-2 mb-0 text-lg my-5 font-bold tracking-tight">
              Role : {userInfo.role}
            </h3>
          )}
        </div>
        <div className="border-t border-gray-200 py-6 sm:px-6">
          <button
            type="button"
            onClick={(e) => {
              !showAddAddressForm
                ? setShowAddAddressForm(true)
                : setShowAddAddressForm(false);
              setSelectedEditIndex(-1);
            }}
            className="cursor-pointer mb-3 inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500 transition-shadow shadow-sm"
          >
            <PlusIcon className="h-5 w-5" /> Add New Address
          </button>

          {showAddAddressForm ? (
            <form
              className="bg-white px-4 pb-12 pt-5"
              noValidate
              onSubmit={handleSubmit((data) => {
                // console.log(data);
                handleAdd(data);
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
                        Full Name
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
                        ZIP / PinCode
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
                    onClick={(e) => setShowAddAddressForm(false)}
                    type="submit"
                    className="cursor-pointer rounded-md px-3 py-2 text-sm font-semibold shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 bg-slate-500 hover:bg-slate-600 text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="cursor-pointer rounded-md px-3 py-2 text-sm font-semibold shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 bg-cyan-100 text-cyan-900 border border-cyan-300 hover:bg-cyan-200"
                    onClick={() => reset()}
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="cursor-pointer rounded-md px-3 py-2 text-sm font-semibold shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          ) : null}

          <p className="mb-4 -mt-1 text-sm text-gray-500">Your Addresses : </p>
          {userInfo.addresses.map((address, index) => (
            <div key={address.email}>
              {/* {console.log(address)} */}
              {selectedEditIndex === index ? (
                <form
                  className="bg-white px-4 pb-12 pt-5"
                  noValidate
                  onSubmit={handleSubmit((data) => {
                    console.log(data);
                    handleEdit(data, index);
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
                            Full Name
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
                            ZIP / PinCode
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
                        onClick={(e) => setSelectedEditIndex}
                        type="submit"
                        className="cursor-pointer rounded-md bg-gray-300 px-3 py-2 text-sm font-semibold shadow-xs  hover:bg-gray-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="cursor-pointer rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </form>
              ) : null}

              <div
                key={index}
                className="flex justify-between items-center gap-x-6 mb-4 px-2 py-1 border-solid border-2 border-gray-200"
              >
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm/6 font-semibold text-gray-900">
                      {address.name}
                    </p>
                    <p className="mt-1 truncate text-xs/5 text-gray-500">
                      {address.street}
                    </p>
                  </div>
                </div>
                <div className="hidden sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm/6 text-gray-900">
                    Phone : {address.phone}
                  </p>
                  <p className="text-sm/6 text-gray-500">{address.state}</p>
                </div>
                <div className="flex flex-col sm:items-end space-y-1">
                  <button
                    type="button"
                    className="cursor-pointer px-4 py-1.5 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200 shadow-sm"
                    onClick={(e) => {
                      handleEditForm(index);
                      // setShowAddAddressForm(false);
                    }}
                  >
                    Edit
                  </button>
          
                  <div className="flex">
                    <Modal
                      title={
                        <>
                          Delete Address :{" "}
                          <span style={{ color: "red" }}>
                            "{address.name}"
                          </span>
                        </>
                      }
                      message="Are you sure you want to delete this address?"
                      dangerOption="Delete"
                      cancelOption="Cancel"
                      dangerAction={(e) => handleRemove(e, index)}
                      cancelAction={() => setOpenModal(null)}
                      showModal={openModal === address.email}
                    ></Modal>
                    <button
                      type="button"
                      className="cursor-pointer px-4 py-1.5 rounded-md text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition-colors duration-200 shadow-sm"
                      onClick={() => setOpenModal(address.email)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}