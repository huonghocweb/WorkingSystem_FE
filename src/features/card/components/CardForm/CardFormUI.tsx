import PendingPage from "@/src/components/PendingPage";
import { CardFormValue } from "@/src/schema/cardSchema";
import { UseFormReturn } from "react-hook-form";

interface CardFormUIProps {
  cardFormMethod: UseFormReturn<CardFormValue>;
  onSubmit: (data: CardFormValue) => void;
  isPendingCardCreate: boolean;
}

export default function CardFormUI({ cardFormMethod, onSubmit, isPendingCardCreate }: CardFormUIProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = cardFormMethod;
  console.log("Validation Errors:", errors);
  return (
    <>
      {isPendingCardCreate && <PendingPage />}
      <div className="p-3">
        <div className="mb-4">
          <h2 className="fw-bold m-0" style={{ fontSize: "18px", color: "#172b4d" }}>
            Create Card
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="form-label small fw-bold text-secondary">
              Board title <span className="text-danger">*</span>
            </label>
            <input
              className="form-control shadow-none"
              type="text"
              placeholder="Enter title..."
              {...register("cardTitle")}
            />
            {errors.cardTitle && <span className="error-message">{errors.cardTitle.message}</span>}
          </div>
          <div className="d-flex justify-content-end gap-2 pt-2 border-top">
            <button
              disabled={isPendingCardCreate}
              type="submit"
              className="btn btn-primary btn-sm fw-bold px-3"
              style={{ backgroundColor: "#0c66e4", border: "none" }}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
