"use client";
import ModalWrapper from "@/src/components/ModalWrapper";
import { useModal } from "@/src/store/useModalStore";
import { ActivityLogsUI } from "./ActivityLogsUI";
import { useQuery } from "@tanstack/react-query";
import { getActivityLogByBoard } from "../../services/board.client.services";
import { PaginationState, SortOption } from "@/src/types/pagination";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import PaginationControls from "@/src/components/Pagination";
import { useMemo } from "react";

export const ActivityLogs = () => {
  const { isOpen, onClose, data, type } = useModal();
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  console.log("Search Params: ", searchParams);
  const params = new URLSearchParams(searchParams.toString());
  console.log("params: ", params);
  const isOpenModal = isOpen && type === "boardActivity";
  const sortOptions: SortOption[] = [
    { label: "Id", value: "activityLogId" },
    { label: "User", value: "userId" },
    { label: "Type", value: "entityId" },
  ];

  const queryParams: PaginationState = useMemo(
    () => ({
      page: Number(params?.get("page") || 0),
      size: Number(params?.get("size") || 8),
      by: params?.get("by") || "activityLogId",
      order: params?.get("order") || "DESC",
    }),
    [params],
  );

  const { data: activityLogsPage, isPending: isActivityLogs } = useQuery({
    queryKey: ["activityLogs", data?.boardId, queryParams],
    queryFn: async () => {
      const res = await getActivityLogByBoard(data?.boardId, queryParams);
      console.log(res.data);
      return res.data;
    },
    enabled: !!isOpenModal && !!data.boardId,
    staleTime: 0,
  });

  const paginationState: PaginationState = {
    ...queryParams,
    totalPages: activityLogsPage?.totalPages,
  };
  const handlePaginationChange = (key: string, value: string | number) => {
    params.set(`${key}`, String(value));
    router.push(`${pathName}?${params.toString()}`);
  };

  return (
    <>
      {isOpenModal && (
        <ModalWrapper onClose={onClose} size="md" zIndex={900}>
          <ActivityLogsUI
            activityLogs={activityLogsPage?.content}
            isPending={isActivityLogs}
            paginationControlSlot={
              <PaginationControls
                paginationState={paginationState}
                sortOptions={sortOptions}
                handlePaginationChange={handlePaginationChange}
              />
            }
          />
        </ModalWrapper>
      )}
    </>
  );
};
