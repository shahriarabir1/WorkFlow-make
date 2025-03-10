import { createSignal } from "solid-js";

const Navbar = () => {
  const [isOpen, setIsOpen] = createSignal(false);

  return (
    <nav class="bg-gray-900 text-white p-4">
      <div class="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <a href="#" class="text-2xl font-bold">
          MyApp
        </a>

        {/* Desktop Links */}
        <ul class="hidden md:flex space-x-6">
          <li>
            <a href="#" class="hover:text-gray-400 transition">
              Home
            </a>
          </li>
          <li>
            <a href="#" class="hover:text-gray-400 transition">
              About
            </a>
          </li>
          <li>
            <a href="#" class="hover:text-gray-400 transition">
              Services
            </a>
          </li>
          <li>
            <a href="#" class="hover:text-gray-400 transition">
              Contact
            </a>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button class="md:hidden" onClick={() => setIsOpen(!isOpen())}>
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d={isOpen() ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div class={`md:hidden mt-2 ${isOpen() ? "block" : "hidden"}`}>
        <ul class="bg-gray-800 p-4 space-y-3 text-center">
          <li>
            <a href="#" class="block py-2 hover:text-gray-400">
              Home
            </a>
          </li>
          <li>
            <a href="#" class="block py-2 hover:text-gray-400">
              About
            </a>
          </li>
          <li>
            <a href="#" class="block py-2 hover:text-gray-400">
              Services
            </a>
          </li>
          <li>
            <a href="#" class="block py-2 hover:text-gray-400">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
