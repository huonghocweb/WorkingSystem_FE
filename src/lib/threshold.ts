import { success } from "zod";
import { ThresholdConfig } from "../utils/statusHelper";
import { emitWarning } from "process";

export const METRIC_THRESHOLDS = {
  WORKSPACE: {
    COMPLETION: { success: 90, warning: 70 } as ThresholdConfig,
    ACTIVE_MEMBER: { success: 80, warning: 70 } as ThresholdConfig,
    ACTIVE_CARD: { success: 80, warning: 70 } as ThresholdConfig,
    OVERDUE_CARD: { success: 5, warning: 10, mode: "lower-better" } as ThresholdConfig,
  },
  USER: {
    COMPLETION: { success: 80, warning: 70 } as ThresholdConfig,
    OVERDUE_CARD: { success: 0, warning: 5, mode: "lower-better" } as ThresholdConfig,
  },
  BOARD: {
    COMPLETION: { success: 90, warning: 70 } as ThresholdConfig,
    OVERDUE_CARD: { success: 7, warning: 12, mode: "lower-better" } as ThresholdConfig,
  },
  BOARD_LIST: {
    TIME_SHARE: { success: 15, warning: 20, mode: "lower-better" } as ThresholdConfig,
  },
};
