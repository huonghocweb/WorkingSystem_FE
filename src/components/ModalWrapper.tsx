"use client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom"; // Import thêm cái này
import styles from "./ModalWrapper.module.css";

interface ModalWrapperProps {
  children: React.ReactNode;
  onClose?: () => void;
  size?: "sm" | "md" | "lg" | "full";
  zIndex?: number;
}

export default function ModalWrapper({
  children,
  onClose,
  size = "md",
  zIndex = 1050,
}: ModalWrapperProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Chỉ render trên client để tránh lỗi SSR với Portal
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleClose = useCallback(() => {
    onClose ? onClose() : router.back();
  }, [onClose, router]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };

    // Chỉ khóa scroll nếu đây là modal đầu tiên hoặc dùng cơ chế quản lý mảng
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [handleClose]);

  if (!mounted) return null;

  // Sử dụng createPortal để đẩy modal ra ngoài cùng của <body>
  return createPortal(
    <div
      ref={overlayRef}
      className={`${styles.overlay} d-flex align-items-center justify-content-center vh-100 vw-100`}
      style={{ zIndex }} // Sử dụng zIndex động ở đây
      onClick={(e) => e.target === overlayRef.current && handleClose()}
    >
      <div
        className={`${styles.contentBase} ${styles[size]} w-100 d-flex flex-column rounded-3 shadow-lg position-relative`}
        style={{ maxHeight: "90vh" }}
      >
        <div className="flex-grow-1 overflow-auto p-4">{children}</div>

        <div className="p-2 border-top d-flex justify-content-end bg-light">
          <button
            className="btn btn-sm btn-outline-secondary px-3"
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body, // Đích đến của Portal
  );
}
