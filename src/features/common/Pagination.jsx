import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { ITEMS_PER_PAGE } from "../../app/constants";

function getPaginationRange(current, total) {
  const delta = 2;
  const range = [];
  const rangeWithDots = [];
  const left = Math.max(2, current - delta);
  const right = Math.min(total - 1, current + delta);

  range.push(1);
  if (left > 2) rangeWithDots.push("left-ellipsis");
  for (let i = left; i <= right; i++) rangeWithDots.push(i);
  if (right < total - 1) rangeWithDots.push("right-ellipsis");
  if (total > 1) range.push(...rangeWithDots, total);
  else range.push(...rangeWithDots);

  return range;
}
export default function Pagination({ page, handlePage, totalItems }) {
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const paginationRange = getPaginationRange(page, totalPages);

  const handleKey = (e, action) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      action();
    }
  };

  return (
    <div className="w-full bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          {/* Mobile: Prev / Next only */}
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={() => handlePage(page > 1 ? page - 1 : 1)}
              className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Previous
            </button>
            <button
              onClick={() =>
                handlePage(page < totalPages ? page + 1 : totalPages)
              }
              className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Next
            </button>
          </div>

          {/* Desktop: Full pagination */}
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between w-full">
            <p className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-medium">
                {(page - 1) * ITEMS_PER_PAGE + 1}
              </span>{" "}
              to{" "}
              <span className="font-medium">
                {Math.min(page * ITEMS_PER_PAGE, totalItems)}
              </span>{" "}
              of <span className="font-medium">{totalItems}</span> results
            </p>

            <nav
              className="flex w-full justify-center gap-1 mt-2 sm:mt-0"
              aria-label="Pagination"
            >
              {/* Prev Arrow */}
              <div
                role="button"
                tabIndex={0}
                onClick={() => handlePage(Math.max(1, page - 1))}
                onKeyDown={(e) =>
                  handleKey(e, () => handlePage(Math.max(1, page - 1)))
                }
                className="cursor-pointer flex-1 text-center inline-flex items-center justify-center px-2 py-2 text-sm text-gray-500 border ring-1 ring-indigo-500 ring-inset hover:bg-gray-50 rounded-l-md focus:outline-none"
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </div>

              {/* Page buttons */}
              {paginationRange.map((item, index) => {
                if (item === "left-ellipsis") {
                  return (
                    <div
                      key={index}
                      role="button"
                      tabIndex={0}
                      onClick={() => handlePage(Math.max(1, page - 10))}
                      onKeyDown={(e) =>
                        handleKey(e, () => handlePage(Math.max(1, page - 10)))
                      }
                      className="flex-1 text-center cursor-pointer px-3 py-2 text-sm text-gray-400 hover:text-gray-600 transition"
                    >
                      ...
                    </div>
                  );
                }

                if (item === "right-ellipsis") {
                  return (
                    <div
                      key={index}
                      role="button"
                      tabIndex={0}
                      onClick={() =>
                        handlePage(Math.min(totalPages, page + 10))
                      }
                      onKeyDown={(e) =>
                        handleKey(e, () =>
                          handlePage(Math.min(totalPages, page + 10))
                        )
                      }
                      className="flex-1 text-center cursor-pointer px-3 py-2 text-sm text-gray-400 hover:text-gray-600 transition"
                    >
                      ...
                    </div>
                  );
                }

                return (
                  <div
                    key={index}
                    role="button"
                    tabIndex={0}
                    onClick={() => handlePage(item)}
                    onKeyDown={(e) => handleKey(e, () => handlePage(item))}
                    className={`flex-1 text-center cursor-pointer inline-flex items-center justify-center px-4 py-2 text-sm font-semibold transition-all duration-200 ease-in-out ${
                      item === page
                        ? "bg-indigo-600 text-white"
                        : "text-gray-500 border border-gray-500 hover:bg-gray-100"
                    } focus:outline-none focus:ring-2 focus:ring-indigo-600`}
                  >
                    {item}
                  </div>
                );
              })}

              {/* Next Arrow */}
              <div
                role="button"
                tabIndex={0}
                onClick={() => handlePage(Math.min(totalPages, page + 1))}
                onKeyDown={(e) =>
                  handleKey(e, () => handlePage(Math.min(totalPages, page + 1)))
                }
                className="cursor-pointer flex-1 text-center inline-flex items-center justify-center px-2 py-2 text-sm text-gray-500 border ring-1 ring-indigo-500 ring-inset hover:bg-gray-50 rounded-r-md focus:outline-none"
              >
                <ChevronRightIcon className="h-5 w-5" />
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}


// import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
// import { ITEMS_PER_PAGE } from "../../app/constants";
// export default function Pagination({ page, setPage, handlePage, totalItems }) {
//   const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

//   return (
//     <>
//       {/* Pagination */}
//       <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
//         <div className="flex flex-1 justify-between sm:hidden mt-8">
//           <div
//             onClick={(e) => handlePage(page > 1 ? page - 1 : page)}
//             className="cursor-pointer relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
//           >
//             Previous
//           </div>
//           <div
//             onClick={(e) => handlePage(page < totalPages ? page + 1 : page)}
//             className="cursor-pointer relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
//           >
//             Next
//           </div>
//         </div>
//         <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
//           <div>
//             <p className="text-sm text-gray-700">
//               Showing{" "}
//               <span className="font-medium">
//                 {(page - 1) * ITEMS_PER_PAGE + 1}
//               </span>{" "}
//               to{" "}
//               <span className="font-medium">
//                 {page * ITEMS_PER_PAGE > totalItems
//                   ? totalItems
//                   : page * ITEMS_PER_PAGE}
//               </span>{" "}
//               of <span className="font-medium">{totalItems}</span> results
//             </p>
//           </div>
//           <div>
//             <nav
//               aria-label="Pagination"
//               className="gap-1 isolate inline-flex -space-x-px rounded-md shadow-xs"
//             >
//               <div
//                 onClick={(e) => handlePage(page > 1 ? page - 1 : page)}
//                 className="cursor-pointer relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-indigo-600 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
//               >
//                 <span className="sr-only">Previous</span>
//                 <ChevronLeftIcon aria-hidden="true" className="size-5" />
//               </div>

//               {Array.from({
//                 length: totalPages,
//               }).map((el, index) => (
//                 <div
//                   key={index}
//                   onClick={(e) => handlePage(index + 1)}
//                   aria-current="page"
//                   className={`cursor-pointer relative z-10 inline-flex items-center ${
//                     index + 1 === page
//                       ? "bg-indigo-600 text-white"
//                       : "text-gray-400"
//                   } px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
//                 >
//                   {index + 1}
//                 </div>
//               ))}

//               <div
//                 onClick={(e) => handlePage(page < totalPages ? page + 1 : page)}
//                 className="cursor-pointer relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-indigo-600 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
//               >
//                 <span className="sr-only">Next</span>
//                 <ChevronRightIcon aria-hidden="true" className="size-5" />
//               </div>
//             </nav>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }