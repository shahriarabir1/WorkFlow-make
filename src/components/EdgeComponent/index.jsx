import { createEffect, createSignal } from "solid-js";
import styles from "./style.module.css";

const EdgeComponent = (props) => {
  const [middlePoint, setMiddlePoint] = createSignal({
    x: props.position.x0 + (props.position.x1 - props.position.x0) / 2,
    y: props.position.y0 + (props.position.y1 - props.position.y0) / 2,
  });

  const [isHovered, setIsHovered] = createSignal(false);

  createEffect(() => {
    const middleX =
      props.position.x0 + (props.position.x1 - props.position.x0) / 2;
    const middleY =
      props.position.y0 + (props.position.y1 - props.position.y0) / 2;
    setMiddlePoint({ x: middleX, y: middleY });
  });

  function handleMouseEnter() {
    setIsHovered(true);
  }

  function handleMouseLeave() {
    setTimeout(() => {
      if (!document.querySelector(".edge-buttons:hover")) {
        setIsHovered(false);
      }
    }, 100);
  }

  function handleOnMouseDownEdge(event) {
    event.stopPropagation();
    props.onMouseDownEdge();
  }

  function handleOnClickDelete(event) {
    event.stopPropagation();
    props.onClickDelete();
  }

  function handleOnClickAdd(event) {
    event.stopPropagation();
    props.onClickAdd();
  }

  return (
    <svg
      class="absolute top-0 left-0 w-full h-full pointer-events-none"
      onPointerEnter={handleMouseEnter}
      onPointerLeave={handleMouseLeave}
    >
      <path
        class={
          props.isNew
            ? styles.edgeNew
            : props.selected
            ? styles.edgeSelected
            : styles.edge
        }
        d={`M ${props.position.x0} ${props.position.y0} C ${
          props.position.x0 +
          Math.abs(props.position.x1 - props.position.x0) / 2
        } ${props.position.y0}, ${
          props.position.x1 -
          Math.abs(props.position.x1 - props.position.x0) / 2
        } ${props.position.y1}, ${props.position.x1} ${props.position.y1}`}
        onMouseDown={handleOnMouseDownEdge}
      />

      {/* Buttons Group */}
      {isHovered() && (
        <g
          class="cursor-pointer pointer-events-auto transition-all ease-linear duration-100 edge-buttons "
          transform={`translate(${middlePoint().x}, ${middlePoint().y - 24})`}
          onPointerEnter={() => setIsHovered(true)}
          onPointerLeave={() => setIsHovered(false)}
        >
          {/* Delete Button */}
          <g onMouseDown={handleOnClickDelete}>
            <foreignObject
              width="32"
              height="32"
              class="bg-[#414244] border-2 border-white rounded flex items-center justify-center hover:border-[#ff6f5c] text-white hover:text-[#ff6f5c]"
            >
              <svg
                fill="currentColor"
                stroke-width="0"
                width="22"
                height="22"
                viewBox="0 0 448 512"
                class="mx-auto my-auto"
              >
                <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0h120.4c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64s14.3-32 32-32h96l7.2-14.3zM32 128h384v320c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"></path>
              </svg>
            </foreignObject>
          </g>

          {/* Plus Button */}
          <g
            transform="translate(36, 0)"
            onClick={(e) => {
              e.stopPropagation();
              props.toggleSidebar();
            }}
          >
            <foreignObject
              width="32"
              height="32"
              class="bg-[#414244]  border-2 border-white rounded flex items-center justify-center hover:border-[#ff6f5c] text-white hover:text-[#ff6f5c]"
            >
              <svg
                fill="currentColor"
                stroke-width="0"
                width="22"
                height="22"
                viewBox="0 0 448 512"
                class="mx-auto my-auto"
              >
                <path d="M224 80c-13.3 0-24 10.7-24 24v96H104c-13.3 0-24 10.7-24 24s10.7 24 24 24h96v96c0 13.3 10.7 24 24 24s24-10.7 24-24v-96h96c13.3 0 24-10.7 24-24s-10.7-24-24-24h-96v-96c0-13.3-10.7-24-24-24z"></path>
              </svg>
            </foreignObject>
          </g>
        </g>
      )}
    </svg>
  );
};

export default EdgeComponent;
