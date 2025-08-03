import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllOrdersAsync,
  selectOrders,
  selectTotalOrders,
  updateOrderAsync,
} from "../../order/orderSlice";
import { discountedPrice, ITEMS_PER_PAGE } from "../../../app/constants";
import {
  ArrowsUpDownIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  EyeIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/solid";
import Pagination from "../../common/Pagination";

function AdminOrders() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  console.log(orders);
  const totalOrders = useSelector(selectTotalOrders);
  const [editableOrderId, setEditableOrderId] = useState(-1);
  // const [sort, setSort] = useState({ _sort: "id" });
  const [sort, setSort] = useState({ _sort: "_id", _order: "asc" });

  const handleEdit = (order) => {
    setEditableOrderId(order.id);
  };

  const handleShow = () => {
    console.log("show");
  };

  const handleOrderStatus = (e, order) => {
    const updatedOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(updatedOrder));
    setEditableOrderId(-1);
  };

  // const handleSort = (field) => {
  //   const currentSort = sort._sort;
  //   let newSort;
  //   if (currentSort === field) {
  //     newSort = `-${field}`;
  //   } else if (currentSort === `-${field}`) {
  //     newSort = field;
  //   } else {
  //     newSort = field;
  //   }
  //   setSort({ _sort: newSort });
  // };

  const handleSort = (sortOption) => {
    const sort = { _sort: sortOption.sort, _order: sortOption.order };
    console.log({ sort });
    setSort(sort);
  };

  useEffect(() => {
    // const pagination = { _page: page, _per_page: ITEMS_PER_PAGE }; // for json-server(data.json file) as backend
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE }; // for mongodb as backend
    dispatch(fetchAllOrdersAsync({ sort, pagination }));
  }, [dispatch, page, sort]);

  const handlePage = (page) => {
    setPage(page);
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex items-center justify-center font-sans">
        <div className="w-full">
          <div className="bg-white shadow-md rounded my-6">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-100 border-b text-gray-600 uppercase text-sm leading-normal select-none">
                  <th
                    className="py-3 px-6 text-left hover:bg-blue-200 cursor-pointer"
                    // onClick={() => handleSort("id")}
                    onClick={(e) =>
                      handleSort({
                        sort: "_id",
                        order: sort?._order === "asc" ? "desc" : "asc",
                      })
                    }
                  >
                    <div className="flex items-center justify-center gap-2">
                      <span>Order Id</span>
                      <span>
                        {sort._sort === "_id" && sort._order === "asc" ? (
                          <ChevronDownIcon className="w-5 h-5 text-blue-600" />
                        ) : sort._sort === "_id" && sort._order === "desc" ? (
                          <ChevronUpIcon className="w-5 h-5 text-blue-700" />
                        ) : (
                          <ArrowsUpDownIcon className="w-5 h-5 text-blue-700" />
                        )}
                      </span>
                    </div>
                  </th>

                  <th className="py-3 px-6 text-left">Customer</th>
                  <th className="py-3 px-6 text-left">Items</th>
                  <th className="py-3 px-6 text-left">Qty</th>
                  <th className="py-3 px-6 text-left">Price</th>

                  <th
                    className="py-3 px-6 text-center whitespace-nowrap hover:bg-blue-200 cursor-pointer"
                    // onClick={() => handleSort("totalAmount")}
                    onClick={(e) =>
                      handleSort({
                        sort: "totalAmount",
                        order: sort?._order === "asc" ? "desc" : "asc",
                      })
                    }
                  >
                    <div className="flex items-center justify-center gap-2">
                      <span>Total Amount</span>
                      <span>
                        {sort._sort === "totalAmount" && sort._order === "asc" ? (
                          <ChevronDownIcon className="w-5 h-5 text-blue-600" />
                        ) : sort._sort === "totalAmount" &&
                          sort._order === "desc" ? (
                          <ChevronUpIcon className="w-5 h-5 text-blue-700" />
                        ) : (
                          <ArrowsUpDownIcon className="w-5 h-5 text-blue-700" />
                        )}
                      </span>
                    </div>
                  </th>

                  <th
                    className="py-3 px-6 text-center whitespace-nowrap hover:bg-blue-200  cursor-pointer"
                    // onClick={() => handleSort("status")}
                    onClick={(e) =>
                      handleSort({
                        sort: "status",
                        order: sort?._order === "asc" ? "desc" : "asc",
                      })
                    }
                  >
                    <div className="flex items-center justify-start gap-1">
                      <span>Status</span>
                      <span>
                        {sort._sort === "status" && sort._order === "asc" ? (
                          <ChevronDownIcon className="w-5 h-5 text-blue-600" />
                        ) : sort._sort === "status" &&
                          sort._order === "desc" ? (
                          <ChevronUpIcon className="w-5 h-5 text-blue-700" />
                        ) : (
                          <ArrowsUpDownIcon className="w-5 h-5 text-blue-700" />
                        )}
                      </span>
                    </div>
                  </th>

                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {/*🟢 Order List */}
                {orders?.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-gray-300 hover:bg-gray-100 bg-white"
                  >
                    {/* <td className="py-3 px-6 text-left whitespace-nowrap">
                      <span className="font-bold bg-amber-300 px-3 py-0.5 rounded-2xl"> */}
                    <td className="py-3 px-6 text-left whitespace-nowrap max-w-[150px]">
                      <span className="font-bold bg-amber-300 px-3 py-0.5 rounded-2xl block overflow-hidden text-ellipsis whitespace-nowrap">
                        #{order.id}
                      </span>
                    </td>

                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      <strong className="font-black">
                        {order.selectedAddress.name}
                      </strong>
                      <br />
                      <span>
                        <span className="font-semibold">Phone:</span>{" "}
                        {order.selectedAddress.phone}
                      </span>
                      ,<br />
                      <span>
                        <span className="font-semibold">Address:</span>{" "}
                        {order.selectedAddress.street}
                      </span>
                      ,<br />
                      <span>{order.selectedAddress.city}</span>,
                      <span> {order.selectedAddress.state}</span>,
                      <span> {order.selectedAddress.pinCode}</span>
                    </td>

                    <td className="py-3 px-6 text-left">
                      {/*🟢 Items List in Order */}
                      {order.items.map((item, index) => (
                        <div key={item.id} className="flex items-center">
                          {/* {console.log(item)} */}
                          <img
                            className="w-10 h-10 rounded-full"
                            src={item.product.thumbnail}
                          ></img>
                          <span>{item.product.title}</span>
                          <br />
                        </div>
                      ))}
                    </td>

                    <td className="py-3 px-6 text-left">
                      {order.items.map((item, index) => (
                        <div key={item.id} className="flex items-center">
                          {/* {console.log(item)} */}
                          <span className="text-gray-600 font-semibold">
                            {item.quantity}
                          </span>
                          <br />
                        </div>
                      ))}
                    </td>

                    <td className="py-3 px-6 text-left">
                      {order.items.map((item, index) => (
                        <div key={item.id} className="flex items-center">
                          <span className="text-gray-600 font-semibold">
                            ${discountedPrice(item.product)}
                          </span>
                          <br />
                        </div>
                      ))}
                    </td>

                    <td className="py-3 px-6">
                      <div className="text-gray-600 font-black ml-1">
                        ${order.totalAmount}
                      </div>
                    </td>

                    <td className="py-3 px-6 text-center">
                      {order.id === editableOrderId ? (
                        <select
                          className="mt-2 w-full rounded-md border border-gray-300 bg-white py-1 px-2 text-sm text-gray-800 shadow-sm transition duration-150 ease-in-out focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
                          onChange={(e) => handleOrderStatus(e, order)}
                          value={order.status}
                        >
                          <option value="pending">Pending</option>
                          <option value="dispatched">Dispatched</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      ) : (
                        <span
                          className={`py-1 px-3 rounded-full text-xs font-semibold 
                              ${
                                order.status === "pending"
                                  ? "bg-yellow-400 text-black"
                                  : ""
                              }
                              ${
                                order.status === "dispatched"
                                  ? "bg-blue-400 text-black"
                                  : ""
                              }
                              ${
                                order.status === "delivered"
                                  ? "bg-green-400 text-black"
                                  : ""
                              }
                              ${
                                order.status === "cancelled"
                                  ? "bg-red-400 text-black"
                                  : ""
                              }
                            `}
                        >
                          {order.status.charAt(0).toUpperCase() +
                            order.status.slice(1)}
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-6 text-center">
                      <div className="gap-5 flex item-center justify-between ml-2">
                        <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                          <EyeIcon
                            className="w-6 h-6 cursor-pointer"
                            onClick={(e) => handleShow(order)}
                          ></EyeIcon>
                        </div>
                        <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                          <PencilSquareIcon
                            className="w-5 h-5 cursor-pointer"
                            onClick={(e) => handleEdit(order)}
                          ></PencilSquareIcon>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        handlePage={handlePage}
        totalItems={totalOrders}
      />
    </div>
  );
}
export default AdminOrders;