const ZoomButtons = (props) => {
  return (
    <div class="fixed bottom-4 left-4 flex  gap-2 p-2 ">
      {/* Zoom to Fit Button */}
      <button
        class="px-3 py-2 border-1 border-white rounded text-white hover:text-red-400 hover:border-red-400"
        onClick={props.zoomToFit}
      >
        <svg
          fill="none"
          stroke-width="2"
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-focus-centered"
          width="1.5em"
          height="1.5em"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          style="overflow: visible; color: currentcolor;"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
          <path d="M4 8v-2a2 2 0 0 1 2 -2h2"></path>
          <path d="M4 16v2a2 2 0 0 0 2 2h2"></path>
          <path d="M16 4h2a2 2 0 0 1 2 2v2"></path>
          <path d="M16 20h2a2 2 0 0 0 2 -2v-2"></path>
        </svg>
      </button>
      {/* Zoom In Button */}
      <button
        class="px-3 py-2 border-1 border-white rounded text-white hover:text-red-400 hover:border-red-400"
        onClick={props.zoomIn}
      >
        <svg
          fill="none"
          stroke-width="0"
          xmlns="http://www.w3.org/2000/svg"
          stroke="currentColor"
          viewBox="0 0 24 24"
          height="1.5em"
          width="1.5em"
          style="overflow: visible; color: currentcolor;"
        >
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Zm8.25-3.75a.75.75 0 0 1 .75.75v2.25h2.25a.75.75 0 0 1 0 1.5h-2.25v2.25a.75.75 0 0 1-1.5 0v-2.25H7.5a.75.75 0 0 1 0-1.5h2.25V7.5a.75.75 0 0 1 .75-.75Z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>

      {/* Zoom Out Button */}
      <button
        class="px-3 py-2 border-1 border-white rounded text-white hover:text-red-400 hover:border-red-400"
        onClick={props.zoomOut}
      >
        <svg
          fill="none"
          stroke-width="0"
          xmlns="http://www.w3.org/2000/svg"
          stroke="currentColor"
          viewBox="0 0 24 24"
          height="1.5em"
          width="1.5em"
          style="overflow: visible; color: currentcolor;"
        >
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Zm4.5 0a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>

      {/* Reset Zoom Button (Visible Only When Zoomed In) */}
      <Show when={props.zoomLevel >= 0.8}>
        <button
          class="px-3 py-2 border-1 border-white rounded text-white hover:text-red-400 hover:border-red-400"
          onClick={props.resetZoom}
        >
          <svg
            fill="currentColor"
            stroke-width="0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            height="1.5em"
            width="1.5em"
            style="overflow: visible; color: currentcolor;"
          >
            <path d="M12 16c1.671 0 3-1.331 3-3s-1.329-3-3-3-3 1.331-3 3 1.329 3 3 3z"></path>
            <path d="M20.817 11.186a8.94 8.94 0 0 0-1.355-3.219 9.053 9.053 0 0 0-2.43-2.43 8.95 8.95 0 0 0-3.219-1.355 9.028 9.028 0 0 0-1.838-.18V2L8 5l3.975 3V6.002c.484-.002.968.044 1.435.14a6.961 6.961 0 0 1 2.502 1.053 7.005 7.005 0 0 1 1.892 1.892A6.967 6.967 0 0 1 19 13a7.032 7.032 0 0 1-.55 2.725 7.11 7.11 0 0 1-.644 1.188 7.2 7.2 0 0 1-.858 1.039 7.028 7.028 0 0 1-3.536 1.907 7.13 7.13 0 0 1-2.822 0 6.961 6.961 0 0 1-2.503-1.054 7.002 7.002 0 0 1-1.89-1.89A6.996 6.996 0 0 1 5 13H3a9.02 9.02 0 0 0 1.539 5.034 9.096 9.096 0 0 0 2.428 2.428A8.95 8.95 0 0 0 12 22a9.09 9.09 0 0 0 1.814-.183 9.014 9.014 0 0 0 3.218-1.355 8.886 8.886 0 0 0 1.331-1.099 9.228 9.228 0 0 0 1.1-1.332A8.952 8.952 0 0 0 21 13a9.09 9.09 0 0 0-.183-1.814z"></path>
          </svg>
        </button>
      </Show>
    </div>
  );
};

export default ZoomButtons;
