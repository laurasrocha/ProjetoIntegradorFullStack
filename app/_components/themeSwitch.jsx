'use client'
import { MdSunny } from "react-icons/md";
import { IoIosMoon } from "react-icons/io";
import useDarkMode from "../hooks/useDarkMode";

export default function ThemeSwitch() {
  const [darkMode, setDarkMode] = useDarkMode();

  if (darkMode === null) return null;

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="relative flex items-center justify-between w-15 h-8 rounded-full bg-gray-300 dark:bg-gray-700 transition-colors duration-300 p-2 m-4"
    >
      {/* Ícone do Sol */}
      <MdSunny size={14} className="text-white" />

      {/* Ícone da Lua */}
      <IoIosMoon size={14} className="text-black" />

      {/* Bolinha deslizante com transparência */}
      <span
        className={`absolute top-1 w-5 h-5 bg-white/50 dark:bg-gray-200/40 backdrop-blur-sm rounded-full shadow-md transition-transform duration-300 ${
          darkMode ? "translate-x-6" : "translate-x-0"
        }`}
      />
    </button> 
  );
}
