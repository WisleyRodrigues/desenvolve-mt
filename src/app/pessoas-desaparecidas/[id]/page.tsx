'use client';

import { useState, useCallback, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import { pessoasPerdidas } from '@/data/mock-data';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CalendarDays,
  User,
  Info,
  AlertTriangle,
  Phone,
  MessageSquare,
  X,
  Plus,
  UploadCloud,
} from 'lucide-react';
import { use } from 'react';
import { missingPersonsService, type MissingPerson } from '@/services/missingPersonsService';

// Helper function to format dates
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  };
  return new Date(dateString).toLocaleDateString('pt-BR', options);
};

// Helper function to format dates safely
const formatDateSafe = (dateString: string | undefined) => {
  if (!dateString) return 'Data não informada';
  try {
    return formatDate(dateString);
  } catch (e) {
    console.error('Error formatting date:', e);
    return 'Data inválida';
  }
};

// Safely access nested properties with type safety
const getNestedValue = <T,>(obj: any, path: string, defaultValue: T): T => {
  if (!obj) return defaultValue;
  const keys = path.split('.');
  let result: any = obj;
  
  for (const key of keys) {
    result = result?.[key];
    if (result === undefined || result === null) {
      return defaultValue;
    }
  }
  
  return result as T;
};

interface FormData {
  informacao: string;
  descricao: string;
  data: string;
}

