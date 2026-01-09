import { useQuery } from "@tanstack/react-query";
import apiClient from "./api";


// Dashboard hooks
export const useDashboardKpis = (filters?: { region?: string; maladie?: string }) => {
  return useQuery({
    queryKey: ["dashboard", "kpis", filters],
    queryFn: () => apiClient.dashboard.kpis(filters),
  });
};

export const useFvrHumainTotal = (filters?: { region?: string; maladie?: string }) => {
  return useQuery({
    queryKey: ["dashboard", "fvrHumainTotal", filters],
    queryFn: () => apiClient.dashboard.fvrHumainTotal(filters),
  });
};

export const useFvrHumainByRegion = (filters?: { region?: string; maladie?: string }) => {
  return useQuery({
    queryKey: ["dashboard", "fvrHumainByRegion", filters],
    queryFn: () => apiClient.dashboard.fvrHumainByRegion(filters),
  });
};

export const useFvrAnimalTotal = (filters?: { region?: string; maladie?: string }) => {
  return useQuery({
    queryKey: ["dashboard", "fvrAnimalTotal", filters],
    queryFn: () => apiClient.dashboard.fvrAnimalTotal(filters),
  });
};

export const useFvrAnimalByRegion = (filters?: { region?: string; maladie?: string }) => {
  return useQuery({
    queryKey: ["dashboard", "fvrAnimalByRegion", filters],
    queryFn: () => apiClient.dashboard.fvrAnimalByRegion(filters),
  });
};

export const useMalariaByIndicator = () => {
  return useQuery({
    queryKey: ["dashboard", "malariaByIndicator"],
    queryFn: () => apiClient.dashboard.malariaByIndicator(),
  });
};

export const useTuberculoseByIndicator = () => {
  return useQuery({
    queryKey: ["dashboard", "tuberculoseByIndicator"],
    queryFn: () => apiClient.dashboard.tuberculoseByIndicator(),
  });
};

export const useMapData = (filters?: { region?: string; maladie?: string }) => {
  return useQuery({
    queryKey: ["dashboard", "mapData", filters],
    queryFn: () => apiClient.dashboard.mapData(filters),
  });
};

// Data hooks
export const useMalariaList = (params?: { year_start?: number; year_end?: number }) => {
  return useQuery({
    queryKey: ["malaria", "list", params],
    queryFn: () => apiClient.malaria.list(params),
  });
};

export const useTuberculoseList = (params?: { year_start?: number; year_end?: number }) => {
  return useQuery({
    queryKey: ["tuberculose", "list", params],
    queryFn: () => apiClient.tuberculose.list(params),
  });
};

export const useFvrHumainList = () => {
  return useQuery({
    queryKey: ["fvrHumain", "list"],
    queryFn: () => apiClient.fvrHumain.list(),
  });
};

export const useFvrAnimalList = () => {
  return useQuery({
    queryKey: ["fvrAnimal", "list"],
    queryFn: () => apiClient.fvrAnimal.list(),
  });
};

export const useGrippeAviaireList = () => {
  return useQuery({
    queryKey: ["grippeAviaire", "list"],
    queryFn: () => apiClient.grippeAviaire.list(),
  });
};

export const usePollutionAirList = (params?: { year_start?: number; year_end?: number }) => {
  return useQuery({
    queryKey: ["pollutionAir", "list", params],
    queryFn: () => apiClient.pollutionAir.list(params),
  });
};

export const useRegionsList = () => {
  return useQuery({
    queryKey: ["regions", "list"],
    queryFn: () => apiClient.regions.list(),
  });
};