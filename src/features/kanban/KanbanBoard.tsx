"use client";

import { BoardResponse } from "@/src/types/board";
import {
  closestCorners,
  defaultDropAnimationSideEffects,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { KanbanBoardList } from "./KanbanBoardList";
import { useEffect, useRef, useState } from "react";
import { CardSumResponse } from "@/src/types/card";
import { useMoveCard } from "@/src/hooks/useCardMutations";
import { useDeleteBoardList } from "@/src/hooks/useBoardListMutation";

interface KanbanBoardProps {
  boardById: BoardResponse;
  workspaceId: number;
  openCardModal: (boardListId: number) => void;
}

export const KanbanBoard = ({ boardById, workspaceId, openCardModal }: KanbanBoardProps) => {
  console.log(boardById);

  const [activeCard, setActiveCard] = useState<CardSumResponse | null>(null);
  const newIndexRef = useRef<string | number | null>(null);
  const overIdRef = useRef<string | null>(null);
  const { mutate: moveCardMutate, isPending: isMoveCard } = useMoveCard();
  const [localBoard, setLocalBoard] = useState(boardById);

  //Di card it nhất  8px sẽ bắt đầu handleDragStart
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
  );

  const handleMoveCard = (activeId: number, overId: number | string, targetListId: number) => {
    console.log("overId", overId);
    //Lấy ra data nguyên bản, loại bỏ cardActive để tính toán
    const targetList = boardById.boardLists.find((list) => list.boardListId === targetListId);
    if (!targetList) {
      return;
    }
    const cards = targetList.cards.filter((c) => c.cardId !== activeId);
    const cardLength = cards.length;
    //Lấy vị trí card bị đè đã tính ở dragOver
    const newIndex = Number(newIndexRef.current);
    let newPos: number;
    //    console.log("newIndex", newIndex);
    //console.log("cards.Length(): ", cards.length);

    if (newIndex === 0) {
      //newIndex =0 là thả ở đầu cột
      newPos = cardLength === 0 ? 1024 : cards[0].orderIndex / 2;
    } else {
      if (newIndex === cardLength) {
        //newIndex bằng size của cards cũ(kéo xuống cuối)
        console.log("keo vao  cuoi");
        newPos = cards[cardLength - 1].orderIndex + 1024;
      } else {
        console.log("keo vao giua");
        const prevPos = cards[newIndex - 1].orderIndex;
        const nextPos = cards[newIndex].orderIndex;
        console.log("prevPos: ", prevPos);
        console.log("nextPos: ", nextPos);
        newPos = (prevPos + nextPos) / 2;
      }
    }
    // call api để update card
    console.log(`UPDATE Card ${activeId}: Position = ${newPos}, ListId = ${targetListId}`);
    moveCardMutate({ cardId: activeId, newOrderIndex: newPos, newBoardListId: targetListId });
  };

  //Hàm tìm cột mà Card xuất phát và Card được thả vào
  const findContainer = (id: string) => {
    //
    if (id.startsWith("boardList-")) {
      return Number(id.replace("boardList-", ""));
    }
    const list = localBoard.boardLists.find((list) => list.cards.some((card) => card.cardId.toString() === id));
    return list ? list.boardListId : null;
  };

  const handleDragStart = (event: DragStartEvent) => {
    //Tìm ra card đang được kéo khi bắt đầu
    const { active } = event;
    const card = localBoard.boardLists.flatMap((list) => list.cards).find((c) => c.cardId === Number(active.id));
    if (card) {
      setActiveCard(card);
    }
  };

  //Kích hoạt khi đang diễn ra sự kiện kéo
  const handleDragOver = (event: DragOverEvent) => {
    //event trả về 2 giá trị là card đang tác động , và Id của thẻ bị đè được truyền vào trong SortTableContext
    const { active, over } = event;
    //Nếu chưa được thả xuống đâu , trả về trạng thái đầu
    if (!over) {
      return;
    }
    const activeId = active.id.toString();
    const overId = over.id.toString();
    if (activeId === overId) return;
    overIdRef.current = overId;
    console.log("activeId over : ", activeId);
    console.log("overId over : ", overId);
    //Tìm ra cột đầu(chứa card) và cột đích(nơi thả card)
    const activeContainerId = findContainer(activeId);
    const overContainerId = findContainer(overId);
    if (activeContainerId === null || overContainerId === null) {
      return;
    }
    //Xử lý khi kéo cùng cột
    if (activeContainerId === overContainerId) {
      console.log("DragOver: keo cung cot");
      setLocalBoard((prev) => {
        const activeLists = prev.boardLists.find((bl) => bl.boardListId === activeContainerId);
        if (!activeLists || !activeCard) return prev;
        const oldIndex = activeLists.cards.findIndex((c) => c.cardId.toString() === activeId);
        const newIndex = activeLists.cards.findIndex((c) => c.cardId.toString() === overId);
        newIndexRef.current = newIndex;
        const newCards = [...activeLists.cards];
        const [removeCards] = newCards.splice(oldIndex, 1);
        newCards.splice(newIndex, 0, removeCards);
        const newBoardLists = prev.boardLists.map((bl) => {
          if (bl.boardListId === activeLists.boardListId) {
            return { ...bl, cards: newCards };
          }
          return bl;
        });
        return {
          ...prev,
          boardLists: newBoardLists,
        };
      });
    }
    //Xử lý khi kéo khác cột
    if (activeContainerId !== overContainerId) {
      console.log("DragOver: keo khac cot ");
      //Cập nhật lại localBoard vì data hiển thị là localBoard
      setLocalBoard((prev) => {
        // 1. Lấy ra danh sách card của cột xuất phát và cột đích(chưa cập nhật card mới thả)
        const activeLists = prev.boardLists.find((bl) => bl.boardListId === activeContainerId);
        const overLists = prev.boardLists.find((bl) => bl.boardListId === overContainerId);
        // console.log("column cu: ", activeLists?.boardListTitle);
        // console.log("column moi: ", overLists?.boardListTitle);
        if (!activeLists || !overLists) {
          return prev;
        }
        //Nếu  không thấy cardActive nữa, hủy cập nhật
        const activeCard = activeLists.cards.find((c) => c.cardId.toString() === activeId);
        if (!activeCard) {
          return prev;
        }
        //Cập nhật lại  boardList-> xóa activeCard ở boardList cũ và add activeCard vào boardList mới
        const newBoardLists = prev.boardLists.map((list) => {
          if (list.boardListId === activeContainerId) {
            return {
              ...list,
              //lấy  các card còn lại trừ cardActive
              cards: list.cards.filter((c) => c.cardId.toString() !== activeId),
            };
          }
          if (list.boardListId === overContainerId) {
            //Lấy ra vị trí card đang bị đè lên
            const overIndex = list.cards.findIndex((c) => c.cardId.toString() === overId);
            //Nếu không có overIndex-> cột trống, trả về vị trí đầu
            const newIndex = overIndex >= 0 ? overIndex : list.cards.length;
            newIndexRef.current = newIndex;
            const newCards = [...list.cards];
            //Chèn activeCard vào vị trí newIndex
            newCards.splice(newIndex, 0, activeCard);
            return { ...list, cards: newCards };
          }
          return list;
        });
        return { ...prev, boardLists: newBoardLists };
      });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    console.log("dragEnd");
    setActiveCard(null);
    console.log("New board: ", localBoard.boardLists);
    const { active } = event;
    const activeId = Number(active.id);
    const overId = overIdRef.current;
    if (!overId) {
      return;
    }
    console.log("activeId", activeId);
    console.log("overId", overId);
    const targetListId = findContainer(overId);
    handleMoveCard(activeId, overId, Number(targetListId));
  };
  useEffect(() => {
    setLocalBoard(boardById);
  }, [boardById]);

  return (
    //Thư viện sẽ bọc boardList vào bản đồ lưu vị trí x,y,chiều cao, chiều rộng
    //Khi di chuyển nó tạo bản sao active là card đang di chuyển,tự tính toán xem có đang đè lên vị trí của vật nào
    //onDragEnd sẽ trả về card bị đè lên hoặc là boardList nếu không có card nào ở list đó
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      {localBoard.boardLists.map((boardList, index) => (
        <KanbanBoardList
          key={index}
          workspaceId={workspaceId}
          boardId={localBoard.boardId}
          boardList={boardList}
          openCardModal={openCardModal}
        />
      ))}
      <DragOverlay
        dropAnimation={{
          sideEffects: defaultDropAnimationSideEffects({
            styles: { active: { opacity: "0.5" } },
          }),
        }}
      >
        {activeCard ? (
          <div className="kanban-card dragging-overlay">
            <div className="kanban-card-title">{activeCard.cardTitle}</div>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
