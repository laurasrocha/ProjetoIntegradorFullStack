'use client'
import { MdSunny } from "react-icons/md";
import { IoIosMoon } from "react-icons/io";
import useDarkMode from "../hooks/useDarkMode";

export default function ThemeMobile() {
  const [darkMode, setDarkMode] = useDarkMode();

  if (darkMode === null) return null;

  return (
    <div className="block sm:hidden">
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="relative flex items-center justify-between w-12 h-6 rounded-full bg-gray-300 dark:bg-gray-700 transition-colors duration-300 px-1 m-2"
      >
        {/* Sol */}
        <MdSunny size={9} className="text-[#f29100]" />

        {/* Lua */}
        <IoIosMoon size={9} className="text-[#004A8D]" />

        {/* Bolinha */}
        <span
          className={`absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white/60 dark:bg-gray-200/40 backdrop-blur-sm rounded-full shadow transition-transform duration-300 ${darkMode ? "translate-x-6" : "translate-x-0"
            }`}
        />
      </button>

    </div>
  );
}
