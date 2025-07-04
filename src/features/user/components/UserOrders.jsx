import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLoggedInUserOrdersAsync, selectUserInfo, selectUserOrders } from "../userSlice";

export function UserOrders() {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const orders = useSelector(selectUserOrders);

  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync(user.id));
  }, [dispatch]);

  return (
    <>
    <h2 className="font-semibold text-2xl mb-4">My Orders</h2>
      {orders?.map((order) => (
        <div className="mx-auto mb-12 border-t-3 border-t-gray-400 bg-white max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="border-t border-gray-200 py-6 sm:px-6">
            <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
              Order # {order.id}
            </h1>
            <h3 className="text-xl my-5 font-bold tracking-tight">
              Order Status :{" "}
              <span className="bg-yellow-300 px-2 pb-1">{order.status}</span>
            </h3>
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {order.items.map((item) => (
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
                            Qty : {item.quantity}
                          </label>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 py-6 sm:px-6">
            <div className="my-2 flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>${order.totalAmount}</p>
            </div>
            <div className="my-2 flex justify-between text-base font-medium text-gray-900">
              <p>Total Items in Cart</p>
              <p>{order.totalItems} Items</p>
            </div>
            <p className="mb-1 text-sm text-gray-500">
              Shipping Address:
            </p>
            <div
              className="flex justify-between gap-x-6 px-4 py-3 border-solid border-2 border-gray-200"
            >
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm/6 font-semibold text-gray-900">
                    {order.selectedAddress.name}
                  </p>
                  <p className="mt-1 truncate text-xs/5 text-gray-500">
                    {order.selectedAddress.street}
                  </p>
                </div>
              </div>
              <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm/6 text-gray-900">
                  Phone : {order.selectedAddress.phone}
                </p>
                <p className="text-sm/6 text-gray-500">{order.selectedAddress.state}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}