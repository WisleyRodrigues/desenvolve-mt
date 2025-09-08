'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { pessoasPerdidas } from '@/data/mock-data';
import { motion } from 'framer-motion';
import {
  CalendarDays,
  MapPin,
  User,
  Info,
  AlertTriangle,
  Phone,
  MessageSquare,
  Share2,
} from 'lucide-react';
import { use } from 'react';

export default function MissingPersonDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
    const { id } = use(params)

  const person = pessoasPerdidas.find((p) => p.id === Number(id));

  if (!person) {
    notFound();
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Data não informada';
    return new Date(dateString).toLocaleString('pt-BR');
  };

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <motion.div
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="max-w-sm md:max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300"
      >
        {/* Header with back button */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
          <motion.a
            href="/missing-persons"
            whileHover={{ x: -3 }}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mb-4 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span className="ml-1">Voltar para a lista</span>
          </motion.a>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 mb-2"
          >
            <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {person.nome}
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-gray-600 dark:text-gray-300 mt-1 flex items-center gap-2"
          >
            <CalendarDays className="w-4 h-4" />
            Desaparecido(a) em{' '}
            {formatDate(person.ultimaOcorrencia.dtDesaparecimento)}
          </motion.p>
        </div>

        <motion.div
          className="md:flex"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {/* Person Image */}
          <div className="md:w-1/3 p-6">
            <motion.div
              className="relative h-64 md:h-80 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 shadow-md"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Image
                src={person.urlFoto || '/placeholder-person.jpg'}
                alt={`Foto de ${person.nome}`}
                fill
                className="object-cover"
                priority
              />
            </motion.div>

            {/* Status Badge */}
            <motion.div
              className="mt-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
            >
              <span
                className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium ${
                  person.vivo === true
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}
              >
                <AlertTriangle className="w-4 h-4" />
                {person.vivo ? 'Desaparecido(a)' : 'Falecido(a)'}
              </span>
            </motion.div>
          </div>

          {/* Person Details */}
          <div className="md:w-2/3 p-6">
            <div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Informações Pessoais
                  </h3>
                  <dl className="space-y-2">
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Nome Completo
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-gray-200">
                        {person.nome}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Idade
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-gray-200">
                        {person.idade} anos
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Gênero
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-gray-200">
                        {person.sexo}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Informações do Desaparecimento
                  </h3>
                  <dl className="space-y-2">
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Data do Desaparecimento
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-gray-200">
                        {formatDate(person.ultimaOcorrencia.dtDesaparecimento)}
                      </dd>
                    </div>
                    {person.ultimaOcorrencia.dataLocalizacao && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Data da Localização
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 dark:text-gray-200">
                          {formatDate(person.ultimaOcorrencia.dataLocalizacao)}
                        </dd>
                      </div>
                    )}
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Local do Desaparecimento
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-gray-200">
                        {person.ultimaOcorrencia.localDesaparecimentoConcat ||
                          'Não informado'}
                      </dd>
                    </div>
                    {person.ultimaOcorrencia.ocorrenciaEntrevDesapDTO
                      ?.vestimentasDesaparecido && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Vestimentas
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 dark:text-gray-200">
                          {
                            person.ultimaOcorrencia.ocorrenciaEntrevDesapDTO
                              .vestimentasDesaparecido
                          }
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>
              </motion.div>

              <motion.div
                className="pt-6 border-t border-gray-200 dark:border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Informações Adicionais
                </h3>
                <dl className="space-y-2">
                  {person.ultimaOcorrencia.ocorrenciaEntrevDesapDTO
                    ?.informacao && (
                    <div>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-gray-200 whitespace-pre-line">
                        {
                          person.ultimaOcorrencia.ocorrenciaEntrevDesapDTO
                            .informacao
                        }
                      </dd>
                    </div>
                  )}
                </dl>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Contato para Informações
                </h3>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <motion.div
                    className="flex items-center gap-3 mb-4"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                      <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Se você tiver qualquer informação sobre o paradeiro de{' '}
                      <span className="font-medium text-blue-600 dark:text-blue-400">
                        {person.nome.split(' ')[0]}
                      </span>
                      , por favor entre em contato:
                    </p>
                  </motion.div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div
                      className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
                      whileHover={{ y: -2 }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                          <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                            Delegacia de Polícia Civil
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 flex items-center">
                            <span className="font-medium text-blue-600 dark:text-blue-400 mr-1">
                              Disque Denúncia:
                            </span>{' '}
                            197
                          </p>
                        </div>
                      </div>
                    </motion.div>
                    <motion.div
                      className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
                      whileHover={{ y: -2 }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                          <MessageSquare className="w-5 h-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                            Disque Direitos Humanos
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                            <span className="font-medium text-green-600 dark:text-green-400">
                              Disque 100
                            </span>
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.main>
  );
}

// // Generate static paths for all missing persons
// export function generateStaticParams() {
//   return pessoasPerdidas.map((person) => ({
//     id: person.id.toString(),
//   }));
// }

// export function generateMetadata({ params }: { params: { id: string } }) {
//   const person = pessoasPerdidas.find((p) => p.id === Number(params.id));

//   if (!person) {
//     return {
//       title: 'Pessoa não encontrada',
//       description: 'A pessoa procurada não foi encontrada em nosso sistema.',
//     };
//   }

//   return {
//     title: `${person.nome} - Desaparecido(a) desde ${new Date(
//       person.ultimaOcorrencia.dtDesaparecimento
//     ).toLocaleDateString('pt-BR')}`,
//     description: `Ajude a encontrar ${
//       person.nome
//     }, desaparecido(a) em ${new Date(
//       person.ultimaOcorrencia.dtDesaparecimento
//     ).toLocaleDateString('pt-BR')}.`,
//     openGraph: {
//       images: [person.urlFoto || '/placeholder-person.jpg'],
//     },
//   };
// }
