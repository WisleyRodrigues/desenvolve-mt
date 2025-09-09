import Image from 'next/image';
import { type MissingPerson } from '@/services/missingPersonsService';

interface MissingPersonCardProps {
  person: MissingPerson;
}

export default function MissingPersonCard({ person }: MissingPersonCardProps) {
  const formatarDataHora = (data?: string) => {
    if (!data) return 'Data não informada';
    try {
      return new Date(data).toLocaleString('pt-BR');
    } catch (e) {
      console.log(e)
      return 'Data inválida';
    }
  };

  const getStatusColor = () => {
    if (person.ultimaOcorrencia?.dataLocalizacao) {
      return 'bg-green-100/90 text-green-800 border-green-200';
    }
    return 'bg-red-100/90 text-red-800 border-red-200';
  };

  const getStatusText = () => {
    if (
      person.ultimaOcorrencia?.dataLocalizacao ||
      person.ultimaOcorrencia?.encontradoVivo
    ) {
      return person.sexo === 'FEMININO' ? 'Encontrada' : 'Encontrado';
    }
    return person.sexo === 'FEMININO' ? 'Desaparecida' : 'Desaparecido';
  };

  const getSexoText = (sexo: string) => {
    return sexo === 'MASCULINO' ? 'Masculino' : 'Feminino';
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group transform hover:-translate-y-1 flex flex-col h-full">
      {/* Header with photo and status */}
      <div className="relative">
        <div className="aspect-[4/3] relative overflow-hidden">
          <div className="relative w-full h-full">
            <Image
              src={person.urlFoto || '/placeholder-user.jpg'}
              alt={`Foto de ${person.nome}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-3 right-3">
            <span
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border backdrop-blur-sm ${getStatusColor()}`}
            >
              {getStatusText()}
            </span>
          </div>
        </div>
      </div>

      {/* Card content */}
      <div className="p-5 md:p-6 flex-1 flex flex-col">
        {/* Name, age and gender */}
        <div className="mb-2 pb-4 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
            {person.nome}
          </h3>
          <div className="flex flex-wrap items-center gap-3 text-gray-700">
            <span className="inline-flex items-center px-3 py-1.5 bg-gray-50 rounded-full text-sm">
              <svg
                className="w-4 h-4 mr-1.5 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              {person.idade} anos
            </span>
            <span className="inline-flex items-center px-3 py-1.5 bg-gray-50 rounded-full text-sm">
              <svg
                className="w-4 h-4 mr-1.5 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z"
                  clipRule="evenodd"
                />
                <path d="M10 8a1 1 0 011 1v3a1 1 0 11-2 0V9a1 1 0 011-1z" />
              </svg>
              {getSexoText(person.sexo)}
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
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">
                Local onde desapareceu
              </p>
              <p className="text-sm text-gray-900 font-medium mt-0.5">
                {person?.ultimaOcorrencia?.localDesaparecimentoConcat}
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 mt-1">
              <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-500">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">
                Desapareceu em
              </p>
              <p className="text-sm text-gray-900 font-medium mt-0.5">
                {formatarDataHora(person?.ultimaOcorrencia?.dtDesaparecimento)}
              </p>
            </div>
          </div>

          {person?.ultimaOcorrencia?.dataLocalizacao && (
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-500">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">
                  {person?.sexo === 'FEMININO'
                    ? 'Encontrada em'
                    : 'Encontrado em'}
                </p>
                <p className="text-sm text-gray-900 font-medium mt-0.5">
                  {formatarDataHora(person?.ultimaOcorrencia?.dataLocalizacao)}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
