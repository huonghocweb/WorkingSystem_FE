import { HealthIssue } from "./healthIssue";
import { HealthyMetric } from "./healthyMetric";

export interface BoardHealthDTO {
  healthScore: number;
  healthyStatus: string;
  healthyMetrics: HealthyMetric;
  healthIssues: HealthIssue[];
}
