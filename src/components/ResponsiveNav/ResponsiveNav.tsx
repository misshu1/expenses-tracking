import * as React from "react";
import { Icon } from "@iconify/react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/add-expense", label: "Add Expense" },
  { href: "/add-budget", label: "Add Yearly Budget" },
  { href: "/investments", label: "Investments" },
];

const ResponsiveNav: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [dark, setDark] = React.useState(false);

  React.useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow px-4 py-2 flex items-center justify-between">
      {/* Logo */}
      <a
        href="/"
        className="flex items-center gap-2 text-xl font-bold text-blue-600 dark:text-blue-400"
      >
        <Icon icon="ri:pie-chart-2-line" width={28} />
        <span>FinTrack</span>
      </a>
      {/* Desktop Links */}
      <div className="hidden md:flex gap-6 items-center">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
          >
            {link.label}
          </a>
        ))}
        <button
          onClick={() => setDark((d) => !d)}
          className="ml-4 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Toggle dark mode"
        >
          <Icon icon={dark ? "ri:sun-line" : "ri:moon-line"} width={22} />
        </button>
      </div>
      {/* Hamburger */}
      <button
        className="md:hidden p-2 rounded focus:outline-none"
        onClick={() => setOpen((o) => !o)}
        aria-label="Open menu"
      >
        <Icon icon={open ? "ri:close-line" : "ri:menu-line"} width={28} />
      </button>
      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-14 left-0 w-full bg-white dark:bg-gray-900 shadow-md flex flex-col items-center gap-4 py-4 z-50 md:hidden animate-fade-in">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium text-lg"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => setDark((d) => !d)}
            className="mt-2 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            <Icon icon={dark ? "ri:sun-line" : "ri:moon-line"} width={22} />
          </button>
        </div>
      )}
    </nav>
  );
};

export default ResponsiveNav;
