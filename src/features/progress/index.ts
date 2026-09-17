// Public API of the progress module
// Export only what is needed by other modules

// Components
export { ProgressTableRow } from "./components/ProgressTableRow";
export { ProgressFilters } from "./components/ProgressFilters";

// Hooks
export { useProgress } from "./hooks/useProgress";

// Types
export type { Progress, Employee } from "./types";

// Services (if needed)
export { progressService } from "./services/progressService";
