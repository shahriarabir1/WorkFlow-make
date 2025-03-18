import { createSignal } from "solid-js";
import styles from "./styles.module.css";
const NodeComponent = (props) => {
  console.log(props.edge);

  const [show, setShow] = createSignal(false);
  let upperDivRef = null;
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
  function handleMouseEnterNode() {
    setShow(true);
  }

  function handleMouseLeaveNode() {
    setTimeout(() => {
      // Only hide if the mouse isn't over the upper div
      if (!upperDivRef || !upperDivRef.matches(":hover")) {
        setShow(false);
      }
    }, 100);
  }

  return (
    <div
      class={
        props.selected
          ? props.name === "aia"
            ? styles.nodeSelected
            : props.name === "gmail"
            ? styles.nodeg
            : styles.nodeSelected
          : props.name === "gmail"
          ? styles.nodeGmail
          : styles.node
      }
      style={{
        transform: `translate(${props.x}px, ${props.y}px)`,
      }}
      onMouseDown={(event) => {
        //prevent Click on board
        event.stopPropagation();

        props.onMouseDownNode(props.id, event);
      }}
      onMouseOver={handleMouseEnterNode}
      onMouseLeave={handleMouseLeaveNode}
    >
      {show() && (
        <div
          ref={upperDivRef}
          class="flex items-center gap-5 absolute top-[-50px] right-0  h-8 bg-[#2e2e2e]"
          onMouseEnter={() => setShow(true)} // Prevent hiding when mouse is over upper div
          onMouseLeave={() => setShow(false)} // Hide when the mouse leaves the upper div
        >
          {/* Play Button */}
          <div class="text-[#c3c9d5] hover:text-[#e75e69]">
            <svg
              fill="currentColor"
              stroke-width="0"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              height="2em"
              width="2em"
              style="overflow: visible; color: currentcolor;"
            >
              <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
            </svg>
          </div>
          {/* Run Button */}
          <div class="text-[#c3c9d5]  hover:text-[#e75e69]">
            <svg
              fill="currentColor"
              stroke-width="0"
              xmlns="http://www.w3.org/2000/svg"
              baseProfile="tiny"
              version="1.2"
              viewBox="0 0 24 24"
              height="2em"
              width="2em"
              style="overflow: visible; color: currentcolor;"
            >
              <path d="M11.5 18.573a6.46 6.46 0 0 1-4.596-1.903C5.677 15.442 5 13.81 5 12.073s.677-3.369 1.904-4.597A.999.999 0 1 1 8.318 8.89C7.468 9.741 7 10.871 7 12.073s.468 2.333 1.318 3.183c.85.85 1.979 1.317 3.182 1.317s2.332-.468 3.182-1.317c.851-.85 1.318-1.98 1.318-3.183s-.468-2.333-1.318-3.183a.999.999 0 1 1 1.414-1.414C17.323 8.705 18 10.337 18 12.073s-.677 3.369-1.904 4.597a6.46 6.46 0 0 1-4.596 1.903zm0-7.573a1 1 0 0 1-1-1V5a1 1 0 1 1 2 0v5a1 1 0 0 1-1 1z"></path>
            </svg>
          </div>
          {/* Delete Button */}
          <div
            class="text-[#c3c9d5]  hover:text-[#e75e69]"
            onClick={props.onClickDeleteNode}
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
              <path d="M135.2 17.7 128 32H32C14.3 32 0 46.3 0 64s14.3 32 32 32h384c17.7 0 32-14.3 32-32s-14.3-32-32-32h-96l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32l21.2 339c1.6 25.3 22.6 45 47.9 45h245.8c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
            </svg>
          </div>

          {/* Menu Button */}
          <div class="text-[#c3c9d5]  hover:text-[#e75e69]">
            <svg
              fill="currentColor"
              stroke-width="0"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              height="2em"
              width="2em"
              style="overflow: visible; color: currentcolor;"
            >
              <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
            </svg>
          </div>
        </div>
      )}

      <div class="absolute top-0 left-[-9px] h-full flex flex-col items-center justify-center gap-3 w-[12px] pointer-events-none">
        <For each={[...Array(Number(props.numberInputs)).keys()]}>
          {(_, index) => {
            let inputRef = null;
            return (
              <div
                ref={inputRef}
                class="w-[10px] h-[25px]  bg-[#c3c9d5] cursor-crosshair pointer-events-auto hover:bg-[#e75e69]"
                onMouseEnter={() => handleMouseEnterInput(inputRef, index())}
                onMouseLeave={() => handleMouseLeaveInput(index())}
              ></div>
            );
          }}
        </For>
      </div>

      {props.name === "gmail" && (
        <div class="flex justify-center items-center w-1/2 h-full text-white">
          <svg
            fill="currentColor"
            stroke-width="0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            height="7em"
            width="7em"
            style="overflow: visible; color: currentcolor;"
          >
            <path
              fill="currentColor"
              d="M10.001 14.676v-.062c0-2.508 2.017-4.618 4.753-5.233-.364-2.302-2.794-4.18-5.853-4.18-3.32 0-5.9 2.213-5.9 4.779 0 .969.36 1.9 1.04 2.698.032.038.083.094.152.165a3.568 3.568 0 0 1 1.002 2.238 3.613 3.613 0 0 1 2.363-.442c.166.026.302.046.405.06a7.253 7.253 0 0 0 2.038-.023Zm.457 1.951a9.204 9.204 0 0 1-2.753.055 18.997 18.997 0 0 1-.454-.066 1.613 1.613 0 0 0-1.08.211l-1.904 1.148a.806.806 0 0 1-.49.117.791.791 0 0 1-.729-.851l.15-1.781a1.565 1.565 0 0 0-.439-1.223 5.558 5.558 0 0 1-.241-.262c-.954-1.12-1.517-2.502-1.517-3.995 0-3.745 3.537-6.78 7.9-6.78 4.06 0 7.403 2.627 7.85 6.008 3.371.154 6.05 2.515 6.05 5.406 0 1.193-.456 2.296-1.229 3.19-.051.06-.116.13-.195.21a1.24 1.24 0 0 0-.356.977l.121 1.422a.635.635 0 0 1-.59.68.66.66 0 0 1-.396-.094l-1.544-.917a1.322 1.322 0 0 0-.874-.169c-.147.023-.27.04-.368.053-.316.04-.64.062-.969.062-2.694 0-4.998-1.408-5.943-3.4Zm6.977 1.31a3.326 3.326 0 0 1 1.675.174 3.25 3.25 0 0 1 .842-1.501c.05-.051.087-.09.106-.113.489-.565.743-1.213.743-1.883 0-1.804-1.903-3.414-4.4-3.414-2.497 0-4.4 1.61-4.4 3.414s1.903 3.414 4.4 3.414a5.6 5.6 0 0 0 .714-.045c.08-.01.188-.026.32-.046Z"
            ></path>
          </svg>
        </div>
      )}
      {props.name === "aia" && (
        <div class="flex  items-center w-full h-full text-white gap-x-6 ml-10">
          <svg
            class="svg-inline--fa fa-robot fa-w-20"
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="robot"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 512"
            style="width: 50px; height: 50px; max-width: none;"
          >
            <path
              fill="currentColor"
              d="M32,224H64V416H32A31.96166,31.96166,0,0,1,0,384V256A31.96166,31.96166,0,0,1,32,224Zm512-48V448a64.06328,64.06328,0,0,1-64,64H160a64.06328,64.06328,0,0,1-64-64V176a79.974,79.974,0,0,1,80-80H288V32a32,32,0,0,1,64,0V96H464A79.974,79.974,0,0,1,544,176ZM264,256a40,40,0,1,0-40,40A39.997,39.997,0,0,0,264,256Zm-8,128H192v32h64Zm96,0H288v32h64ZM456,256a40,40,0,1,0-40,40A39.997,39.997,0,0,0,456,256Zm-8,128H384v32h64ZM640,256V384a31.96166,31.96166,0,0,1-32,32H576V224h32A31.96166,31.96166,0,0,1,640,256Z"
            ></path>
          </svg>

          <div class="flex flex-col gap-1">
            <p
              class="text-[24px] font-sans font-semibold"
              style="font-family: 'Open Sans', sans-serif;"
            >
              AI Agent
            </p>
            <p
              class="text-[18px] font-sans text-[#a49e9c]"
              style="font-family: 'Open Sans', sans-serif;"
            >
              Tools Agent
            </p>
          </div>
          {props.others && (
            <div class="flex ">
              {/* model */}
              {props.others.model && (
                <div>
                  <div
                    class="absolute bottom-[-13px] left-1/5 transform -translate-x-1/2 cursor-pointer z-100 text-[#8c8ea6] hover:text-[#e75e69]"
                    onClick={props.onClickDeleteNode}
                  >
                    <svg
                      fill="currentColor"
                      stroke-width="0"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      height="1.5em"
                      width="1.5em"
                      style="overflow: visible; color: currentcolor;"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.482 1.482 0 0 1 0-2.098L6.95.435z"
                      ></path>
                    </svg>
                  </div>
                  <div class="w-[2px] h-[60px] bg-[#c3c9d5] absolute bottom-[-73px] left-1/5 transform -translate-x-1/2 z-1"></div>
                  <div class="flex gap-1 bg-[#2e2e2e] absolute bottom-[-35px] left-1/5 transform -translate-x-1/2 z-100 text-[#c3c9d5] text-[12px]">
                    Chat Model <span class="text-red-500 font-bold">*</span>
                  </div>
                  <button
                    class="absolute bottom-[-100px] left-[50px] cursor-pointer z-100 text-[#c3c9d5] hover:text-[#e75e69] rounded-md"
                    onClick={(e) => {
                      e.stopPropagation();
                      props.toggleSidebar();
                    }}
                  >
                    <svg
                      fill="currentColor"
                      stroke-width="0"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      height="2em"
                      width="2em"
                      style="overflow: visible; color: currentcolor;"
                    >
                      <path d="M64 80c-8.8 0-16 7.2-16 16v320c0 8.8 7.2 16 16 16h320c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96c0-35.3 28.7-64 64-64h320c35.3 0 64 28.7 64 64v320c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zm200 248v-64h-64c-13.3 0-24-10.7-24-24s10.7-24 24-24h64v-64c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24h-64v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"></path>
                    </svg>
                  </button>
                </div>
              )}

              {/* memory and tool */}
              {props.others.memory && (
                <div>
                  {/* memory */}
                  <div>
                    <div
                      class="absolute bottom-[-13px] right-1/8 transform -translate-x-1/2 cursor-pointer z-100 text-[#8c8ea6] hover:text-[#e75e69] "
                      onClick={props.onClickDeleteNode}
                    >
                      <svg
                        fill="currentColor"
                        stroke-width="0"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        height="1.5em"
                        width="1.5em"
                        style="overflow: visible; color: currentcolor;"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.482 1.482 0 0 1 0-2.098L6.95.435z"
                        ></path>
                      </svg>
                    </div>
                    <div class="w-[2px] h-[60px] bg-[#c3c9d5] absolute bottom-[-73px] right-16 transform -translate-x-1/2 z-1"></div>
                    <div class="bg-[#2e2e2e] absolute bottom-[-35px] right-23 transform -translate-x-1/2 z-100 text-[#c3c9d5] text-[12px]">
                      Memory
                    </div>
                    <button
                      class="absolute bottom-[-100px] right-29 cursor-pointer z-100 text-[#c3c9d5] hover:text-[#e75e69] rounded-md"
                      onClick={(e) => {
                        e.stopPropagation();
                        props.toggleSidebar();
                      }}
                    >
                      <svg
                        fill="currentColor"
                        stroke-width="0"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        height="2em"
                        width="2em"
                        style="overflow: visible; color: currentcolor;"
                      >
                        <path d="M64 80c-8.8 0-16 7.2-16 16v320c0 8.8 7.2 16 16 16h320c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96c0-35.3 28.7-64 64-64h320c35.3 0 64 28.7 64 64v320c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zm200 248v-64h-64c-13.3 0-24-10.7-24-24s10.7-24 24-24h64v-64c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24h-64v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"></path>
                      </svg>
                    </button>
                  </div>

                  {/* Tool */}
                  <div>
                    <div
                      class="absolute bottom-[-13px] right-1/3 transform -translate-x-1/2 cursor-pointer z-100 text-[#8c8ea6] hover:text-[#e75e69] "
                      onClick={props.onClickDeleteNode}
                    >
                      <svg
                        fill="currentColor"
                        stroke-width="0"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        height="1.5em"
                        width="1.5em"
                        style="overflow: visible; color: currentcolor;"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.482 1.482 0 0 1 0-2.098L6.95.435z"
                        ></path>
                      </svg>
                    </div>
                    <div class="w-[2px] h-[60px] bg-[#c3c9d5] absolute bottom-[-73px] right-33 transform -translate-x-1/2 z-1"></div>
                    <div class="bg-[#2e2e2e] absolute bottom-[-35px] right-[45px] transform -translate-x-1/2 z-100 text-[#c3c9d5] text-[12px]">
                      Tool
                    </div>
                    <button
                      class="absolute bottom-[-100px] right-[48px] cursor-pointer z-100 text-[#c3c9d5] hover:text-[#e75e69] rounded-md"
                      onClick={(e) => {
                        e.stopPropagation();
                        props.toggleSidebar();
                      }}
                    >
                      <svg
                        fill="currentColor"
                        stroke-width="0"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        height="2em"
                        width="2em"
                        style="overflow: visible; color: currentcolor;"
                      >
                        <path d="M64 80c-8.8 0-16 7.2-16 16v320c0 8.8 7.2 16 16 16h320c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96c0-35.3 28.7-64 64-64h320c35.3 0 64 28.7 64 64v320c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zm200 248v-64h-64c-13.3 0-24-10.7-24-24s10.7-24 24-24h64v-64c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24h-64v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <div class="absolute top-0 right-[-9px] h-full flex flex-col items-center justify-center gap-7 w-[12px]">
        <For each={[...Array(Number(props.numberOutputs)).keys()]}>
          {(_, index) => {
            let outputRef = null;
            return (
              <div class="relative flex ">
                {/* Output Circle */}
                <div
                  ref={outputRef}
                  class="w-[18px] h-[18px] rounded-full bg-[#c3c9d5] hover:bg-[#e75e69] cursor-crosshair pointer-events-auto z-100"
                  onMouseDown={(event) =>
                    handleMouseDownOutput(outputRef, event, index())
                  }
                ></div>

                {/* Line extending from the center of the output */}
                {props.edge < 1 || props.edges.length < 1 ? (
                  <div>
                    <div class="ml-[25px] w-[60px] h-[2px] bg-[#c3c9d5] absolute top-[50%] left-1/2 transform -translate-x-1/2 z-50"></div>
                    <button
                      class="absolute top-[-25%] left-15 cursor-pointer z-100 text-[#c3c9d5] hover:text-[#e75e69] rounded-md"
                      onClick={(e) => {
                        e.stopPropagation();
                        props.toggleSidebar();
                      }}
                    >
                      <svg
                        fill="currentColor"
                        stroke-width="0"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        height="2em"
                        width="2em"
                        style="overflow: visible; color: currentcolor;"
                      >
                        <path d="M64 80c-8.8 0-16 7.2-16 16v320c0 8.8 7.2 16 16 16h320c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96c0-35.3 28.7-64 64-64h320c35.3 0 64 28.7 64 64v320c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zm200 248v-64h-64c-13.3 0-24-10.7-24-24s10.7-24 24-24h64v-64c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24h-64v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"></path>
                      </svg>
                    </button>
                  </div>
                ) : null}
              </div>
            );
          }}
        </For>
      </div>
    </div>
  );
};

export default NodeComponent;
