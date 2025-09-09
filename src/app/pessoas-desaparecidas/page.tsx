'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MissingPersonCard from '@/components/MissingPersonCard';
import { Pagination } from '@/components/Pagination';
import Link from 'next/link';
import {
  missingPersonsService,
  type MissingPerson,
  type MissingPersonFilters,
} from '@/services/missingPersonsService';

type AgeRange = [number, number];

export default function MissingPersonsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [genderFilter, setGenderFilter] = useState<string>('all');
  const [ageRange, setAgeRange] = useState<AgeRange>([0, 100]);
  const [filteredPersons, setFilteredPersons] = useState<MissingPerson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from API
  const fetchMissingPersons = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const filters: MissingPersonFilters = {
        nome: searchTerm || undefined,
        status:
          statusFilter === 'all'
            ? undefined
            : statusFilter === 'found'
            ? 'LOCALIZADO'
            : 'DESAPARECIDO',
        sexo:
          genderFilter === 'all'
            ? undefined
            : genderFilter === 'male'
            ? 'MASCULINO'
            : 'FEMININO',
        faixaIdadeInicial: ageRange[0] > 0 ? ageRange[0] : undefined,
        faixaIdadeFinal: ageRange[1] < 100 ? ageRange[1] : undefined,
        pagina: currentPage - 1, // API is 0-based, our UI is 1-based
        porPagina: itemsPerPage,
      };

      const response = await missingPersonsService.getAll(filters);
      setFilteredPersons(response.content);
      setTotalItems(response.totalElements);
    } catch (err) {
      console.error('Error fetching missing persons:', err);
      setError(
        'Erro ao carregar a lista de pessoas desaparecidas. Tente novamente mais tarde.'
      );
      setFilteredPersons([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle search input change with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(1); // Reset to first page when search changes
      fetchMissingPersons();
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [searchTerm, statusFilter, genderFilter, ageRange, currentPage]);

  // Initial data fetch
  useEffect(() => {
    fetchMissingPersons();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  } as const;

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset to first page when filters change (except search term which is handled by the debounce effect)
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    } else {
      // If already on page 1, refetch data
      fetchMissingPersons();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, genderFilter, ageRange]);

  return (
    <main className="flex-grow bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section
        className="py-12 relative overflow-hidden"
        style={{ backgroundColor: '#00435c' }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29-22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E\")",
          }}
        />
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Pessoas Desaparecidas
            </h1>
            <p className="text-lg text-white/90">
              Ajude-nos a encontrar pessoas desaparecidas em Mato Grosso. Se
              você tem alguma informação, entre em contato conosco.
            </p>
          </div>
        </div>
      </section>

      {/* Modern Filters Section */}
      <section className="py-6 bg-white dark:bg-gray-800 shadow-sm  z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                Filtros
              </h2>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                  setGenderFilter('all');
                  setAgeRange([0, 100]);
                }}
                className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                Limpar filtros
              </button>
            </div>

            <div className="space-y-4">
              {/* Main Search */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="name-search"
                  placeholder="Buscar por nome da pessoa."
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Status Filter */}
                <div>
                  <label
                    htmlFor="status-filter"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Status
                  </label>
                  <div className="relative">
                    <select
                      id="status-filter"
                      className="appearance-none block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="all">Todos os status</option>
                      <option value="missing">Desaparecidos</option>
                      <option value="found">Encontrados</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Gender Filter */}
                <div>
                  <label
                    htmlFor="gender-filter"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Gênero
                  </label>
                  <div className="relative">
                    <select
                      id="gender-filter"
                      className="appearance-none block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      value={genderFilter}
                      onChange={(e) => setGenderFilter(e.target.value)}
                    >
                      <option value="all">Todos os gêneros</option>
                      <option value="male">Masculino</option>
                      <option value="female">Feminino</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Age Range Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Faixa etária
                  </label>
                  <div className="flex items-center space-x-2">
                    <div className="relative flex-1">
                      <input
                        type="number"
                        min="0"
                        max="120"
                        value={ageRange[0]}
                        onChange={(e) =>
                          setAgeRange([
                            parseInt(e.target.value) || 0,
                            ageRange[1],
                          ])
                        }
                        className="block w-full pl-3 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Idade mínima"
                      />
                    </div>
                    <span className="text-gray-500">—</span>
                    <div className="relative flex-1">
                      <input
                        type="number"
                        min="0"
                        max="120"
                        value={ageRange[1]}
                        onChange={(e) =>
                          setAgeRange([
                            ageRange[0],
                            parseInt(e.target.value) || 100,
                          ])
                        }
                        className="block w-full pl-3 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Idade máxima"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-8 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              {totalItems}{' '}
              {totalItems === 1 ? 'pessoa encontrada' : 'pessoas encontradas'}
            </h2>
          </div>
          {error ? (
            <div
              className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Erro! </strong>
              <span className="block sm:inline">{error}</span>
              <button
                onClick={fetchMissingPersons}
                className="absolute top-0 bottom-0 right-0 px-4 py-3"
              >
                <svg
                  className="fill-current h-6 w-6 text-red-500"
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <title>Recarregar</title>
                  <path d="M14.66 15.66A8 8 0 1 1 17 10h-2a6 6 0 1 0-1.76 4.24l1.42 1.42zM12 10h8l-4 4-4-4z" />
                </svg>
              </button>
            </div>
          ) : isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : filteredPersons.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                Nenhuma pessoa encontrada
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {searchTerm ||
                statusFilter !== 'all' ||
                genderFilter !== 'all' ||
                ageRange[0] > 0 ||
                ageRange[1] < 100
                  ? 'Tente ajustar sua busca ou filtros.'
                  : 'Nenhum registro encontrado.'}
              </p>
            </div>
          ) : (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
            >
              {filteredPersons.map((person) => (
                <Link
                  href={`/pessoas-desaparecidas/${person.id}`}
                  key={person.id}
                >
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      show: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          type: 'spring',
                          stiffness: 100,
                        },
                      },
                    }}
                  >
                    <MissingPersonCard person={person} />
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Pagination */}
      {totalItems > itemsPerPage && (
        <div className="py-6 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <Pagination
              currentPage={currentPage}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      )}
    </main>
  );
}
