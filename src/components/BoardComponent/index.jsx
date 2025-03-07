import { createEffect, createSignal, onMount } from "solid-js";
import ButtonComponent from "../ButtonComponent";
import NodeComponent from "../NodeComponent";
import EdgeComponent from "../EdgeComponent";

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

  //make the sidebar visible only when click on + button
  const toggleSidebar = () => {
    setSidebarVisible(true);
  };

  const closeSidebar = () => {
    setSidebarVisible(false);
  };
  const clickAddNodeHandler = (e, input, output, name) => {
    e.stopPropagation();
    handleOnClickAdd(input, output, name);
  };
  onMount(() => {
    const boardElement = document.getElementById("board");

    if (boardElement) {
      boardElement.addEventListener(
        "wheel",
        (event) => {
          setScale(scale() + event.deltaY * -0.005);

          setScale(Math.min(Math.max(1, scale()), 2));

          boardElement.style.transform = `scale(${scale()})`;
          boardElement.style.marginTop = `${(scale() - 1) * 1}vh`;
          boardElement.style.marginLeft = `${(scale() - 1) * 1}vw`;
        }
        //change here for movement board
        // { passive: false }
      );
    }
  });
  //When Zoom in then scroll bar
  createEffect(() => {
    const boardWrapperElement = document.getElementById("boardWrapper");
    if (boardWrapperElement) {
      boardWrapperElement.style.overflow = scale() > 1 ? "scroll" : "hidden";
    }
  });

  function handleOnMouseDownBoard(event) {
    setSelectedNode(null);

    setSelectedEdge(null);

    setGrabbingBoard(true);
    setClickedPosition({ x: event.x, y: event.y });
  }

  function handleOnMouseUpBoard() {
    setClickedPosition({ x: -1, y: -1 });

    setGrabbingBoard(false);

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
    // User clicked somewhere
    if (clickedPosition().x >= 0 && clickedPosition().y >= 0) {
      // User clicked on node
      if (selectedNode() !== null) {
        const deltaX = event.x - clickedPosition().x;
        const deltaY = event.y - clickedPosition().y;

        const node = nodes().find((node) => node.id === selectedNode());
        if (node) {
          // Update node position
          node.currPosition.set((_) => {
            return {
              x: (node.prevPosition.get().x + deltaX) / scale(),
              y: (node.prevPosition.get().y + deltaY) / scale(),
            };
          });

          // Update input edges positions
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

          // Update output edges positions
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
      }
      // User clicked on board, move board
      else {
        const deltaX = event.x - clickedPosition().x;
        const deltaY = event.y - clickedPosition().y;

        const boardWrapperElement = document.getElementById("boardWrapper");
        if (boardWrapperElement) {
          boardWrapperElement.scrollBy(-deltaX, -deltaY);
          setClickedPosition({ x: event.x, y: event.y });
        }
      }
    }

    // User is setting new edge
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
    // Deselect edge
    setSelectedEdge(null);

    // Select node
    setSelectedNode(id);

    // Update first click position
    setClickedPosition({ x: event.x, y: event.y });

    const node = nodes().find((node) => node.id === selectedNode());
    if (node) {
      // Update node position
      node.prevPosition.set((_) => {
        return {
          x: node.currPosition.get().x * scale(),
          y: node.currPosition.get().y * scale(),
        };
      });

      // Update input edges positions
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

      // Update output edges positions
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

  function handleOnClickAdd(numberInputs, numberOutputs, name) {
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
      id="boardWrapper"
      className="fixed w-screen h-screen top-0 left-0 overflow-hidden"
    >
      <ButtonComponent
        setSidebarVisible={setSidebarVisible}
        toggleSidebar={toggleSidebar}
        closeSidebar={closeSidebar}
        clickAddNodeHandler={clickAddNodeHandler}
        sidebarVisible={sidebarVisible}
      />
      <div
        class={
          grabbingBoard()
            ? "relative w-screen h-screen bg-[radial-gradient(circle,black_1px,transparent_1px)] bg-gray-700 bg-[size:30px_30px] cursor-grabbing"
            : "relative w-screen h-screen bg-[radial-gradient(circle,black_1px,transparent_1px)] bg-gray-700 bg-[size:30px_30px] cursor-grab"
        }
        onMouseDown={handleOnMouseDownBoard}
        onMouseUp={handleOnMouseUpBoard}
        onMouseMove={handleOnMouseMove}
        id="board"
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
              closeSidebar={closeSidebar}
              sidebarVisible={sidebarVisible}
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
    </div>
  );
};

export default BoardComponent;
