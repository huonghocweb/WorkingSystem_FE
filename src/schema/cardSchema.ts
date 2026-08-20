import z from "zod";

export const cardSchema = z
  .object({
    cardTitle: z.string().min(1, "CardTitle is required"),
    cardDescription: z.string(),
    startDate: z.string().optional(),
    dueDate: z.string().optional(),
    boardListId: z.string().optional(),
    labelIds: z.array(z.string()).optional(),
    assigneeIds: z.array(z.string()).optional(),
  })
  .refine(
    (data) => {
      if (!data.dueDate) return true;
      const end = new Date(data.dueDate);
      const start = data.startDate ? new Date(data.startDate) : new Date();
      if (isNaN(end.getTime()) || isNaN(start.getTime())) return false;
      return end > start;
    },
    { message: "DueDate must after startDate", path: ["dueDate"] },
  );

export type CardFormValue = z.infer<typeof cardSchema>;

export const mapFormToCardRequest = (data: CardFormValue) => {
  console.log("data CardForm", data);
  return {
    ...data,
    startDate: data.startDate ? new Date(data.startDate) : null,
    dueDate: data.dueDate ? new Date(data.dueDate) : null,
    boardListId: data.boardListId ? Number.parseInt(data.boardListId) : null,
    labelIds: Array.isArray(data.labelIds) ? data.labelIds.map(Number) : [],
    assigneeIds: Array.isArray(data.assigneeIds) ? data.assigneeIds.map(Number) : [],
  };
};
