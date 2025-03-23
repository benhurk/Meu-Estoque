import pdfSvg from '../assets/pdf-svg.svg';
import wppSvg from '../assets/wpp-svg.svg';
import happySvg from '../assets/happy-svg.svg';
import uploadSvg from '../assets/upload-svg.svg';

const features = [
    {
        title: 'Sistema fácil',
        description:
            'Crie e gerencie sua lista de estoque com uma interface intuitiva e fácil de usar. Sem conhecimento técnico necessário.',
        icon: happySvg,
    },
    {
        title: 'Comunicação rápida',
        description:
            'Envie sua lista como mensagem de texto via WhatsApp, Telegram, ou Email com alguns cliques.',
        icon: wppSvg,
    },
    {
        title: 'Registros em PDF',
        description:
            'Gere um arquivo PDF dos seus registros com um clique, facilitando o compartilhamento e arquivamento das movimentações no estoque.',
        icon: pdfSvg,
    },
    {
        title: 'Importação e exportação',
        description:
            'Baixe seus dados para compartilhar a mesma lista com colegas ou fazer um backup.',
        icon: uploadSvg,
    },
];

export default features;
