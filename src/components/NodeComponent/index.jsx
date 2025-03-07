import styles from "./styles.module.css";
const NodeComponent = (props) => {
  function handleMouseDownOutput(ref, event, outputIndex) {
    event.stopPropagation();

    const centerX =
      ref.getBoundingClientRect().left +
      Math.abs(
        ref.getBoundingClientRect().right - ref.getBoundingClientRect().left
      ) /
        2;
    const centerY =
      ref.getBoundingClientRect().top +
      Math.abs(
        ref.getBoundingClientRect().bottom - ref.getBoundingClientRect().top
      ) /
        2;

    props.onMouseDownOutput(centerX, centerY, props.id, outputIndex);
  }

  function handleMouseEnterInput(ref, inputIndex) {
    const centerX =
      ref.getBoundingClientRect().left +
      Math.abs(
        ref.getBoundingClientRect().right - ref.getBoundingClientRect().left
      ) /
        2;
    const centerY =
      ref.getBoundingClientRect().top +
      Math.abs(
        ref.getBoundingClientRect().bottom - ref.getBoundingClientRect().top
      ) /
        2;

    props.onMouseEnterInput(centerX, centerY, props.id, inputIndex);
  }

  function handleMouseLeaveInput(inputIndex) {
    props.onMouseLeaveInput(props.id, inputIndex);
  }

  return (
    <div
      class={props.selected ? styles.nodeSelected : styles.node}
      style={{
        transform: `translate(${props.x}px, ${props.y}px)`,
      }}
      onMouseDown={(event) => {
        event.stopPropagation();

        props.onMouseDownNode(props.id, event);
      }}
    >
      <div class="absolute top-0 left-[-9px] h-full flex flex-col items-center justify-center gap-3 w-[12px] pointer-events-none">
        <For each={[...Array(Number(props.numberInputs)).keys()]}>
          {(_, index) => {
            let inputRef = null;
            return (
              <div
                ref={inputRef}
                class="w-[18px] h-[18px] rounded-full bg-[#e38c29] cursor-crosshair pointer-events-auto hover:bg-black"
                onMouseEnter={() => handleMouseEnterInput(inputRef, index())}
                onMouseLeave={() => handleMouseLeaveInput(index())}
              ></div>
            );
          }}
        </For>
      </div>
      {props.selected && (
        <button
          class="absolute top-[-10px] left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-2 py-1 text-sm rounded-md shadow-md hover:bg-green-600 transition-all"
          onClick={props.toggleSidebar}
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
            <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm192 472c0 4.4-3.6 8-8 8H544v152c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V544H328c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h152V328c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v152h152c4.4 0 8 3.6 8 8v48z"></path>
          </svg>
        </button>
      )}

      {props.name === "gmail" && (
        <div class="flex justify-center items-center w-full h-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 48 48"
          >
            <path fill="#EA4335" d="M4 12v24c0 2.2 1.8 4 4 4h4V18l-8-6z"></path>
            <path
              fill="#34A853"
              d="M36 40h4c2.2 0 4-1.8 4-4V12l-8 6v22z"
            ></path>
            <path
              fill="#FBBC04"
              d="M36 18V8h-4L24 14 16 8h-4v10l12 9 12-9z"
            ></path>
            <path fill="#4285F4" d="M36 40V18l-12 9-12-9v22h24z"></path>
          </svg>
        </div>
      )}
      {props.name === "aia" && (
        <div class="flex justify-center items-center w-full h-full">
          <svg
            fill="currentColor"
            stroke-width="0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 512"
            height="5em"
            width="5em"
            style="overflow: visible; color: currentcolor;"
          >
            <path d="M320 0c17.7 0 32 14.3 32 32v64h120c39.8 0 72 32.2 72 72v272c0 39.8-32.2 72-72 72H168c-39.8 0-72-32.2-72-72V168c0-39.8 32.2-72 72-72h120V32c0-17.7 14.3-32 32-32zM208 384c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16h-32zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16h-32zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16h-32zM264 256a40 40 0 1 0-80 0 40 40 0 1 0 80 0zm152 40a40 40 0 1 0 0-80 40 40 0 1 0 0 80zM48 224h16v192H48c-26.5 0-48-21.5-48-48v-96c0-26.5 21.5-48 48-48zm544 0c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48h-16V224h16z"></path>
          </svg>
        </div>
      )}

      <div class="absolute top-0 right-[-9px] h-full flex flex-col items-center justify-center gap-5 w-[12px] pointer-events-none">
        <For each={[...Array(Number(props.numberOutputs)).keys()]}>
          {(_, index) => {
            let outputRef = null;
            return (
              <div
                ref={outputRef}
                class="w-[18px] h-[18px] rounded-full bg-[#e38c29] hover:bg-red-500 cursor-crosshair pointer-events-auto"
                onMouseDown={(event) =>
                  handleMouseDownOutput(outputRef, event, index())
                }
              ></div>
            );
          }}
        </For>
      </div>
      {props.selected && (
        <button
          class="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-2 py-1 text-sm rounded-md shadow-md hover:bg-red-600 transition-all"
          onClick={props.onClickDeleteNode}
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
            <path d="M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zm-200 0H360v-72h304v72z"></path>
          </svg>
        </button>
      )}
    </div>
  );
};

export default NodeComponent;
