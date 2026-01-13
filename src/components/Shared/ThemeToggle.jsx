import { useTheme } from "../../providers/ThemeProvider";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeToggle = ({ className = "" }) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm border ${theme === 'dark'
                    ? 'bg-gray-800 border-gray-700 text-yellow-400 hover:bg-gray-700'
                    : 'bg-white border-gray-100 text-gray-500 hover:bg-gray-50'
                } ${className}`}
            title="Toggle Dark Mode"
        >
            {theme === 'dark' ? <FaSun className="text-lg" /> : <FaMoon className="text-lg" />}
        </button>
    );
};

export default ThemeToggle;
