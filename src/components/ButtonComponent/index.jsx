const ButtonComponent = (props) => {
  return (
    <div>
      <div class="fixed top-0 left-0 w-screen p-[24px_38px] flex items-center justify-end gap-6 z-[300] pointer-events-none box-border">
        <button
          class="transition-all duration-200 bg-indigo-600 p-3 rounded-full text-white text-2xl cursor-pointer pointer-events-auto shadow-[1px_1px_11px_-6px_rgba(0,0,0,0.75)] outline-none border-none flex justify-center items-center hover:bg-indigo-800 hover:shadow-[2px_2px_12px_-6px_rgba(0,0,0,0.75)] hover:scale-105 active:scale-95"
          onClick={props.toggleSidebar}
        >
          <svg
            fill="currentColor"
            strokeWidth="0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            height="1em"
            width="1em"
            style={{ overflow: "visible" }}
          >
            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32v144H48c-17.7 0-32 14.3-32 32s14.3 32 32 32h144v144c0 17.7 14.3 32 32 32s32-14.3 32-32V288h144c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"></path>
          </svg>
        </button>
      </div>

      <div
        class={`fixed top-0 right-0 w-64 h-full bg-gray-800 text-white z-[400] transition-transform duration-300 ${
          props.sidebarVisible()
            ? "transform-none"
            : "transform translate-x-full"
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
    </div>
  );
};

export default ButtonComponent;
