import { createSignal } from "solid-js";

const FullscreenComponent = (props) => {
  const [selected, setSelected] = createSignal("parameters"); // Default selected tab
  const [position, setPosition] = createSignal(0);
  let dragStartX = 0;

  const handleDragStart = (e) => {
    dragStartX = e.clientX;
  };

  const handleDrag = (e) => {
    if (e.clientX) {
      setPosition((prev) => prev + (e.clientX - dragStartX));
      dragStartX = e.clientX;
    }
  };

  const handleDragEnd = () => {
    if (position() < -200) setPosition(-200);
    if (position() > 200) setPosition(200);
  };

  return (
    <div>
      <div class="fixed top-0 left-0 w-screen h-screen bg-opacity-[20%] bg-[#454550] z-500 flex flex-col">
        {/* Back to Canvas */}
        <div
          class="p-4 flex items-center gap-2 cursor-pointer text-white font-bold"
          onClick={() => props.setIsOpen(false)}
        >
          <svg
            fill="currentColor"
            stroke-width="0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1024 1024"
            height="1em"
            width="1em"
            style="overflow: visible; color: currentcolor;"
          >
            <path d="M872 474H286.9l350.2-304c5.6-4.9 2.2-14-5.2-14h-88.5c-3.9 0-7.6 1.4-10.5 3.9L155 487.8a31.96 31.96 0 0 0 0 48.3L535.1 866c1.5 1.3 3.3 2 5.2 2h91.5c7.4 0 10.8-9.2 5.2-14L286.9 550H872c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path>
          </svg>
          <span class="text-white text-lg">Back to Canvas</span>
        </div>

        {/* Draggable Component */}
        <div class="flex bg-[#333333] w-[96%] mx-auto h-[96%] my-auto rounded-xl mb-5">
          <div class="w-1/4 text-white">Input</div>
          <div
            class="absolute mt-[-100px] left-1/2 transform -translate-x-1/2 top-1/4 w-80  rounded-lg "
            style={{ left: `${50 + position()}%` }}
            draggable
            onDragStart={handleDragStart}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
          >
            {/* Header */}
            <div class="bg-[#535456] p-4 flex justify-between items-center text-white">
              <div class="flex items-center gap-2">
                🤖 <span>AI Agent</span>
              </div>
              <button class="bg-[#fe6f5b] p-4 rounded flex items-center gap-2">
                🔍 Test Step
              </button>
            </div>

            {/* Navigation Tabs */}
            <div class="bg-[#414243] text-white px-4 pt-4 flex justify-between border-b border-gray-600">
              <div class="flex gap-4">
                <span
                  class={`cursor-pointer ${
                    selected() === "parameters"
                      ? "text-[#f76e5c] underline"
                      : "hover:text-[#f76e5c]"
                  }`}
                  onClick={() => setSelected("parameters")}
                >
                  Parameters
                </span>
                <span
                  class={`cursor-pointer ${
                    selected() === "settings"
                      ? "text-[#f76e5c] underline"
                      : "hover:text-[#f76e5c]"
                  }`}
                  onClick={() => setSelected("settings")}
                >
                  Settings
                </span>
              </div>
              <span class="cursor-pointer hover:text-[#f76e5c]">Docs</span>
            </div>

            {/* Dynamic Dropdown Menus */}
            <div class="bg-[#414243] text-white p-4">
              {selected() === "parameters" ? (
                <>
                  <div class="mb-4">
                    <label class="block">Dropdown 1</label>
                    <select class="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded">
                      <option>Option 1</option>
                      <option>Option 2</option>
                    </select>
                  </div>
                  <div class="mb-4">
                    <label class="block">Dropdown 2</label>
                    <select class="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded">
                      <option>Option 1</option>
                      <option>Option 2</option>
                    </select>
                  </div>
                </>
              ) : (
                <>
                  <div class="mb-4">
                    <label class="block">Setting 1</label>
                    <select class="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded">
                      <option>Option A</option>
                      <option>Option B</option>
                    </select>
                  </div>
                  <div class="mb-4">
                    <label class="block">Setting 2</label>
                    <select class="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded">
                      <option>Option A</option>
                      <option>Option B</option>
                    </select>
                  </div>
                </>
              )}
            </div>

            {/* Bottom "+" Buttons */}
            <div class="flex justify-between items-center gap-4 pb-4">
              {/* Model */}
              <div class="flex flex-col items-center">
                <span class="text-white text-sm mb-1">Model</span>
                <button class="w-8 h-8 flex items-center justify-center border-gray-600 text-white rounded-md hover:bg-[#f76e5c]">
                  ➕
                </button>
              </div>

              {/* Memory */}
              <div class="flex flex-col items-center">
                <span class="text-white text-sm mb-1">Memory</span>
                <button class="w-8 h-8 flex items-center justify-center border-gray-600 text-white rounded-md hover:bg-[#f76e5c]">
                  ➕
                </button>
              </div>

              {/* Tool */}
              <div class="flex flex-col items-center">
                <span class="text-white text-sm mb-1">Tool</span>
                <button class="w-8 h-8 flex items-center justify-center text-white border-gray-600 rounded-md hover:bg-[#f76e5c]">
                  ➕
                </button>
              </div>
            </div>
          </div>

          <div class="mx-auto text-white">Output</div>
        </div>
      </div>
    </div>
  );
};

export default FullscreenComponent;
