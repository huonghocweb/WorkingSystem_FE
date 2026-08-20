"use client";
import { CardResponse } from "@/src/types/card";
import styles from "./CardDetail.module.css";
import { UseFormReturn } from "react-hook-form";
import { CardFormValue } from "@/src/schema/cardSchema";
import PendingPage from "@/src/components/PendingPage";
import { useModal } from "@/src/store/useModalStore";
import { useParams } from "next/navigation";
import React from "react";

interface CardDetailUIProps {
  cardById: CardResponse;
  cardFormMethod: UseFormReturn<CardFormValue>;
  isPending: boolean;
  commentSlot: React.ReactNode;
  attachmentSlot: React.ReactNode;
}

export default function CardDetailUI({
  cardById,
  cardFormMethod,
  isPending,
  commentSlot,
  attachmentSlot,
}: CardDetailUIProps) {
  const {
    register,
    formState: { errors },
  } = cardFormMethod;
  const { boardId, workspaceId } = useParams();
  const boardIdParam = Number(boardId);
  const workspaceIdParam = Number(workspaceId);
  const { onOpen } = useModal();
  console.log(cardById);

  return (
    <>
      {isPending && <PendingPage />}
      <div className={`${styles.container} row g-0 shadow-lg`}>
        <div className="col-8 p-4 border-end">
          <div className="d-flex gap-3 mb-4">
            <span className={`${styles.headerIcon} fs-4`}>💳</span>
            <div className="w-100">
              <h2 className="fs-5 fw-bold m-0">{cardById.cardTitle}</h2>
              <p className="small text-secondary">
                <span className="text-decoration-underline">BoardList Name</span>
              </p>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-auto">
              <h3 className="text-uppercase small fw-bold text-secondary mb-2" style={{ fontSize: "12px" }}>
                Members
              </h3>
              <div className="d-flex gap-2 align-items-center flex-wrap">
                {cardById.users?.map((user, userIndex) => (
                  <div key={userIndex}>
                    <img className={styles.avatar} src={user.imageUrl} alt="avatar" />
                  </div>
                ))}
                <button
                  onClick={() =>
                    onOpen("boardMember", {
                      boardId: boardIdParam,
                      workspaceId: workspaceIdParam,
                      cardId: cardById.cardId,
                    })
                  }
                  className={styles.btnTrello}
                >
                  +
                </button>
              </div>
            </div>

            <div className="col-auto">
              <h3 className="text-uppercase small fw-bold text-secondary mb-2" style={{ fontSize: "12px" }}>
                Labels
              </h3>
              <div className="d-flex gap-2 row-gap-2 flex-wrap">
                {cardById.labels?.map((label, labelIndex) => (
                  <span
                    key={labelIndex}
                    className={styles.labelPill}
                    style={{ backgroundColor: `${label.labelColor}` }}
                  >
                    {label.labelName}
                  </span>
                ))}
                <button
                  onClick={() =>
                    onOpen("boardLabel", {
                      boardId: boardIdParam,
                      cardId: cardById.cardId,
                    })
                  }
                  className={styles.btnTrello}
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-5">
              <h3 className="text-uppercase small fw-bold text-secondary mb-2" style={{ fontSize: "12px" }}>
                StartDate
              </h3>
              <input type="date" className="form-input" {...register("startDate")} />
              {errors.startDate && <span className="error-message">{errors.startDate.message}</span>}
            </div>
            <div className="col-5">
              <h3 className="text-uppercase small fw-bold text-secondary mb-2" style={{ fontSize: "12px" }}>
                DueDate
              </h3>
              <input className="form-input" type="date" {...register("dueDate")} />
              {errors.dueDate && <span className="error-message">{errors.dueDate.message}</span>}
            </div>
          </div>
          <div className={styles.contentSection}>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h3 className={styles.sectionTitle}>
                <span>☰</span> Description
              </h3>
              <div className={styles.btnTrello}>Edit</div>
            </div>
            <input type="text" className="form-input" {...register("cardDescription")} />
            {errors.cardDescription && <span className="error-message">{errors.cardDescription.message}</span>}
          </div>
          {/* Start Attachment Section */}
          {attachmentSlot}
          {/* End Attachment Section */}
        </div>
        {/* Start Comment Section */}
        <aside className={`col-4 p-3 ${styles.attachmentCard}`}>{commentSlot}</aside>
        {/* End Comment Section */}
      </div>
    </>
  );
}
