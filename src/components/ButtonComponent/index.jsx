import { createSignal } from "solid-js";
import Sidebar from "../Sidebar";
import FullscreenComponent from "../Common/Screen/FullScreen";

const ButtonComponent = (props) => {
  const [isHovered, setIsHovered] = createSignal(false);
  const [search, setSearch] = createSignal("");

  const nodes = [
    {
      title: "Gmail",
      description: "Email node integration",
      data: [0, 1, {}, "gmail"],
    },
    {
      title: "AI Agent",
      description: "Smart AI processing",
      data: [1, 1, { model: 1, memory: 1, tool: 1 }, "aia"],
    },
    {
      title: "Deployment",
      description: "Deploy your workflow",
      data: [1, 1, { model: 1, memory: 1, tool: 1 }, "aia"],
    },
  ];

  const filteredNodes = () =>
    nodes.filter((item) =>
      item.title.toLowerCase().includes(search().toLowerCase())
    );
  return (
    <div>
      <div
        class="flex flex-col relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div class="fixed  w-screen p-[24px_38px] flex items-center justify-end gap-6 z-[300] pointer-events-none box-border p-2">
          <button
            class="transition-all duration-200 p-3 rounded-full text-white text-2xl cursor-pointer pointer-events-auto flex justify-center items-center hover:text-[#e75e69]"
            onClick={props.toggleSidebar}
          >
            <svg
              fill="currentColor"
              stroke-width="0"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1024 1024"
              height="2em"
              width="2em"
              style="overflow: visible; color: currentcolor;"
            >
              <path d="M328 544h152v152c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V544h152c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H544V328c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v152H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8z"></path>
              <path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z"></path>
            </svg>
          </button>
        </div>

        <div
          class={`fixed top-14 right-3 w-screen p-[24px_38px] flex items-center justify-end gap-6 z-[300] pointer-events-none box-border p-2 transition-opacity duration-300 ${
            isHovered() ? "opacity-100 pointer-events-auto" : "opacity-0"
          }`}
        >
          <button
            class="transition-all duration-200 p-3 rounded-full text-white text-2xl cursor-pointer pointer-events-auto  hover:text-[#e75e69]"
            onClick={props.toggleSidebar}
          >
            <svg
              fill="currentColor"
              stroke-width="0"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              height="1em"
              width="1em"
              style="overflow: visible; color: currentcolor;"
            >
              <path d="M64 32C28.7 32 0 60.7 0 96v320c0 35.3 28.7 64 64 64h224V368c0-26.5 21.5-48 48-48h112V96c0-35.3-28.7-64-64-64H64zm384 320H336c-8.8 0-16 7.2-16 16v112l32-32 64-64 32-32z"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Sidebar */}

      <div
        class={`fixed top-0 right-0 w-84 h-full bg-gray-800 text-white z-[400] transition-transform duration-300 ${
          props.sidebarVisible()
            ? "transform-none"
            : "transform translate-x-full"
        }`}
      >
        {/* Header Section */}
        <div class="p-3 bg-[#535456] text-white">
          <h2 class="text-2xl">What happens next?</h2>
        </div>

        {/* Search and List Section */}
        <div class="flex flex-col h-full bg-[#414243] ">
          {/* Search Bar */}
          <div class="relative mb-4 p-6">
            <input
              type="text"
              class="w-full p-2 pl-10 rounded text-white placeholder-gray-400 border border-gray-500 focus:border-blue-500 outline-none transition-colors"
              placeholder="Search nodes..."
              onInput={(e) => setSearch(e.target.value)}
            />
            <svg
              class="absolute left-9 top-1/2 transform -translate-y-1/2 text-gray-300"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="20"
              height="20"
            >
              <path d="M10 2a8 8 0 105.293 14.293l4.707 4.707 1.414-1.414-4.707-4.707A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z" />
            </svg>
          </div>
          {/* Node List */}
          <ul class="flex-1 overflow-y-auto">
            {filteredNodes().map((item, index) => (
              <li
                class="mb-2 flex items-center justify-between p-3  rounded-lg relative group p-6 cursor-pointer"
                onClick={(e) => {
                  props.clickAddNodeHandler(
                    e,
                    item.data[0],
                    item.data[1],
                    item.data[2],
                    item.data[3]
                  );
                  props.setIsOpen(true);
                  props.closeSidebar();
                }}
              >
                <div class="flex items-center gap-5">
                  {item?.title == "Gmail" && (
                    <svg
                      fill="currentColor"
                      stroke-width="0"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      height="2em"
                      width="2em"
                      style="overflow: visible; color: currentcolor;"
                    >
                      <path d="m18.73 5.41-1.28 1L12 10.46 6.55 6.37l-1.28-1A2 2 0 0 0 2 7.05v11.59A1.36 1.36 0 0 0 3.36 20h3.19v-7.72L12 16.37l5.45-4.09V20h3.19A1.36 1.36 0 0 0 22 18.64V7.05a2 2 0 0 0-3.27-1.64z"></path>
                    </svg>
                  )}

                  {item?.title == "AI Agent" && (
                    <svg
                      fill="currentColor"
                      stroke-width="0"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 512"
                      height="2em"
                      width="2em"
                      style="overflow: visible; color: currentcolor;"
                    >
                      <path d="M320 0c17.7 0 32 14.3 32 32v64h120c39.8 0 72 32.2 72 72v272c0 39.8-32.2 72-72 72H168c-39.8 0-72-32.2-72-72V168c0-39.8 32.2-72 72-72h120V32c0-17.7 14.3-32 32-32zM208 384c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16h-32zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16h-32zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16h-32zM264 256a40 40 0 1 0-80 0 40 40 0 1 0 80 0zm152 40a40 40 0 1 0 0-80 40 40 0 1 0 0 80zM48 224h16v192H48c-26.5 0-48-21.5-48-48v-96c0-26.5 21.5-48 48-48zm544 0c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48h-16V224h16z"></path>
                    </svg>
                  )}
                  {item?.title == "Deployment" && (
                    <svg
                      fill="currentColor"
                      stroke-width="0"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 1024 1024"
                      height="1em"
                      width="1em"
                      style="overflow: visible; color: currentcolor;"
                    >
                      <path d="M888.3 693.2c-42.5-24.6-94.3-18-129.2 12.8l-53-30.7V523.6c0-15.7-8.4-30.3-22-38.1l-136-78.3v-67.1c44.2-15 76-56.8 76-106.1 0-61.9-50.1-112-112-112s-112 50.1-112 112c0 49.3 31.8 91.1 76 106.1v67.1l-136 78.3c-13.6 7.8-22 22.4-22 38.1v151.6l-53 30.7c-34.9-30.8-86.8-37.4-129.2-12.8-53.5 31-71.7 99.4-41 152.9 30.8 53.5 98.9 71.9 152.2 41 42.5-24.6 62.7-73 53.6-118.8l48.7-28.3 140.6 81c6.8 3.9 14.4 5.9 22 5.9s15.2-2 22-5.9L674.5 740l48.7 28.3c-9.1 45.7 11.2 94.2 53.6 118.8 53.3 30.9 121.5 12.6 152.2-41 30.8-53.6 12.6-122-40.7-152.9zm-673 138.4a47.6 47.6 0 0 1-65.2-17.6c-13.2-22.9-5.4-52.3 17.5-65.5a47.6 47.6 0 0 1 65.2 17.6c13.2 22.9 5.4 52.3-17.5 65.5zM522 463.8zM464 234a48.01 48.01 0 0 1 96 0 48.01 48.01 0 0 1-96 0zm170 446.2-122 70.3-122-70.3V539.8l122-70.3 122 70.3v140.4zm239.9 133.9c-13.2 22.9-42.4 30.8-65.2 17.6-22.8-13.2-30.7-42.6-17.5-65.5s42.4-30.8 65.2-17.6c22.9 13.2 30.7 42.5 17.5 65.5z"></path>
                    </svg>
                  )}
                  <div>
                    <h3 class="text-lg font-semibold">{item.title}</h3>
                    <p class="text-sm text-gray-300">{item.description}</p>
                  </div>
                </div>
                <svg
                  fill="currentColor"
                  stroke-width="0"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1024 1024"
                  height="1em"
                  width="1em"
                  style="overflow: visible; color: currentcolor;"
                >
                  <path d="M869 487.8 491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-.7 5.2-2L869 536.2a32.07 32.07 0 0 0 0-48.4z"></path>
                </svg>
                {index == 0 ? (
                  <div class="absolute left-0 top-0 h-full w-0.5 bg-orange-500 "></div>
                ) : null}
                <div class="absolute left-0 top-0 h-full w-1 bg-gray-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ButtonComponent;
