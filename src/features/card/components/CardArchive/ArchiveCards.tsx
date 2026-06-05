import PendingPage from "@/src/components/PendingPage";
import { CardSumResponse } from "@/src/types/card";
import Link from "next/link";
import { useParams } from "next/navigation";

interface ArchiveCardsProps {
  archiveCards: CardSumResponse[];
  isPending: boolean;
  handleRestoreCard: (cardId: number) => void;
  handleDeleteCard: (cardId: number) => void;
}

export const ArchiveCards = ({ archiveCards, isPending, handleRestoreCard, handleDeleteCard }: ArchiveCardsProps) => {
  const { workspaceId, boardId } = useParams();

  return (
    <>
      {isPending && <PendingPage />}

      <div className="archive-container bg-white p-3 rounded-3 shadow-sm border">
        <div className="d-flex gap-2 mb-3">
          <input type="text" className="form-control form-control-sm border-secondary-subtle" placeholder="Search..." />
          <button className="btn btn-sm btn-outline-secondary px-3">Lists</button>
        </div>

        <div className="text-muted small fw-bold mb-2">Past 7 days</div>

        <div className="d-flex flex-column gap-3">
          {archiveCards?.map((card) => (
            <div key={card.cardId} className="archived-item-group">
              <div className="bg-light border-light-subtle rounded-3 mb-1">
                <div className="card-body p-2 ps-3">
                  <div
                    className="fw-semibold text-dark mb-1 d-flex justify-content-between align-items-center"
                    style={{ fontSize: "0.95rem" }}
                  >
                    <span>{card.cardTitle}</span>
                    <Link
                      className="btn btn-primary btn-xs"
                      href={`/workspaces/${workspaceId}/boards/${boardId}/card/${card.cardId}`}
                    >
                      <i className="fa-solid fa-eye"></i>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="d-flex align-items-center gap-2 ps-1">
                <button onClick={() => handleRestoreCard(card.cardId)} className="btn btn-success btn-xs">
                  Restore
                </button>
                <button onClick={() => handleDeleteCard(card.cardId)} className="btn btn-danger btn-xs ">
                  Delete
                </button>
              </div>
            </div>
          ))}

          {archiveCards?.length === 0 && (
            <div className="text-muted small text-center py-3 border border-dashed rounded">
              No archived items found.
            </div>
          )}
        </div>
      </div>
    </>
  );
};
