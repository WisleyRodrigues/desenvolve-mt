import Image from "next/image";
import { MissingPerson} from "@/types/missingPerson";

interface MissingPersonCardProps {
  pessoa: MissingPerson;
}

export default function MissingPersonCard({ pessoa }: MissingPersonCardProps) {
  const formatarDataHora = (data: string) => {
    return new Date(data).toLocaleString('pt-BR');
  };

  const getStatusColor = () => {
    if (pessoa.ultimaOcorrencia.dataLocalizacao) {
      return 'bg-green-100/90 text-green-800 border-green-200';
    }
    return 'bg-red-100/90 text-red-800 border-red-200';
  };

  const getStatusText = () => {
    if (pessoa.ultimaOcorrencia.dataLocalizacao) {
      return pessoa.sexo === 'FEMININO' ? 'Encontrada' : 'Encontrado';
    }
    return pessoa.sexo === 'FEMININO' ? 'Desaparecida' : 'Desaparecido';
  };

  const getSexoText = (sexo: string) => {
    return sexo === 'MASCULINO' ? 'Masculino' : 'Feminino';
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group transform hover:-translate-y-1 flex flex-col h-full">
      {/* Header with photo and status */}
      <div className="relative">
        <div className="aspect-[4/3] relative overflow-hidden">
          <Image
            src={pessoa.urlFoto}
            alt={`Foto de ${pessoa.nome}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-3 right-3">
            <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border backdrop-blur-sm ${getStatusColor()}`}>
              {getStatusText()}
            </span>
          </div>
        </div>
      </div>

      {/* Card content */}
      <div className="p-5 md:p-6 flex-1 flex flex-col">
        {/* Name, age and gender */}
        <div className="mb-2 pb-4 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{pessoa.nome}</h3>
          <div className="flex flex-wrap items-center gap-3 text-gray-700">
            <span className="inline-flex items-center px-3 py-1.5 bg-gray-50 rounded-full text-sm">
              <svg className="w-4 h-4 mr-1.5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              {pessoa.idade} anos
            </span>
            <span className="inline-flex items-center px-3 py-1.5 bg-gray-50 rounded-full text-sm">
              <svg className="w-4 h-4 mr-1.5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
                <path d="M10 8a1 1 0 011 1v3a1 1 0 11-2 0V9a1 1 0 011-1z" />
              </svg>
              {getSexoText(pessoa.sexo)}
            </span>
          </div>
        </div>
        
        {/* Missing information section title */}
        <div className="mt-2 mb-3">
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            Informações do Desaparecimento
          </h4>
        </div>

        {/* Main information */}
        <div className="space-y-3 flex-1">
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-1">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Local onde desapareceu</p>
              <p className="text-sm text-gray-900 font-medium mt-0.5">{pessoa.ultimaOcorrencia.localDesaparecimentoConcat}</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 mt-1">
              <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-500">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Desapareceu em</p>
              <p className="text-sm text-gray-900 font-medium mt-0.5">{formatarDataHora(pessoa.ultimaOcorrencia.dtDesaparecimento)}</p>
            </div>
          </div>

          {pessoa.ultimaOcorrencia.dataLocalizacao && (
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-500">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">
                  {pessoa.sexo === 'FEMININO' ? 'Encontrada em' : 'Encontrado em'}
                </p>
                <p className="text-sm text-gray-900 font-medium mt-0.5">{formatarDataHora(pessoa.ultimaOcorrencia.dataLocalizacao)}</p>
              </div>
            </div>
          )}
        </div>

        {/* Additional information */}
        <div className="mt-4 pt-2 border-t border-gray-100">
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Informações Adicionais
          </h4>
          <div className="space-y-3">
            {pessoa.ultimaOcorrencia.ocorrenciaEntrevDesapDTO.informacao && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-semibold text-gray-900 mb-1">Informações</p>
                    <p className="text-sm text-gray-700 line-clamp-3">
                      {pessoa.ultimaOcorrencia.ocorrenciaEntrevDesapDTO.informacao}
                    </p>
                  </div>
                </div>
              </div>
            )}
            {pessoa.ultimaOcorrencia.ocorrenciaEntrevDesapDTO.vestimentasDesaparecido && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-0.5">
                  <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3 7L6 4H9C9 4.39397 9.0776 4.78407 9.22836 5.14805C9.37913 5.51203 9.6001 5.84274 9.87868 6.12132C10.1573 6.3999 10.488 6.62087 10.8519 6.77164C11.2159 6.9224 11.606 7 12 7C12.394 7 12.7841 6.9224 13.1481 6.77164C13.512 6.62087 13.8427 6.3999 14.1213 6.12132C14.3999 5.84274 14.6209 5.51203 14.7716 5.14805C14.9224 4.78407 15 4.39397 15 4H18L21 7L20.5785 11.2152C20.542 11.5801 20.1382 11.7829 19.8237 11.5942L18 10.5V18C18 19.1046 17.1046 20 16 20H8C6.89543 20 6 19.1046 6 18V10.5L4.17629 11.5942C3.86184 11.7829 3.45801 11.5801 3.42152 11.2152L3 7Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-semibold text-gray-900 mb-1">Vestimentas</p>
                      <p className="text-sm text-gray-700 line-clamp-2">
                        {pessoa.ultimaOcorrencia.ocorrenciaEntrevDesapDTO.vestimentasDesaparecido}
                      </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
