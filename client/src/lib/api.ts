// client/src/lib/api.ts
// Client API REST pour communiquer avec le backend FastAPI

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

interface DashboardKPIs {
  malaria_cases: string;
  tuberculose_cases: string;
  fvr_humain_cases: number;
  fvr_humain_deces: number;
  fvr_humain_gueris: number;
  fvr_animal_cases: number;
  grippe_aviaire_cases: number;
  pm25_recent: string;
  taux_letalite_fvr: number;
}

interface RegionStat {
  region: string;
  total: number;
}

interface IndicatorStat {
  name: string;
  value: number;
}

interface RegionMapData {
  region: string;
  fvr_humain: number;
  fvr_animal: number;
  grippe_aviaire: number;
  malaria: number;
  total_cases: number;
}

// Fonction utilitaire pour faire des appels API
async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`[API Error] ${endpoint}:`, error);
    throw error;
  }
}

// API Client
export const apiClient = {
  // Dashboard endpoints
  getDashboardKPIs: (region?: string, maladie?: string) => {
    const params = new URLSearchParams();
    if (region && region !== 'Toutes') params.append('region', region);
    if (maladie && maladie !== 'Toutes') params.append('maladie', maladie);
    
    const query = params.toString();
    return fetchAPI<DashboardKPIs>(`/api/dashboard/kpis${query ? '?' + query : ''}`);
  },

  getFvrHumainTotal: (region?: string) => {
    const params = new URLSearchParams();
    if (region && region !== 'Toutes') params.append('region', region);
    
    const query = params.toString();
    return fetchAPI<number>(`/api/dashboard/fvr-humain-total${query ? '?' + query : ''}`);
  },

  getFvrHumainByRegion: (region?: string) => {
    const params = new URLSearchParams();
    if (region && region !== 'Toutes') params.append('region', region);
    
    const query = params.toString();
    return fetchAPI<RegionStat[]>(`/api/dashboard/fvr-humain-by-region${query ? '?' + query : ''}`);
  },

  getFvrAnimalTotal: (region?: string) => {
    const params = new URLSearchParams();
    if (region && region !== 'Toutes') params.append('region', region);
    
    const query = params.toString();
    return fetchAPI<number>(`/api/dashboard/fvr-animal-total${query ? '?' + query : ''}`);
  },

  getFvrAnimalByRegion: (region?: string) => {
    const params = new URLSearchParams();
    if (region && region !== 'Toutes') params.append('region', region);
    
    const query = params.toString();
    return fetchAPI<RegionStat[]>(`/api/dashboard/fvr-animal-by-region${query ? '?' + query : ''}`);
  },

  getMalariaByIndicator: () => {
    return fetchAPI<IndicatorStat[]>('/api/dashboard/malaria-by-indicator');
  },

  getTuberculoseByIndicator: () => {
    return fetchAPI<IndicatorStat[]>('/api/dashboard/tuberculose-by-indicator');
  },

  getMapData: (region?: string, maladie?: string) => {
    const params = new URLSearchParams();
    if (region && region !== 'Toutes') params.append('region', region);
    if (maladie && maladie !== 'Toutes') params.append('maladie', maladie);
    
    const query = params.toString();
    return fetchAPI<RegionMapData[]>(`/api/dashboard/map-data${query ? '?' + query : ''}`);
  },

  // Malaria endpoints
  getMalariaList: (yearStart?: number, yearEnd?: number) => {
    const params = new URLSearchParams();
    if (yearStart) params.append('year_start', yearStart.toString());
    if (yearEnd) params.append('year_end', yearEnd.toString());
    
    const query = params.toString();
    return fetchAPI(`/api/malaria/list${query ? '?' + query : ''}`);
  },

  // Tuberculose endpoints
  getTuberculoseList: (yearStart?: number, yearEnd?: number) => {
    const params = new URLSearchParams();
    if (yearStart) params.append('year_start', yearStart.toString());
    if (yearEnd) params.append('year_end', yearEnd.toString());
    
    const query = params.toString();
    return fetchAPI(`/api/tuberculose/list${query ? '?' + query : ''}`);
  },

  // FVR Humain endpoints
  getFvrHumainList: () => {
    return fetchAPI('/api/fvr-humain/list');
  },

  // FVR Animal endpoints
  getFvrAnimalList: () => {
    return fetchAPI('/api/fvr-animal/list');
  },

  // Grippe Aviaire endpoints
  getGrippeAviaireList: () => {
    return fetchAPI('/api/grippe-aviaire/list');
  },

  // Regions endpoints
  getRegionsList: () => {
    return fetchAPI('/api/regions/list');
  },

  // Pollution Air endpoints
  getPollutionAirList: (yearStart?: number, yearEnd?: number) => {
    const params = new URLSearchParams();
    if (yearStart) params.append('year_start', yearStart.toString());
    if (yearEnd) params.append('year_end', yearEnd.toString());
    
    const query = params.toString();
    return fetchAPI(`/api/pollution-air/list${query ? '?' + query : ''}`);
  },

  // Assistant endpoint
  chatWithAssistant: (message: string) => {
    return fetchAPI('/api/assistant/chat', {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
  },
};

export default apiClient;