import React, { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const Tabs = ({ tabs, active, setActive }) => {
  const refs = useRef([]);
  const { t } = useTranslation();
  const [underline, setUnderline] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const el = refs.current[active];
    if (!el) return;
    const { offsetLeft, clientWidth } = el;
    setUnderline({ left: offsetLeft, width: clientWidth });
  }, [active, tabs]);

  return (
    <div className="">
      <div className="relative border-b border-gray-200">
        <span
          className="absolute -bottom-[1px] h-1 rounded-full bg-gray-900 transition-all duration-300"
          style={{ left: underline.left, width: underline.width }}
        />
        <div className="flex gap-8 px-4 py-3">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              ref={(el) => (refs.current[i] = el)}
              onClick={() => setActive(i)}
              className={`text-base font-medium ${
                i === active ? "text-gray-900" : "text-gray-400"
              }`}
            >
              {t(tab)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tabs;
