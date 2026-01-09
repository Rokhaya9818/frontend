// client/src/hooks/useApi.ts
// Hooks React Query pour utiliser l'API REST

import { useQuery, useMutation, UseQueryResult, UseMutationResult } from '@tanstack/react-query';
import apiClient from '@/lib/api';

// Dashboard hooks
export const useDashboardKPIs = (region?: string, maladie?: string): UseQueryResult => {
  return useQuery({
    queryKey: ['dashboard', 'kpis', region, maladie],
    queryFn: () => apiClient.getDashboardKPIs(region, maladie),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useFvrHumainTotal = (region?: string): UseQueryResult => {
  return useQuery({
    queryKey: ['fvr-humain', 'total', region],
    queryFn: () => apiClient.getFvrHumainTotal(region),
    staleTime: 1000 * 60 * 5,
  });
};

export const useFvrHumainByRegion = (region?: string): UseQueryResult => {
  return useQuery({
    queryKey: ['fvr-humain', 'by-region', region],
    queryFn: () => apiClient.getFvrHumainByRegion(region),
    staleTime: 1000 * 60 * 5,
  });
};

export const useFvrAnimalTotal = (region?: string): UseQueryResult => {
  return useQuery({
    queryKey: ['fvr-animal', 'total', region],
    queryFn: () => apiClient.getFvrAnimalTotal(region),
    staleTime: 1000 * 60 * 5,
  });
};

export const useFvrAnimalByRegion = (region?: string): UseQueryResult => {
  return useQuery({
    queryKey: ['fvr-animal', 'by-region', region],
    queryFn: () => apiClient.getFvrAnimalByRegion(region),
    staleTime: 1000 * 60 * 5,
  });
};

export const useMalariaByIndicator = (): UseQueryResult => {
  return useQuery({
    queryKey: ['malaria', 'by-indicator'],
    queryFn: () => apiClient.getMalariaByIndicator(),
    staleTime: 1000 * 60 * 5,
  });
};

export const useTuberculoseByIndicator = (): UseQueryResult => {
  return useQuery({
    queryKey: ['tuberculose', 'by-indicator'],
    queryFn: () => apiClient.getTuberculoseByIndicator(),
    staleTime: 1000 * 60 * 5,
  });
};

export const useMapData = (region?: string, maladie?: string): UseQueryResult => {
  return useQuery({
    queryKey: ['map-data', region, maladie],
    queryFn: () => apiClient.getMapData(region, maladie),
    staleTime: 1000 * 60 * 5,
  });
};

// Malaria hooks
export const useMalariaList = (yearStart?: number, yearEnd?: number): UseQueryResult => {
  return useQuery({
    queryKey: ['malaria', 'list', yearStart, yearEnd],
    queryFn: () => apiClient.getMalariaList(yearStart, yearEnd),
    staleTime: 1000 * 60 * 5,
  });
};

// Tuberculose hooks
export const useTuberculoseList = (yearStart?: number, yearEnd?: number): UseQueryResult => {
  return useQuery({
    queryKey: ['tuberculose', 'list', yearStart, yearEnd],
    queryFn: () => apiClient.getTuberculoseList(yearStart, yearEnd),
    staleTime: 1000 * 60 * 5,
  });
};

// FVR Humain hooks
export const useFvrHumainList = (): UseQueryResult => {
  return useQuery({
    queryKey: ['fvr-humain', 'list'],
    queryFn: () => apiClient.getFvrHumainList(),
    staleTime: 1000 * 60 * 5,
  });
};

// FVR Animal hooks
export const useFvrAnimalList = (): UseQueryResult => {
  return useQuery({
    queryKey: ['fvr-animal', 'list'],
    queryFn: () => apiClient.getFvrAnimalList(),
    staleTime: 1000 * 60 * 5,
  });
};

// Grippe Aviaire hooks
export const useGrippeAviaireList = (): UseQueryResult => {
  return useQuery({
    queryKey: ['grippe-aviaire', 'list'],
    queryFn: () => apiClient.getGrippeAviaireList(),
    staleTime: 1000 * 60 * 5,
  });
};

// Regions hooks
export const useRegionsList = (): UseQueryResult => {
  return useQuery({
    queryKey: ['regions', 'list'],
    queryFn: () => apiClient.getRegionsList(),
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};

// Pollution Air hooks
export const usePollutionAirList = (yearStart?: number, yearEnd?: number): UseQueryResult => {
  return useQuery({
    queryKey: ['pollution-air', 'list', yearStart, yearEnd],
    queryFn: () => apiClient.getPollutionAirList(yearStart, yearEnd),
    staleTime: 1000 * 60 * 5,
  });
};

// Assistant mutation
export const useChatWithAssistant = (): UseMutationResult => {
  return useMutation({
    mutationFn: (message: string) => apiClient.chatWithAssistant(message),
  });
};