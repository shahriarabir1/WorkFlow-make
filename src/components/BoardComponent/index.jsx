import { createEffect, createSignal, onCleanup, onMount } from "solid-js";
import ButtonComponent from "../ButtonComponent";
import NodeComponent from "../NodeComponent";
import EdgeComponent from "../EdgeComponent";
import FullscreenComponent from "../Common/Screen/FullScreen";

const BoardComponent = () => {
  const [grabbingBoard, setGrabbingBoard] = createSignal(false);
  const [selectedNode, setSelectedNode] = createSignal(null);
  const [selectedEdge, setSelectedEdge] = createSignal(null);
  const [newEdge, setNewEdge] = createSignal(null);
  const [insideInput, setInsideInput] = createSignal(null);

  const [clickedPosition, setClickedPosition] = createSignal({ x: -1, y: -1 });

  const [nodes, setNodes] = createSignal([]);
  const [edges, setEdges] = createSignal([]);
  const [scale, setScale] = createSignal(1);
  const [sidebarVisible, setSidebarVisible] = createSignal(false);
  const [isOpen, setIsOpen] = createSignal(false);
  const [ctrlPressed, setCtrlPressed] = createSignal(false);
  const [spacePressed, setSpacePressed] = createSignal(false);
  const [zoomLevel, setZoomLevel] = createSignal(1);
  let containerRef;

  const zoomIn = () => setZoomLevel((z) => Math.min(z * 1.2, 3));
  const zoomOut = () => setZoomLevel((z) => Math.max(z / 1.2, 0.5));
  const resetZoom = () => setZoomLevel(1);
  const zoomToFit = () => {
    // Implement logic to adjust zoom to fit nodes
    setZoomLevel(1);
  };
  onMount(() => {
    const boardElement = document.getElementById("board");
    if (!boardElement) return;

    const handleWheel = (event) => {
      if (ctrlPressed()) {
        event.preventDefault(); // Prevent default browser zoom
        setScale((prev) =>
          Math.min(Math.max(1, prev + event.deltaY * -0.005), 2)
        );
        boardElement.style.transform = `scale(${scale()})`;
      } else if (spacePressed()) {
        event.preventDefault(); // Prevent default browser zoom
        setScale((prev) =>
          Math.min(Math.max(1, prev + event.deltaY * -0.005), 2)
        );
        boardElement.style.transform = `scale(${scale()})`;
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Control") {
        setCtrlPressed(true);
      }
      if (event.key === " ") {
        event.preventDefault(); // Prevent scrolling when spacebar is pressed
        setSpacePressed(true);
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === "Control") {
        setCtrlPressed(false);
      }
      if (event.key === " ") {
        setSpacePressed(false);
      }
    };

    boardElement.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
  });
  onCleanup(() => {
    boardElement.removeEventListener("wheel", handleWheel);
    window.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("keyup", handleKeyUp);
  });

  //make the sidebar visible only when click on + button
  const toggleSidebar = () => {
    setSidebarVisible(true);
  };

  const closeSidebar = () => {
    setSidebarVisible(false);
  };

  const clickAddNodeHandler = (e, input, output, others, name) => {
    e.stopPropagation();
    handleOnClickAdd(input, output, others, name);
  };

  createEffect(() => {
    const boardWrapperElement = document.getElementById("boardWrapper");
    if (boardWrapperElement) {
      boardWrapperElement.style.overflow = scale() > 1 ? "scroll" : "hidden";
    }
  });

  function handleOnMouseDownBoard(event) {
    setSelectedNode(null);

    setSelectedEdge(null);

    if (ctrlPressed() || spacePressed()) {
      setGrabbingBoard(true);
      setClickedPosition({ x: event.x, y: event.y });
    }
  }

  function handleOnMouseUpBoard() {
    setGrabbingBoard(false);
    setClickedPosition({ x: -1, y: -1 });

    if (newEdge() !== null && insideInput() === null) {
      setNewEdge(null);
    }

    if (newEdge() !== null && insideInput() !== null) {
      const nodeStartId = newEdge().nodeStartId;
      const nodeEndId = insideInput().nodeId;

      const nodeStart = nodes().find((node) => node.id === nodeStartId);
      const nodeEnd = nodes().find((node) => node.id === nodeEndId);

      const boardWrapperElement = document.getElementById("boardWrapper");

      if (nodeStart && nodeEnd && boardWrapperElement) {
        const edgeId = `edge_${nodeStart.id}_${newEdge()?.outputIndex}_${
          nodeEnd.id
        }_${insideInput()?.inputIndex}`;

        if (
          nodeStart.outputEdgeIds.get().includes(edgeId) &&
          nodeEnd.inputEdgeIds.get().includes(edgeId)
        ) {
          setNewEdge(null);
          return;
        }

        nodeStart.outputEdgeIds.set([...nodeStart.outputEdgeIds.get(), edgeId]);
        nodeEnd.inputEdgeIds.set([...nodeEnd.inputEdgeIds.get(), edgeId]);

        newEdge().prevStartPosition.set(() => {
          return {
            x:
              (newEdge().currStartPosition.get().x +
                boardWrapperElement.scrollLeft) /
              scale(),
            y:
              (newEdge().currStartPosition.get().y +
                boardWrapperElement.scrollTop) /
              scale(),
          };
        });

        newEdge().prevEndPosition.set(() => {
          return {
            x:
              (insideInput().positionX + boardWrapperElement.scrollLeft) /
              scale(),
            y:
              (insideInput().positionY + boardWrapperElement.scrollTop) /
              scale(),
          };
        });

        newEdge().currEndPosition.set(() => {
          return {
            x:
              (insideInput().positionX + boardWrapperElement.scrollLeft) /
              scale(),
            y:
              (insideInput().positionY + boardWrapperElement.scrollTop) /
              scale(),
          };
        });

        setEdges([
          ...edges(),
          {
            ...newEdge(),
            id: edgeId,
            nodeEndId: nodeEnd.id,
            nodeEndInputIndex: insideInput().inputIndex,
          },
        ]);

        setNewEdge(null);
      }
    }
  }

  function handleOnMouseMove(event) {
    if (clickedPosition().x >= 0 && clickedPosition().y >= 0) {
      // User clicked on node
      if (selectedNode() !== null) {
        const deltaX = event.x - clickedPosition().x;
        const deltaY = event.y - clickedPosition().y;

        const node = nodes().find((node) => node.id === selectedNode());
        if (node) {
          node.currPosition.set((_) => {
            return {
              x: (node.prevPosition.get().x + deltaX) / scale(),
              y: (node.prevPosition.get().y + deltaY) / scale(),
            };
          });

          for (let i = 0; i < node.inputEdgeIds.get().length; i++) {
            const edgeId = node.inputEdgeIds.get()[i];
            const edge = edges().find((edge) => edge.id === edgeId);
            if (edge) {
              edge.currEndPosition.set((_) => {
                return {
                  x: (edge.prevEndPosition.get().x + deltaX) / scale(),
                  y: (edge.prevEndPosition.get().y + deltaY) / scale(),
                };
              });
            }
          }

          for (let i = 0; i < node.outputEdgeIds.get().length; i++) {
            const edgeId = node.outputEdgeIds.get()[i];
            const edge = edges().find((edge) => edge.id === edgeId);
            if (edge) {
              edge.currStartPosition.set((_) => {
                return {
                  x: (edge.prevStartPosition.get().x + deltaX) / scale(),
                  y: (edge.prevStartPosition.get().y + deltaY) / scale(),
                };
              });
            }
          }
        }
      } else {
        if (grabbingBoard()) {
          const deltaX = event.x - clickedPosition().x;
          const deltaY = event.y - clickedPosition().y;

          const boardWrapperElement = document.getElementById("boardWrapper");
          if (boardWrapperElement) {
            boardWrapperElement.scrollBy(-deltaX, -deltaY);
            setClickedPosition({ x: event.x, y: event.y });
          }
        }
      }
    }

    if (newEdge() !== null) {
      const boardWrapperElement = document.getElementById("boardWrapper");
      if (boardWrapperElement) {
        newEdge()?.currEndPosition.set({
          x: (event.x + boardWrapperElement.scrollLeft) / scale(),
          y: (event.y + +boardWrapperElement.scrollTop) / scale(),
        });
      }
    }
  }

  function handleOnMouseDownNode(id, event) {
    setSelectedEdge(null);

    setSelectedNode(id);

    setClickedPosition({ x: event.x, y: event.y });

    const node = nodes().find((node) => node.id === selectedNode());
    if (node) {
      node.prevPosition.set((_) => {
        return {
          x: node.currPosition.get().x * scale(),
          y: node.currPosition.get().y * scale(),
        };
      });

      for (let i = 0; i < node.inputEdgeIds.get().length; i++) {
        const edgeId = node.inputEdgeIds.get()[i];
        const edge = edges().find((edge) => edge.id === edgeId);
        if (edge) {
          edge.prevEndPosition.set((_) => {
            return {
              x: edge.currEndPosition.get().x * scale(),
              y: edge.currEndPosition.get().y * scale(),
            };
          });
        }
      }

      for (let i = 0; i < node.outputEdgeIds.get().length; i++) {
        const edgeId = node.outputEdgeIds.get()[i];
        const edge = edges().find((edge) => edge.id === edgeId);
        if (edge) {
          edge.prevStartPosition.set((_) => {
            return {
              x: edge.currStartPosition.get().x * scale(),
              y: edge.currStartPosition.get().y * scale(),
            };
          });
        }
      }
    }
  }

  function handleOnClickAdd(numberInputs, numberOutputs, others, name) {
    const randomX = Math.random() * window.innerWidth;
    const randomY = Math.random() * window.innerHeight;

    const [nodePrev, setNodePrev] = createSignal({ x: randomX, y: randomY });
    const [nodeCurr, setNodeCurr] = createSignal({ x: randomX, y: randomY });
    const [inputsEdgesIds, setInputsEdgesIds] = createSignal([]);
    const [outputsEdgesIds, setOutputsEdgesIds] = createSignal([]);

    setNodes([
      ...nodes(),
      {
        id: `node_${Math.random().toString(36).substring(2, 8)}`,
        numberInputs: numberInputs,
        numberOutputs: numberOutputs,
        prevPosition: { get: nodePrev, set: setNodePrev },
        currPosition: { get: nodeCurr, set: setNodeCurr },
        inputEdgeIds: { get: inputsEdgesIds, set: setInputsEdgesIds },
        outputEdgeIds: { get: outputsEdgesIds, set: setOutputsEdgesIds },
        name: name,
        others: others,
      },
    ]);
  }

  function handleOnClickDelete() {
    const node = nodes().find((node) => node.id === selectedNode());

    if (!node) {
      setSelectedNode(null);
      return;
    }

    const inputs = node.inputEdgeIds.get();
    const outputs = node.outputEdgeIds.get();

    const allEdges = [...inputs, ...outputs];
    const uniqueEdges = allEdges.filter((value, index, array) => {
      return array.indexOf(value) === index;
    });

    for (let i = 0; i < uniqueEdges.length; i++) {
      const edge = edges().find((edge) => edge.id === uniqueEdges[i]);
      if (edge) {
        const nodeStart = nodes().find((node) => node.id === edge.nodeStartId);
        const nodeEnd = nodes().find((node) => node.id === edge.nodeEndId);

        nodeStart?.outputEdgeIds.set([
          ...nodeStart.outputEdgeIds
            .get()
            .filter((edgeId) => edgeId !== uniqueEdges[i]),
        ]);
        nodeEnd?.inputEdgeIds.set([
          ...nodeEnd.inputEdgeIds
            .get()
            .filter((edgeId) => edgeId !== uniqueEdges[i]),
        ]);

        setEdges([...edges().filter((e) => edge.id !== e.id)]);
      }
    }

    setNodes([...nodes().filter((node) => node.id !== selectedNode())]);
    setSelectedNode(null);
  }

  function handleOnMouseDownOutput(
    outputPositionX,
    outputPositionY,
    nodeId,
    outputIndex
  ) {
    setSelectedNode(null);

    const boardWrapperElement = document.getElementById("boardWrapper");

    if (boardWrapperElement) {
      const [prevEdgeStart, setPrevEdgeStart] = createSignal({
        x: (outputPositionX + boardWrapperElement.scrollLeft) / scale(),
        y: (outputPositionY + boardWrapperElement.scrollTop) / scale(),
      });
      const [currEdgeStart, setCurrEdgeStart] = createSignal({
        x: (outputPositionX + boardWrapperElement.scrollLeft) / scale(),
        y: (outputPositionY + boardWrapperElement.scrollTop) / scale(),
      });
      const [prevEdgeEnd, setPrevEdgeEnd] = createSignal({
        x: (outputPositionX + boardWrapperElement.scrollLeft) / scale(),
        y: (outputPositionY + boardWrapperElement.scrollTop) / scale(),
      });
      const [currEdgeEnd, setCurrEdgeEnd] = createSignal({
        x: (outputPositionX + boardWrapperElement.scrollLeft) / scale(),
        y: (outputPositionY + boardWrapperElement.scrollTop) / scale(),
      });

      setNewEdge({
        id: "",
        nodeStartId: nodeId,
        outputIndex: outputIndex,
        nodeEndId: "",
        inputIndex: -1,
        prevStartPosition: { get: prevEdgeStart, set: setPrevEdgeStart },
        currStartPosition: { get: currEdgeStart, set: setCurrEdgeStart },
        prevEndPosition: { get: prevEdgeEnd, set: setPrevEdgeEnd },
        currEndPosition: { get: currEdgeEnd, set: setCurrEdgeEnd },
      });
    }
  }

  function handleOnMouseEnterInput(
    inputPositionX,
    inputPositionY,
    nodeId,
    inputIndex
  ) {
    setInsideInput({
      nodeId,
      inputIndex,
      positionX: inputPositionX,
      positionY: inputPositionY,
    });
  }

  function handleOnMouseLeaveInput(nodeId, inputIndex) {
    if (
      insideInput() !== null &&
      insideInput()?.nodeId === nodeId &&
      insideInput()?.inputIndex === inputIndex
    )
      setInsideInput(null);
  }

  function handleOnMouseDownEdge(edgeId) {
    setSelectedNode(null);

    setSelectedEdge(edgeId);
  }

  function handleOnDeleteEdge(edgeId) {
    const edge = edges().find((e) => e.id === edgeId);

    if (edge) {
      const nodeStart = nodes().find((n) => n.id === edge.nodeStartId);
      if (nodeStart) {
        nodeStart.outputEdgeIds.set([
          ...nodeStart.outputEdgeIds
            .get()
            .filter((edgeId) => edgeId !== edge.id),
        ]);
      }

      const nodeEnd = nodes().find((n) => n.id === edge.nodeEndId);
      if (nodeEnd) {
        nodeEnd.inputEdgeIds.set([
          ...nodeEnd.inputEdgeIds.get().filter((edgeId) => edgeId !== edge.id),
        ]);
      }

      setEdges([...edges().filter((e) => e.id !== edge.id)]);
    }
  }

  return (
    <div
      ref={containerRef}
      id="boardWrapper"
      class="fixed w-screen h-screen top-0 left-0 overflow-hidden"
    >
      <ButtonComponent
        setSidebarVisible={setSidebarVisible}
        toggleSidebar={toggleSidebar}
        clickAddNodeHandler={clickAddNodeHandler}
        sidebarVisible={sidebarVisible}
        setIsOpen={setIsOpen}
        closeSidebar={closeSidebar}
      />
      <div
        class={`relative w-screen h-screen bg-[radial-gradient(circle,#6b6b6b_1.3px,transparent_0px)] bg-[#2e2e2e] bg-[size:30px_30px] ${
          ctrlPressed() || spacePressed() ? "cursor-grabbing" : "cursor-auto"
        }`}
        onMouseDown={handleOnMouseDownBoard}
        onMouseUp={handleOnMouseUpBoard}
        onMouseMove={handleOnMouseMove}
        id="board"
        onClick={closeSidebar}
        style={{
          transform: `scale(${zoomLevel()})`,
          transformOrigin: "center",
        }}
      >
        <For each={nodes()}>
          {(node) => (
            <NodeComponent
              id={node.id}
              x={node.currPosition.get().x}
              y={node.currPosition.get().y}
              numberInputs={node.numberInputs}
              numberOutputs={node.numberOutputs}
              selected={selectedNode() === node.id}
              onMouseDownNode={handleOnMouseDownNode}
              onMouseDownOutput={handleOnMouseDownOutput}
              onMouseEnterInput={handleOnMouseEnterInput}
              onMouseLeaveInput={handleOnMouseLeaveInput}
              onClickDeleteNode={handleOnClickDelete}
              name={node.name}
              setSidebarVisible={setSidebarVisible}
              toggleSidebar={toggleSidebar}
              sidebarVisible={sidebarVisible}
              others={node.others}
            />
          )}
        </For>
        {newEdge() !== null && (
          <EdgeComponent
            selected={false}
            isNew={true}
            position={{
              x0: newEdge().currStartPosition.get().x,
              y0: newEdge().currStartPosition.get().y,
              x1: newEdge().currEndPosition.get().x,
              y1: newEdge().currEndPosition.get().y,
            }}
            onMouseDownEdge={() => {}}
            onClickDelete={() => {}}
          />
        )}
        <For each={edges()}>
          {(edge) => (
            <EdgeComponent
              selected={selectedEdge() === edge.id}
              isNew={false}
              position={{
                x0: edge.currStartPosition.get().x,
                y0: edge.currStartPosition.get().y,
                x1: edge.currEndPosition.get().x,
                y1: edge.currEndPosition.get().y,
              }}
              onMouseDownEdge={() => handleOnMouseDownEdge(edge.id)}
              onClickDelete={() => handleOnDeleteEdge(edge.id)}
            />
          )}
        </For>
      </div>
      {isOpen() ? <FullscreenComponent setIsOpen={setIsOpen} /> : null}
      <div class="fixed bottom-4 left-4 flex  gap-2 p-2 ">
        {/* Zoom to Fit Button */}
        <button
          class="px-3 py-2 border-1 border-white rounded text-white hover:text-red-400 hover:border-red-400"
          onClick={zoomToFit}
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
          onClick={zoomIn}
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
          onClick={zoomOut}
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
        <Show when={zoomLevel() > 1}>
          <button
            class="px-3 py-2 border-1 border-white rounded text-white hover:text-red-400 hover:border-red-400"
            onClick={resetZoom}
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
    </div>
  );
};

export default BoardComponent;
