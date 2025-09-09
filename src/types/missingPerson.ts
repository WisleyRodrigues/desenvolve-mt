export interface OcorrenciaEntrevDesapDTO {
  informacao: string;
  vestimentasDesaparecido: string;
}

export interface LastOccurrence
{
  dtDesaparecimento: string;
  dataLocalizacao: string | null;
  encontradoVivo: boolean;
  localDesaparecimentoConcat: string;
  ocorrenciaEntrevDesapDTO: OcorrenciaEntrevDesapDTO;
  ocoId: number;
}

export interface MissingPerson {
  id: number;
  nome: string;
  idade: number;
  sexo: "MASCULINO" | "FEMININO";
  vivo: boolean;
  urlFoto: string;
  ultimaOcorrencia: LastOccurrence;
}

export interface MissingPersonFilters {
  nome?: string;
  status?: 'DESAPARECIDO' | 'ENCONTRADO';
  sexo?: 'MASCULINO' | 'FEMININO';
  idadeMin?: number;
  idadeMax?: number;
  pagina?: number;
  porPagina?: number;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
