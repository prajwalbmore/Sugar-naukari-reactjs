import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const range = (start, end) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

function getPages(current, total) {
  const pagesSet = new Set([
    1,
    total,
    current,
    current - 1,
    current + 1,
    current - 2,
    current + 2,
    2,
    3,
    total - 1,
    total - 2,
  ]);
  const pages = [...pagesSet].filter((n) => n >= 1 && n <= total);
  pages.sort((a, b) => a - b);

  const result = [];
  for (let i = 0; i < pages.length; i++) {
    result.push(pages[i]);
    if (i < pages.length - 1 && pages[i + 1] - pages[i] > 1) {
      result.push("dots");
    }
  }
  return result;
}

const Pagination = ({
  current = 1,
  total = 1,
  onChange,
  scrollToJob = () => {},
}) => {
  const pages = getPages(current, total);

  const baseBtn =
    "h-9 w-9 flex items-center justify-center rounded-xl text-sm font-medium";
  const numBtn = "text-gray-600 hover:text-gray-900";
  const activeBtn =
    "bg-amber-300 text-black shadow-[inset_0_0_0_2px_rgba(0,0,0,0.05)]";
  const arrowBtn =
    "h-9 w-9 flex items-center justify-center rounded-lg text-gray-600 hover:text-gray-900";

  const handleChange = (page) => {
    onChange(page);
    window.scrollTo({ top: 0, behavior: "smooth" }); // scroll to top smoothly
  };

  return (
    <div className="flex justify-center items-center h-full">
      <nav className="flex items-center gap-5  p-4 rounded-lg">
        <button
          className={arrowBtn}
          onClick={() => current > 1 && onChange(current - 1)}
          disabled={current === 1}
          aria-label="Previous page"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2">
          {pages.map((p, idx) =>
            p === "dots" ? (
              <span key={`dots-${idx}`} className="text-gray-500 select-none">
                ...
              </span>
            ) : (
              <button
                key={p}
                onClick={() => {
                  scrollToJob();
                  handleChange(p);
                }}
                className={`${baseBtn} ${p === current ? activeBtn : numBtn}`}
              >
                {p}
              </button>
            )
          )}
        </div>

        <button
          className={arrowBtn}
          onClick={() => current < total && onChange(current + 1)}
          disabled={current === total}
          aria-label="Next page"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
