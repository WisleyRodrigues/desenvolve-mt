'use client';

import { motion } from 'framer-motion';

// Animation variants
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
} as const;

const fadeInUp = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
} as const;

export default function Home() {
  return (
    <motion.main
      initial="hidden"
      animate="visible"
      variants={container}
      className="flex-grow bg-gray-50 dark:bg-gray-800 overflow-hidden"
    >
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-10"
          >
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6"
              variants={fadeInUp}
            >
              Encontre Pessoas Desaparecidas em Mato Grosso
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
            >
              Ajude-nos a reunir famílias. Se você viu alguém ou está procurando
              por um ente querido, estamos aqui para ajudar.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={fadeInUp}
              transition={{ delay: 0.3 }}
            >
              <motion.a
                href="/pessoas-desaparecidas"
                className="px-8 py-4 bg-blue-600 w-fit mx-auto text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 inline-flex items-center"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Ver Pessoas Desaparecidas</span>
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Animated background elements */}
          <motion.div
            className="absolute top-0 left-0 w-full h-full overflow-hidden -z-0 opacity-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-6000"></div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
              variants={fadeInUp}
            >
              Como podemos ajudar?
            </motion.h2>
            <motion.div
              className="w-20 h-1 bg-blue-500 mx-auto rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: (
                  <svg
                    className="w-7 h-7 text-blue-600 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                ),
                title: 'Busca Avançada',
                description:
                  'Encontre pessoas desaparecidas usando nossos filtros avançados de busca.',
                color: 'blue',
              },
              {
                icon: (
                  <svg
                    className="w-7 h-7 text-green-600 dark:text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                ),
                title: 'Registre mais Informações',
                description:
                  'Colabore com o portal inserindo mais informações sobre o desaparecimento.',
                color: 'green',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className={`bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-${feature.color}-200 dark:hover:border-${feature.color}-900/50`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div
                  className={`w-16 h-16 bg-${feature.color}-100 dark:bg-${feature.color}-900/20 rounded-2xl flex items-center justify-center mb-6 mx-auto`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Possivel feature futura */}
          {/* <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-4 mx-auto">
                </div>
              </div> */}
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-radial-gradient from-white/10 to-transparent rounded-full"></div>
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-radial-gradient from-white/5 to-transparent rounded-full"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          >
            {[
              { number: '+1,000', label: 'Pessoas já ajudadas' },
              { number: '+500', label: 'Casos resolvidos' },
              { number: '24/7', label: 'Atendimento' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <motion.div
                  className="text-5xl font-bold mb-3"
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    type: 'spring',
                    stiffness: 100,
                    delay: 0.3 + index * 0.1,
                  }}
                >
                  {stat.number}
                </motion.div>
                <p className="text-blue-100 text-lg">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </motion.main>

    // <style jsx global>{`
    //   @keyframes blob {
    //     0% {
    //       transform: translate(0px, 0px) scale(1);
    //     }
    //     33% {
    //       transform: translate(30px, -50px) scale(1.1);
    //     }
    //     66% {
    //       transform: translate(-20px, 20px) scale(0.9);
    //     }
    //     100% {
    //       transform: translate(0px, 0px) scale(1);
    //     }
    //   }
    //   .animate-blob {
    //     animation: blob 7s infinite;
    //   }
    //   .animation-delay-2000 {
    //     animation-delay: 2s;
    //   }
    //   .animation-delay-4000 {
    //     animation-delay: 4s;
    //   }
    //   .animation-delay-6000 {
    //     animation-delay: 6s;
    //   }
    //   .bg-radial-gradient {
    //     background: radial-gradient(ellipse at center, var(--tw-gradient-stops));
    //   }
    // `}</style>
  );
}
