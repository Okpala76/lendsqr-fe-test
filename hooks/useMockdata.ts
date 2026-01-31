import { apiCall } from "@/app/api/mockdata";
import { useQuery } from "@tanstack/react-query";

export function useDashboardMetrics() {
  return useQuery({
    queryKey: ["dashboard-metrics"],
    queryFn: apiCall,
  });
}
