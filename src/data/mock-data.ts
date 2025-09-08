import { MissingPerson } from "@/types/missingPerson";

export const pessoasPerdidas: MissingPerson[] = [
  {
    id: 2335,
    nome: "João da Silva",
    idade: 35,
    sexo: "MASCULINO",
    vivo: true,
    urlFoto: "https://s3dev.pjc.mt.gov.br/abitus.foto-pessoa/3f96ad2b10594470833957b77ff420fedc794ef89d51c9bdef0e321bc301c0fc-1621948089453.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=pjc%40dev%2F20250908%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250908T021855Z&X-Amz-Expires=600&X-Amz-SignedHeaders=host&X-Amz-Signature=2efb71d08a729084a0b26304071899c4942ec3ad327c38300fa249c7fdd81453",
    ultimaOcorrencia: {
      dtDesaparecimento: "2025-03-21T20:34:06.069",
      dataLocalizacao: null,
      encontradoVivo: true,
      localDesaparecimentoConcat: "Jardim das Acácias - Brasiléia/SP",
      ocorrenciaEntrevDesapDTO: {
        informacao: "A pessoa foi vista pela última vez em frente à sua casa.",
        vestimentasDesaparecido: "Camisa branca e jeans"
      },
      ocoId: 1517
    }
  },
  {
    id: 2336,
    nome: "Maria Santos Oliveira",
    idade: 42,
    sexo: "FEMININO",
    vivo: true,
    urlFoto: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=300&fit=crop&crop=face",
    ultimaOcorrencia: {
      dtDesaparecimento: "2025-01-15T08:30:00.000",
      dataLocalizacao: "2025-01-20T14:22:00.000",
      encontradoVivo: true,
      localDesaparecimentoConcat: "Centro de Cuiabá - Cuiabá/MT",
      ocorrenciaEntrevDesapDTO: {
        informacao: "Maria saiu para trabalhar e não retornou. Família muito preocupada.",
        vestimentasDesaparecido: "Blusa azul e calça jeans"
      },
      ocoId: 1518
    }
  },
  {
    id: 2337,
    nome: "Pedro Henrique Costa",
    idade: 28,
    sexo: "MASCULINO",
    vivo: true,
    urlFoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=face",
    ultimaOcorrencia: {
      dtDesaparecimento: "2025-01-10T19:45:00.000",
      dataLocalizacao: null,
      encontradoVivo: true,
      localDesaparecimentoConcat: "Bairro Jardim das Américas - Várzea Grande/MT",
      ocorrenciaEntrevDesapDTO: {
        informacao: "Pedro saiu para caminhar e não retornou. Usa óculos e tem dificuldades de locomoção.",
        vestimentasDesaparecido: "Camisa branca e calça social azul"
      },
      ocoId: 1519
    }
  },
  {
    id: 2338,
    nome: "Ana Beatriz Mendes",
    idade: 19,
    sexo: "FEMININO",
    vivo: true,
    urlFoto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop&crop=face",
    ultimaOcorrencia: {
      dtDesaparecimento: "2025-01-08T16:20:00.000",
      dataLocalizacao: null,
      encontradoVivo: true,
      localDesaparecimentoConcat: "Universidade Federal de Mato Grosso - Cuiabá/MT",
      ocorrenciaEntrevDesapDTO: {
        informacao: "Ana é estudante universitária e não retornou para casa após as aulas.",
        vestimentasDesaparecido: "Mochila rosa e tênis branco"
      },
      ocoId: 1520
    }
  },
  {
    id: 2339,
    nome: "Carlos Eduardo Silva",
    idade: 45,
    sexo: "MASCULINO",
    vivo: false,
    urlFoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop&crop=face",
    ultimaOcorrencia: {
      dtDesaparecimento: "2025-01-05T12:00:00.000",
      dataLocalizacao: "2025-01-12T09:30:00.000",
      encontradoVivo: false,
      localDesaparecimentoConcat: "Feira do Porto - Cuiabá/MT",
      ocorrenciaEntrevDesapDTO: {
        informacao: "Carlos é vendedor ambulante e não retornou para casa após o trabalho.",
        vestimentasDesaparecido: "Uniforme da empresa e carrinho de frutas"
      },
      ocoId: 1521
    }
  },
  {
    id: 2340,
    nome: "Lucia Helena Ferreira",
    idade: 52,
    sexo: "FEMININO",
    vivo: true,
    urlFoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=300&fit=crop&crop=face",
    ultimaOcorrencia: {
      dtDesaparecimento: "2025-01-03T14:15:00.000",
      dataLocalizacao: null,
      encontradoVivo: true,
      localDesaparecimentoConcat: "Terminal Rodoviário de Cuiabá - Cuiabá/MT",
      ocorrenciaEntrevDesapDTO: {
        informacao: "Lucia estava esperando o ônibus para voltar para casa e não apareceu. Tem problemas de memória.",
        vestimentasDesaparecido: "Bolsa marrom e casaco cinza"
      },
      ocoId: 1522
    }
  },
  {
    id: 2340,
    nome: "Lucia Helena Ferreira",
    idade: 52,
    sexo: "FEMININO",
    vivo: true,
    urlFoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=300&fit=crop&crop=face",
    ultimaOcorrencia: {
      dtDesaparecimento: "2025-01-03T14:15:00.000",
      dataLocalizacao: null,
      encontradoVivo: true,
      localDesaparecimentoConcat: "Terminal Rodoviário de Cuiabá - Cuiabá/MT",
      ocorrenciaEntrevDesapDTO: {
        informacao: "Lucia estava esperando o ônibus para voltar para casa e não apareceu. Tem problemas de memória.",
        vestimentasDesaparecido: "Bolsa marrom e casaco cinza"
      },
      ocoId: 1522
    }
  },
  {
    id: 2340,
    nome: "Lucia Helena Ferreira",
    idade: 52,
    sexo: "FEMININO",
    vivo: true,
    urlFoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=300&fit=crop&crop=face",
    ultimaOcorrencia: {
      dtDesaparecimento: "2025-01-03T14:15:00.000",
      dataLocalizacao: null,
      encontradoVivo: true,
      localDesaparecimentoConcat: "Terminal Rodoviário de Cuiabá - Cuiabá/MT",
      ocorrenciaEntrevDesapDTO: {
        informacao: "Lucia estava esperando o ônibus para voltar para casa e não apareceu. Tem problemas de memória.",
        vestimentasDesaparecido: "Bolsa marrom e casaco cinza"
      },
      ocoId: 1522
    }
  },
  {
    id: 2340,
    nome: "Lucia Helena Ferreira",
    idade: 52,
    sexo: "FEMININO",
    vivo: true,
    urlFoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=300&fit=crop&crop=face",
    ultimaOcorrencia: {
      dtDesaparecimento: "2025-01-03T14:15:00.000",
      dataLocalizacao: null,
      encontradoVivo: true,
      localDesaparecimentoConcat: "Terminal Rodoviário de Cuiabá - Cuiabá/MT",
      ocorrenciaEntrevDesapDTO: {
        informacao: "Lucia estava esperando o ônibus para voltar para casa e não apareceu. Tem problemas de memória.",
        vestimentasDesaparecido: "Bolsa marrom e casaco cinza"
      },
      ocoId: 1522
    }
  },
  {
    id: 2340,
    nome: "Lucia Helena Ferreira",
    idade: 52,
    sexo: "FEMININO",
    vivo: true,
    urlFoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=300&fit=crop&crop=face",
    ultimaOcorrencia: {
      dtDesaparecimento: "2025-01-03T14:15:00.000",
      dataLocalizacao: null,
      encontradoVivo: true,
      localDesaparecimentoConcat: "Terminal Rodoviário de Cuiabá - Cuiabá/MT",
      ocorrenciaEntrevDesapDTO: {
        informacao: "Lucia estava esperando o ônibus para voltar para casa e não apareceu. Tem problemas de memória.",
        vestimentasDesaparecido: "Bolsa marrom e casaco cinza"
      },
      ocoId: 1522
    }
  },
  {
    id: 2340,
    nome: "Lucia Helena Ferreira",
    idade: 52,
    sexo: "FEMININO",
    vivo: true,
    urlFoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=300&fit=crop&crop=face",
    ultimaOcorrencia: {
      dtDesaparecimento: "2025-01-03T14:15:00.000",
      dataLocalizacao: null,
      encontradoVivo: true,
      localDesaparecimentoConcat: "Terminal Rodoviário de Cuiabá - Cuiabá/MT",
      ocorrenciaEntrevDesapDTO: {
        informacao: "Lucia estava esperando o ônibus para voltar para casa e não apareceu. Tem problemas de memória.",
        vestimentasDesaparecido: "Bolsa marrom e casaco cinza"
      },
      ocoId: 1522
    }
  },
  {
    id: 2340,
    nome: "Lucia Helena Ferreira",
    idade: 52,
    sexo: "FEMININO",
    vivo: true,
    urlFoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=300&fit=crop&crop=face",
    ultimaOcorrencia: {
      dtDesaparecimento: "2025-01-03T14:15:00.000",
      dataLocalizacao: null,
      encontradoVivo: true,
      localDesaparecimentoConcat: "Terminal Rodoviário de Cuiabá - Cuiabá/MT",
      ocorrenciaEntrevDesapDTO: {
        informacao: "Lucia estava esperando o ônibus para voltar para casa e não apareceu. Tem problemas de memória.",
        vestimentasDesaparecido: "Bolsa marrom e casaco cinza"
      },
      ocoId: 1522
    }
  },
  {
    id: 2340,
    nome: "Lucia Helena Ferreira",
    idade: 52,
    sexo: "FEMININO",
    vivo: true,
    urlFoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=300&fit=crop&crop=face",
    ultimaOcorrencia: {
      dtDesaparecimento: "2025-01-03T14:15:00.000",
      dataLocalizacao: null,
      encontradoVivo: true,
      localDesaparecimentoConcat: "Terminal Rodoviário de Cuiabá - Cuiabá/MT",
      ocorrenciaEntrevDesapDTO: {
        informacao: "Lucia estava esperando o ônibus para voltar para casa e não apareceu. Tem problemas de memória.",
        vestimentasDesaparecido: "Bolsa marrom e casaco cinza"
      },
      ocoId: 1522
    }
  },
  {
    id: 2340,
    nome: "Lucia Helena Ferreira",
    idade: 52,
    sexo: "FEMININO",
    vivo: true,
    urlFoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=300&fit=crop&crop=face",
    ultimaOcorrencia: {
      dtDesaparecimento: "2025-01-03T14:15:00.000",
      dataLocalizacao: null,
      encontradoVivo: true,
      localDesaparecimentoConcat: "Terminal Rodoviário de Cuiabá - Cuiabá/MT",
      ocorrenciaEntrevDesapDTO: {
        informacao: "Lucia estava esperando o ônibus para voltar para casa e não apareceu. Tem problemas de memória.",
        vestimentasDesaparecido: "Bolsa marrom e casaco cinza"
      },
      ocoId: 1522
    }
  },
  {
    id: 2340,
    nome: "Lucia Helena Ferreira",
    idade: 52,
    sexo: "FEMININO",
    vivo: true,
    urlFoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=300&fit=crop&crop=face",
    ultimaOcorrencia: {
      dtDesaparecimento: "2025-01-03T14:15:00.000",
      dataLocalizacao: null,
      encontradoVivo: true,
      localDesaparecimentoConcat: "Terminal Rodoviário de Cuiabá - Cuiabá/MT",
      ocorrenciaEntrevDesapDTO: {
        informacao: "Lucia estava esperando o ônibus para voltar para casa e não apareceu. Tem problemas de memória.",
        vestimentasDesaparecido: "Bolsa marrom e casaco cinza"
      },
      ocoId: 1522
    }
  },
  {
    id: 2340,
    nome: "Lucia Helena Ferreira",
    idade: 52,
    sexo: "FEMININO",
    vivo: true,
    urlFoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=300&fit=crop&crop=face",
    ultimaOcorrencia: {
      dtDesaparecimento: "2025-01-03T14:15:00.000",
      dataLocalizacao: null,
      encontradoVivo: true,
      localDesaparecimentoConcat: "Terminal Rodoviário de Cuiabá - Cuiabá/MT",
      ocorrenciaEntrevDesapDTO: {
        informacao: "Lucia estava esperando o ônibus para voltar para casa e não apareceu. Tem problemas de memória.",
        vestimentasDesaparecido: "Bolsa marrom e casaco cinza"
      },
      ocoId: 1522
    }
  },
  {
    id: 2340,
    nome: "Lucia Helena Ferreira",
    idade: 52,
    sexo: "FEMININO",
    vivo: true,
    urlFoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=300&fit=crop&crop=face",
    ultimaOcorrencia: {
      dtDesaparecimento: "2025-01-03T14:15:00.000",
      dataLocalizacao: null,
      encontradoVivo: true,
      localDesaparecimentoConcat: "Terminal Rodoviário de Cuiabá - Cuiabá/MT",
      ocorrenciaEntrevDesapDTO: {
        informacao: "Lucia estava esperando o ônibus para voltar para casa e não apareceu. Tem problemas de memória.",
        vestimentasDesaparecido: "Bolsa marrom e casaco cinza"
      },
      ocoId: 1522
    }
  },
  {
    id: 2340,
    nome: "Lucia Helena Ferreira",
    idade: 52,
    sexo: "FEMININO",
    vivo: true,
    urlFoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=300&fit=crop&crop=face",
    ultimaOcorrencia: {
      dtDesaparecimento: "2025-01-03T14:15:00.000",
      dataLocalizacao: null,
      encontradoVivo: true,
      localDesaparecimentoConcat: "Terminal Rodoviário de Cuiabá - Cuiabá/MT",
      ocorrenciaEntrevDesapDTO: {
        informacao: "Lucia estava esperando o ônibus para voltar para casa e não apareceu. Tem problemas de memória.",
        vestimentasDesaparecido: "Bolsa marrom e casaco cinza"
      },
      ocoId: 1522
    }
  },
  {
    id: 2340,
    nome: "Lucia Helena Ferreira",
    idade: 52,
    sexo: "FEMININO",
    vivo: true,
    urlFoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=300&fit=crop&crop=face",
    ultimaOcorrencia: {
      dtDesaparecimento: "2025-01-03T14:15:00.000",
      dataLocalizacao: null,
      encontradoVivo: true,
      localDesaparecimentoConcat: "Terminal Rodoviário de Cuiabá - Cuiabá/MT",
      ocorrenciaEntrevDesapDTO: {
        informacao: "Lucia estava esperando o ônibus para voltar para casa e não apareceu. Tem problemas de memória.",
        vestimentasDesaparecido: "Bolsa marrom e casaco cinza"
      },
      ocoId: 1522
    }
  },
  {
    id: 2340,
    nome: "Lucia Helena Ferreira",
    idade: 52,
    sexo: "FEMININO",
    vivo: true,
    urlFoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=300&fit=crop&crop=face",
    ultimaOcorrencia: {
      dtDesaparecimento: "2025-01-03T14:15:00.000",
      dataLocalizacao: null,
      encontradoVivo: true,
      localDesaparecimentoConcat: "Terminal Rodoviário de Cuiabá - Cuiabá/MT",
      ocorrenciaEntrevDesapDTO: {
        informacao: "Lucia estava esperando o ônibus para voltar para casa e não apareceu. Tem problemas de memória.",
        vestimentasDesaparecido: "Bolsa marrom e casaco cinza"
      },
      ocoId: 1522
    }
  },
  {
    id: 2340,
    nome: "Lucia Helena Ferreira",
    idade: 52,
    sexo: "FEMININO",
    vivo: true,
    urlFoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=300&fit=crop&crop=face",
    ultimaOcorrencia: {
      dtDesaparecimento: "2025-01-03T14:15:00.000",
      dataLocalizacao: null,
      encontradoVivo: true,
      localDesaparecimentoConcat: "Terminal Rodoviário de Cuiabá - Cuiabá/MT",
      ocorrenciaEntrevDesapDTO: {
        informacao: "Lucia estava esperando o ônibus para voltar para casa e não apareceu. Tem problemas de memória.",
        vestimentasDesaparecido: "Bolsa marrom e casaco cinza"
      },
      ocoId: 1522
    }
  },
  {
    id: 2340,
    nome: "Lucia Helena Ferreira",
    idade: 52,
    sexo: "FEMININO",
    vivo: true,
    urlFoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=300&fit=crop&crop=face",
    ultimaOcorrencia: {
      dtDesaparecimento: "2025-01-03T14:15:00.000",
      dataLocalizacao: null,
      encontradoVivo: true,
      localDesaparecimentoConcat: "Terminal Rodoviário de Cuiabá - Cuiabá/MT",
      ocorrenciaEntrevDesapDTO: {
        informacao: "Lucia estava esperando o ônibus para voltar para casa e não apareceu. Tem problemas de memória.",
        vestimentasDesaparecido: "Bolsa marrom e casaco cinza"
      },
      ocoId: 1522
    }
  },
];
