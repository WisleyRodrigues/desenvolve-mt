import { apiClient } from '@/lib/api/config';

export interface MissingPerson {
  id: number;
  nome: string;
  idade: number;
  sexo: 'MASCULINO' | 'FEMININO';
  vivo: boolean;
  urlFoto?: string;
  ultimaOcorrencia?: {
    dtDesaparecimento?: string;
    dataLocalizacao?: string;
    localDesaparecimentoConcat?: string;
    encontradoVivo?: boolean;
    ocoId: number;
  };
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface MissingPersonFilters {
  nome?: string;
  faixaIdadeInicial?: number;
  faixaIdadeFinal?: number;
  sexo?: 'MASCULINO' | 'FEMININO' | '';
  status?: 'DESAPARECIDO' | 'LOCALIZADO' | '';
  pagina?: number;
  porPagina?: number;
}

export interface Statistics {
  quantPessoasDesaparecidas: number;
  quantPessoasEncontradas: number;
}

// Interface for duplicate check response
interface DuplicateCheckResponse {
  isDuplicate: boolean;
  matchingRecords?: Array<{
    id: number;
    nome: string;
    dataNascimento: string;
    dataDesaparecimento: string;
  }>;
}

// Interface for sighting information
interface SightingInfo {
  id: number;
  informacao: string;
  data: string;
  descricao: string;
  anexos: string[];
  dataCriacao: string;
}

export const missingPersonsService = {
  /**
   * Get a paginated list of missing persons
   */
  async getAll(filters: MissingPersonFilters = {}): Promise<PageResponse<MissingPerson>> {
    const params: Record<string, string | number> = {
      ...Object.fromEntries(
        Object.entries(filters)
          .filter(([_, v]) => v !== undefined && v !== '')
          .map(([k, v]) => [k, String(v)])
      ),
      pagina: String(filters.pagina || 0),
      porPagina: String(filters.porPagina || 10)
    };
    
    return apiClient.get<PageResponse<MissingPerson>>('/v1/pessoas/aberto/filtro', params);
  },

  /**
   * Get details of a specific missing person by ID
   */
  async getById(id: number): Promise<MissingPerson> {
    return apiClient.get<MissingPerson>(`/v1/pessoas/${id}`);
  },

  /**
   * Get random missing persons (useful for featured/carousel display)
   */
  async getRandom(limit: number = 4): Promise<MissingPerson[]> {
    return apiClient.get<MissingPerson[]>('/v1/pessoas/aberto/dinamico', { registros: limit });
  },

  /**
   * Get statistics about missing persons
   */
  async getStatistics(): Promise<Statistics> {
    return apiClient.get<Statistics>('/v1/pessoas/aberto/estatistico');
  },

  /**
   * Add sighting information for a missing person
   */
  async addSighting(
    ocorrenciaId: number,
    data: {
      informacao: string;
      data: string; // yyyy-MM-dd
      descricao: string;
      files?: File[];
    }
  ): Promise<void> {
    const formData = new FormData();
    formData.append('informacao', data.informacao);
    formData.append('data', data.data);
    formData.append('descricao', data.descricao);
    formData.append('ocoId', ocorrenciaId.toString());
    
    if (data.files) {
      data.files.forEach(file => {
        formData.append('files', file);
      });
    }

    // Let the browser set the Content-Type with the correct boundary
    const headers = new Headers();
    
    return apiClient.post<void>(
      '/v1/ocorrencias/informacoes-desaparecido',
      formData,
      true,
      headers
    );
  },

  /**
   * Report a new missing person (delegacia-digital integration)
   */
  async reportMissingPerson(data: Record<string, unknown>): Promise<void> {
    return apiClient.post('/v1/ocorrencias/delegacia-digital', data);
  },

  /**
   * Check for duplicate missing person reports
   */
  checkForDuplicates: async (data: {
    nome: string;
    dataNascimento: string; // yyyy-MM-dd
    dataDesaparecimento: string; // yyyy-MM-dd
    mae?: string;
    cpf?: string;
  }): Promise<DuplicateCheckResponse> => {
    return apiClient.post<DuplicateCheckResponse>(
      '/v1/ocorrencias/delegacia-digital/verificar-duplicidade', 
      data
    );
  },

  /**
   * Get list of disappearance reasons (motivos de desaparecimento)
   */
  async getDisappearanceReasons(): Promise<Array<{ id: number; descricao: string }>> {
    return apiClient.get('/v1/ocorrencias/motivos');
  },

  /**
   * Get sighting information for a missing person
   */
  getSightings: async (ocorrenciaId: number): Promise<SightingInfo[]> => {
    return apiClient.get<SightingInfo[]>(
      '/v1/ocorrencias/informacoes-desaparecido', 
      { ocorrenciaId }
    );
  }
};
