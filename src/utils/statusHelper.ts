export type StatusVariant = "success" | "warning" | "danger";
export interface ThresholdConfig {
  success: number;
  warning: number;
  mode?: "higher-better" | "lower-better";
}

export const getMetricStatus = (rate: number, config: ThresholdConfig): StatusVariant => {
  // Old
  // const success = config.success  ;
  // const warning = config.warning;
  // const mode = config.mode != undefined ? config.mode : 'higher-better';
  //=> Destructuring assignment :
  const { success, warning, mode = "higher-better" } = config;

  if (mode === "higher-better") {
    if (rate >= success) return "success";
    if (rate >= warning) return "warning";
    return "danger";
  } else {
    if (rate <= success) return "success";
    if (rate <= warning) return "warning";
    return "danger";
  }
};
