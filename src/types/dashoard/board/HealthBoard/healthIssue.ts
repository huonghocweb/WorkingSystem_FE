export interface HealthIssue {
  severity: string;
  title: string;
  description: string;
  penalty: number;
  unit: string;
  actualValue: number;
  threshold: number;
}
