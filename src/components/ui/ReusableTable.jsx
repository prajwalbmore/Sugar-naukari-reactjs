import React, { useMemo, useRef, useState, useCallback } from "react";
import { DateRangePicker } from "./DateRangePicker";
import { ListFilter } from "lucide-react";
import Button from "./Button";
import { useTranslation } from "react-i18next";
import SelectInput from "./Select";
import { StarIcon } from "@heroicons/react/24/solid";

export default function ReusableTable({
  columns,
  data,
  pageSize = 10,
  onFilterClick = false,
  title = "Table",
  isSearchFilter = true,
  isDateFilter = true,
  isApplicantFilter = false,
  handleChange,
  selectedRating,
  handleDistanceChange,
  selectedDistance,
}) {
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [range, setRange] = useState([]);
  const [checked, setChecked] = useState({});
  const dateRef = useRef();

  const { t } = useTranslation();
  // Filtered data based on search query
  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return data;
    return data.filter((item) =>
      columns.some((col) => String(item[col.key]).toLowerCase().includes(term))
    );
  }, [q, data, columns]);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(filtered?.length / pageSize)),
    [filtered?.length, pageSize]
  );

  const pageData = useMemo(
    () => filtered?.slice((page - 1) * pageSize, page * pageSize),
    [filtered, page, pageSize]
  );

  const allChecked = useMemo(
    () => pageData?.length > 0 && pageData?.every((row) => checked[row.id]),
    [pageData, checked]
  );

  const indeterminate = useMemo(
    () => !allChecked && pageData?.some((row) => checked[row.id]),
    [allChecked, pageData, checked]
  );

  // Toggle all rows on the current page
  const toggleAll = useCallback(() => {
    const target = !(allChecked || indeterminate);
    const next = { ...checked };
    pageData.forEach((row) => {
      next[row.id] = target;
    });
    setChecked(next);
  }, [allChecked, indeterminate, pageData, checked]);

  // Handle search input change
  const handleSearch = useCallback((e) => {
    setQ(e.target.value);
    setPage(1);
  }, []);

  return (
    <div className="p-4 border-2 border-emerald-500 rounded-lg ">
      {/* Header Filters */}
      <div className="flex flex-wrap items-center justify-between mb-4 gap-3">
        <h1 className="text-xl font-bold px-2">{t(title)}</h1>
        <div className="flex flex-wrap gap-3">
          {isApplicantFilter && (
            <>
              <select
                value={selectedRating}
                onChange={handleChange}
                className="border rounded p-2"
              >
                <option value="" disabled>
                  Select Rating
                </option>
                <option value="all">All</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <select
                value={selectedDistance}
                onChange={handleDistanceChange}
                className="border rounded p-2"
              >
                <option value="" disabled>
                  Select Distance
                </option>
                <option value="all">All</option>
                <option value="near">Near</option>
                <option value="far">Far</option>
              </select>
            </>
          )}
          {isSearchFilter && (
            <input
              type="text"
              value={q}
              onChange={handleSearch}
              placeholder="Search"
              className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 w-full sm:w-auto"
            />
          )}

          {isDateFilter && (
            <DateRangePicker
              ref={dateRef}
              options={{
                minDate: "2023-01-01",
                maxDate: "2025-12-31",
              }}
              value={range}
              onChange={(dates) => setRange(dates)}
            />
          )}

          {onFilterClick && (
            <Button
              onClick={onFilterClick}
              className="px-3 py-2 rounded-md border flex gap-2 border-gray-300 bg-white hover:bg-gray-50"
            >
              Filter <ListFilter className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Responsive Table */}
      <div className="rounded-lg border border-gray-200 overflow-auto max-h-[70vh] hide-scrollbar">
        <table className="min-w-[800px] w-full text-sm">
          <thead className="bg-gray-100 text-gray-600 sticky top-0 z-10">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="p-3 text-left">
                  {t(col.label)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {pageData?.length > 0 ? (
              pageData?.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  {columns.map((col) => (
                    <td key={col.key} className="p-3 font-semibold">
                      {col.render ? col.render(item) : item[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  className="p-8 text-center text-gray-500"
                  colSpan={columns.length + 1}
                >
                  {t("No data found")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap items-center justify-between p-3 text-sm text-gray-600 bg-white gap-3 mt-2 rounded-md">
        <div>
          {t("Showing")} {(page - 1) * pageSize + 1}–
          {Math.min(page * pageSize, filtered?.length)} {t("of")}{" "}
          {filtered?.length}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Previous Button */}
          <button
            className="px-3 py-1.5 rounded-md border disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            {t("Previous")}
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`px-3 py-1.5 rounded-md border ${
                p === page
                  ? "bg-emerald-500 text-black"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {p}
            </button>
          ))}

          {/* Next Button */}
          <button
            className="px-3 py-1.5 rounded-md border disabled:opacity-50"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            {t("Next")}
          </button>
        </div>
      </div>

      {/* <div className="flex flex-wrap items-center justify-between p-3 text-sm text-gray-600 bg-white gap-3 mt-2 rounded-md">
        <div>
          Showing {(page - 1) * pageSize + 1}–
          {Math.min(page * pageSize, filtered.length)} of {filtered.length}
        </div>
        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1.5 rounded-md border disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="px-3 py-1.5 rounded-md bg-appcolor text-black">
            {page}
          </span>
          <button
            className="px-3 py-1.5 rounded-md border disabled:opacity-50"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div> */}
    </div>
  );
}
// import React, { useMemo, useRef, useState, useCallback } from "react";
// import { DateRangePicker } from "./DateRangePicker";
// import { ListFilter } from "lucide-react";
// import Button from "./Button";

// export default function ReusableTable({
//   columns,
//   data,
//   pageSize = 10,
//   onFilterClick = false,
//   title = "Table",
//   isSearchFilter = true,
//   isDateFilter = true,
// }) {
//   const [q, setQ] = useState("");
//   const [page, setPage] = useState(1);
//   const [range, setRange] = useState([]);
//   const [checked, setChecked] = useState({});
//   const dateRef = useRef();

//   // Filtered data based on search query
//   const filtered = useMemo(() => {
//     const term = q.trim().toLowerCase();
//     if (!term) return data;
//     return data.filter((item) =>
//       columns.some((col) => String(item[col.key]).toLowerCase().includes(term))
//     );
//   }, [q, data, columns]);

//   const totalPages = useMemo(
//     () => Math.max(1, Math.ceil(filtered.length / pageSize)),
//     [filtered.length, pageSize]
//   );

//   const pageData = useMemo(
//     () => filtered.slice((page - 1) * pageSize, page * pageSize),
//     [filtered, page, pageSize]
//   );

//   const allChecked = useMemo(
//     () => pageData.length > 0 && pageData.every((row) => checked[row.id]),
//     [pageData, checked]
//   );

//   const indeterminate = useMemo(
//     () => !allChecked && pageData.some((row) => checked[row.id]),
//     [allChecked, pageData, checked]
//   );

//   // Toggle all rows on the current page
//   const toggleAll = useCallback(() => {
//     const target = !(allChecked || indeterminate);
//     const next = { ...checked };
//     pageData.forEach((row) => {
//       next[row.id] = target;
//     });
//     setChecked(next);
//   }, [allChecked, indeterminate, pageData, checked]);

//   // Handle search input change
//   const handleSearch = useCallback((e) => {
//     setQ(e.target.value);
//     setPage(1);
//   }, []);
//   return (
//     <div className="p-4 border-2 border-appcolor rounded-lg overflow-y-auto">
//       <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
//         <h1 className="text-xl font-bold px-2">{title}</h1>
//         <div className="flex gap-5">
//           {isSearchFilter && (
//             <input
//               type="text"
//               value={q}
//               onChange={handleSearch}
//               placeholder="Search"
//               className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
//             />
//           )}

//           {isDateFilter && (
//             <DateRangePicker
//               ref={dateRef}
//               options={{
//                 minDate: "2023-01-01",
//                 maxDate: "2025-12-31",
//               }}
//               value={range}
//               onChange={(dates) => setRange(dates)}
//             />
//           )}

//           {onFilterClick && (
//             <Button
//               onClick={onFilterClick}
//               className="px-3 py-2 rounded-md border flex gap-2 border-gray-300 bg-white hover:bg-gray-50"
//             >
//               Filter <ListFilter />
//             </Button>
//           )}
//         </div>
//       </div>

//       <div className="rounded-lg overflow-hidden border border-gray-200">
//         <table className="min-w-full text-sm">
//           <thead className="bg-gray-100 text-gray-600">
//             <tr>
//               <th className="w-10 p-3">
//                 <input
//                   type="checkbox"
//                   aria-checked={indeterminate ? "mixed" : allChecked}
//                   checked={allChecked}
//                   onChange={toggleAll}
//                   ref={(el) => {
//                     if (el) el.indeterminate = indeterminate;
//                   }}
//                 />
//               </th>
//               {columns.map((col) => (
//                 <th key={col.key} className="p-3 text-left">
//                   {col.label}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-300">
//             {pageData.length > 0 ? (
//               pageData.map((item) => (
//                 <tr key={item.id} className="hover:bg-gray-50">
//                   <td className="p-3">
//                     <input
//                       type="checkbox"
//                       checked={!!checked[item.id]}
//                       onChange={() =>
//                         setChecked((prev) => ({
//                           ...prev,
//                           [item.id]: !prev[item.id],
//                         }))
//                       }
//                     />
//                   </td>
//                   {columns.map((col) => (
//                     <td key={col.key} className="p-3 font-semibold">
//                       {col.render ? col.render(item) : item[col.key]}
//                     </td>
//                   ))}
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td
//                   className="p-8 text-center text-gray-500"
//                   colSpan={columns.length + 1}
//                 >
//                   No results found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>

//         <div className="flex flex-wrap items-center justify-between p-3 text-sm text-gray-600 bg-white gap-2">
//           <div>
//             Showing {(page - 1) * pageSize + 1}–
//             {Math.min(page * pageSize, filtered.length)} of {filtered.length}
//           </div>
//           <div className="flex items-center gap-2">
//             <button
//               className="px-3 py-1.5 rounded-md border disabled:opacity-50"
//               onClick={() => setPage((p) => Math.max(1, p - 1))}
//               disabled={page === 1}
//             >
//               Previous
//             </button>
//             <span className="px-3 py-1.5 rounded-md bg-appcolor text-black">
//               {page}
//             </span>
//             <button
//               className="px-3 py-1.5 rounded-md border disabled:opacity-50"
//               onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//               disabled={page === totalPages}
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
