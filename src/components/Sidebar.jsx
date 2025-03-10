import { createSignal, onCleanup } from "solid-js";

const Sidebar = (props) => {
  const [search, setSearch] = createSignal("");
  const [isFocused, setIsFocused] = createSignal(false);

  const handleClickOutside = (event) => {
    if (!event.target.closest(".sidebar-container")) {
      props.closeSidebar();
    }
  };

  document.addEventListener("click", handleClickOutside);
  onCleanup(() => document.removeEventListener("click", handleClickOutside));

  return (
    <div
      class={`fixed top-0 right-0 w-84 h-full bg-gray-800 text-white z-[400] transition-transform duration-300 sidebar-container ${
        props.sidebarVisible() ? "transform-none" : "transform translate-x-full"
      }`}
    >
      {/* Header Section */}
      <div class="p-6 bg-[#535456] text-white">
        <h2 class="text-2xl">What happens next</h2>
      </div>

      {/* Search and List Section */}
      <div class="flex flex-col h-full bg-[#414243] p-6">
        {/* Search Bar */}
        <input
          type="text"
          class="w-full p-2 mb-4 rounded text-white placeholder-gray-400 transition-colors"
          classList={{ "bg-[#535456]": !isFocused(), "bg-indigo-600": isFocused() }}
          placeholder="Search nodes..."
          onInput={(e) => setSearch(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {/* Node List */}
        <ul class="flex-1 overflow-y-auto">
          <li class="mb-2">
            <button
              class="text-lg hover:text-gray-300"
              onClick={(e) => props.clickAddNodeHandler(e, 0, 1, "gmail")}
            >
              Gmail
            </button>
          </li>
          <li class="mb-2">
            <button
              class="text-lg hover:text-gray-300"
              onClick={(e) =>
                props.clickAddNodeHandler(
                  e,
                  1,
                  1,
                  { model: 1, memory: 1, tool: 1 },
                  "aia"
                )
              }
            >
              AI Agent
            </button>
          </li>
          <li class="mb-2">
            <button class="text-lg hover:text-gray-300">Deployment</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
