import React from "react";

const Sidebar = (props) => {
  return (
    <div
      class={`fixed top-0 right-0 w-64 h-full bg-gray-800 text-white z-[400] transition-transform duration-300 ${
        props.sidebarVisible() ? "transform-none" : "transform translate-x-full"
      }`}
    >
      <div class="p-6">
        <button
          class="absolute top-4 right-4 text-white text-3xl"
          onClick={props.closeSidebar}
        >
          <svg
            fill="currentColor"
            stroke-width="0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            height="1em"
            width="1em"
            style="overflow: visible; color: currentcolor;"
          >
            <path
              fill="currentColor"
              d="M15.854 12.854 11 8l4.854-4.854a.503.503 0 0 0 0-.707L13.561.146a.499.499 0 0 0-.707 0L8 5 3.146.146a.5.5 0 0 0-.707 0L.146 2.439a.499.499 0 0 0 0 .707L5 8 .146 12.854a.5.5 0 0 0 0 .707l2.293 2.293a.499.499 0 0 0 .707 0L8 11l4.854 4.854a.5.5 0 0 0 .707 0l2.293-2.293a.499.499 0 0 0 0-.707z"
            ></path>
          </svg>
        </button>

        <h2 class="text-2xl mb-4">Nodes</h2>
        <ul>
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