export default function MissingPersonDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [person, setPerson] = useState<MissingPerson | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch person details from API
  useEffect(() => {
    const fetchPerson = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await missingPersonsService.getById(Number(id));
        setPerson(data);
      } catch (err) {
        console.error('Error fetching person details:', err);
        setError('Erro ao carregar os detalhes da pessoa. Tente novamente mais tarde.');
        setPerson(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPerson();
  }, [id]);

  // if (isLoading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  //     </div>
  //   );
  // }

 

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    informacao: '',
    descricao: '',
    data: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);


  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile) {
      // Validate file size (5MB max)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (selectedFile.size > maxSize) {
        alert('O arquivo é muito grande. O tamanho máximo permitido é 5MB.');
        return;
      }

      setFile(selectedFile);
      // Create preview for images
      if (selectedFile.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreview(reader.result as string);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        setFilePreview(null);
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'],
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: false,
  });

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    setFilePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!person?.ultimaOcorrencia?.ocoId) {
        throw new Error('ID da ocorrência não encontrado');
      }

      const files = file ? [file] : [];
      
      // Format date to YYYY-MM-DD
      const formattedDate = formData.data ? new Date(formData.data).toISOString().split('T')[0] : '';
      
      // Call the API to add sighting information
      await missingPersonsService.addSighting(
        person.ultimaOcorrencia.ocoId,
        {
          informacao: formData.informacao,
          descricao: formData.descricao,
          data: formattedDate,
          files
        }
      );

      // Reset form and close modal on success
      setFormData({ informacao: '', descricao: '', data: '' });
      setFile(null);
      setFilePreview(null);
      setIsModalOpen(false);
      
      // Show success message (you might want to use a toast or alert here)
      alert('Informação enviada com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar informações:', error);
      // Show error message to user
      alert('Ocorreu um erro ao enviar as informações. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // if (error || !person) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <div className="text-center p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
  //         <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
  //         <h2 className="text-xl font-semibold text-gray-800 mb-2">Erro ao carregar</h2>
  //         <p className="text-gray-600 mb-4">{error || 'Pessoa não encontrada'}</p>
  //         <button
  //           onClick={() => window.location.reload()}
  //           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
  //         >
  //           Tentar novamente
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 relative"
    >
      {/* Add Information Button */}
      <motion.button
        onClick={() => setIsModalOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 z-10"
      >
        <Plus className="w-5 h-5" />
        <span>Adicionar Informação</span>
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-opacity-50 backdrop-blur-sm z-20 flex items-center justify-center p-4"
              onClick={() => !isSubmitting && setIsModalOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md relative border border-gray-200 dark:border-gray-700 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => !isSubmitting && setIsModalOpen(false)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  disabled={isSubmitting}
                >
                  <X className="w-6 h-6" />
                </button>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Adicionar Informação
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="informacao"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Informação
                    </label>
                    <textarea
                      id="informacao"
                      name="informacao"
                      value={formData.informacao}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white resize-none"
                      required
                      disabled={isSubmitting}
                      style={{ resize: 'none' }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="data"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Data da visualização da Pessoa
                    </label>
                    <input
                      type="date"
                      id="data"
                      name="data"
                      value={formData.data}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      required
                      disabled={isSubmitting}
                      max={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Anexar Arquivo
                    </label>
                    <div
                      {...getRootProps()}
                      className={`border-2 border-dashed rounded-lg p-6 transition-colors ${
                        isDragActive
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 bg-white dark:bg-gray-800/50'
                      } cursor-pointer`}
                    >
                      <input {...getInputProps()} disabled={isSubmitting} />
                      {file ? (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                                {file.name}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {(file.size / 1024).toFixed(1)} KB •{' '}
                                {file.type.split('/')[1]?.toUpperCase() ||
                                  'Arquivo'}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={removeFile}
                              className="ml-4 p-1 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                              disabled={isSubmitting}
                              title="Remover arquivo"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>

                          {filePreview && (
                            <div className="mt-2 border border-gray-200 dark:border-gray-600 rounded-md overflow-hidden">
                              <div className="bg-gray-50 dark:bg-gray-700 p-2 text-center">
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  Pré-visualização
                                </p>
                              </div>
                              <div className="relative bg-white dark:bg-gray-800 p-2 flex justify-center">
                                <Image
                                  src={filePreview}
                                  sizes="(max-width: 25000px) 5vw, 5vw"
                                  alt="Pré-visualização"
                                  width={150}
                                  height={100}
                                  className="max-h-64 max-w-full object-contain"
                                />
                              </div>
                            </div>
                          )}

                          <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                            <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                              Arraste outro arquivo para substituir ou{' '}
                              <span className="text-blue-600 dark:text-blue-400 font-medium cursor-pointer">
                                selecione um arquivo
                              </span>
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center space-y-4">
                          <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                            <UploadCloud className="w-12 h-12 text-gray-400 mb-2" />
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                              Arraste e solte seu arquivo aqui, ou clique para
                              selecionar
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Qualquer tipo de arquivo (Máx. 5MB)
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="w-full">
                    <label
                      htmlFor="descricao"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 text-left"
                    >
                      Descrição do Arquivo (opcional)
                    </label>
                    <input
                      type="text"
                      id="descricao"
                      name="descricao"
                      value={formData.descricao}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Descreva o arquivo anexado"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                      disabled={isSubmitting}
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 flex items-center gap-2"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Enviando...
                        </>
                      ) : (
                        'Enviar Informação'
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <motion.div
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="max-w-sm md:max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300"
      >
        {/* Header with back button */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
          <motion.a
            href="/pessoas-desaparecidas"
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
              {person?.nome}
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
            {formatDateSafe(person?.ultimaOcorrencia?.dtDesaparecimento)}
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
                src={person?.urlFoto || '/placeholder-person.jpg'}
                alt={`Foto de ${person?.nome}`}
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
                  person?.vivo === true
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}
              >
                <AlertTriangle className="w-4 h-4" />
                {person?.vivo ? 'Desaparecido(a)' : 'Falecido(a)'}
              </span>
            </motion.div>
          </div>

          {/* Person Details */}
          <div className="md:w-2/3 p-6">
            <motion.div
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
                        {person?.nome}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Idade
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-gray-200">
                        {person?.idade} anos
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Gênero
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-gray-200">
                        {person?.sexo}
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
                      <div className="text-sm">
                        {formatDateSafe(person?.ultimaOcorrencia?.dtDesaparecimento)}
                      </div>
                    </div>
                    {person?.ultimaOcorrencia?.dataLocalizacao && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Data da Localização
                        </dt>
                        <div className="text-sm">
                          {formatDateSafe(person?.ultimaOcorrencia?.dataLocalizacao)}
                        </div>
                      </div>
                    )}
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Local do Desaparecimento
                      </dt>
                      <div className="text-sm">
                        {person?.ultimaOcorrencia?.localDesaparecimentoConcat ||
                          'Local não informado'}
                      </div>
                    </div>
                    {getNestedValue<string>(person, 'ultimaOcorrencia.ocorrenciaEntrevDesapDTO.vestimentasDesaparecido', '') && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Vestimentas
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 dark:text-gray-200">
                          {getNestedValue(
                            person, 
                            'ultimaOcorrencia.ocorrenciaEntrevDesapDTO.vestimentasDesaparecido', 
                            'Não informado'
                          )}
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
                <div className="text-sm text-gray-500">
                  {getNestedValue(
                    person, 
                    'ultimaOcorrencia.ocorrenciaEntrevDesapDTO.informacao', 
                    'Nenhuma informação adicional disponível'
                  )}
                </div>
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
                        {person?.nome.split(' ')[0]}
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
            </motion.div>
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
