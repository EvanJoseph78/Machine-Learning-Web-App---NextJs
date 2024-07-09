
'use client';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

// Configuração necessária para pdfmake
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const CertificateBtn = () => {
  const [imageDataUrl, setImageDataUrl] = useState(''); // Estado para armazenar o data URL da imagem
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar o estado de carregamento

  const [userInfo, setUserInfo] = useState(
    {
      fullname: "Evandro José da Silva Mariano",
      timeFineshed: "04 de Ferereiro de 1998",
      workload: "4 horas",
      courseName: "Técnicas Básicas em Machine Learning com tópicos especiais em."
    }
  );

  // Função para carregar uma imagem como data URL
  const loadImageAsDataUrl = (url: string) => {
    return new Promise<string>((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          resolve(canvas.toDataURL('image/png'));
        } else {
          reject(new Error('Failed to create canvas context'));
        }
      };
      img.onerror = reject;
      img.src = url;
    });
  };

  useEffect(() => {
    const imageUrl = '/certificate-template-2.png'; // Caminho para sua imagem de fundo
    loadImageAsDataUrl(imageUrl)
      .then((dataUrl) => {
        setImageDataUrl(dataUrl); // Define o data URL da imagem no estado
        setIsLoading(false); // Indica que a imagem foi carregada e o componente não está mais em estado de carregamento
      })
      .catch((error) => {
        console.error('Failed to load image:', error);
        setIsLoading(false); // Em caso de erro, também paramos o estado de carregamento
      });
  }, []); // O array vazio assegura que este efeito só seja executado uma vez, quando o componente é montado

  // Função para gerar o PDF quando o botão é clicado
  const generatePDF = () => {
    if (!imageDataUrl) {
      alert('Imagem de fundo ainda não carregada!');
      return;
    }

    const pageWidth = 1123; // Largura da página do certificado em pixels
    const pageHeight = 794; // Altura da página do certificado em pixels

    const docDefinition: TDocumentDefinitions = {
      content: [
        {
          text: "Certificamos que,",
          absolutePosition: { x: 120, y: 350 },
          fontSize: 16,
        },
        {
          text: userInfo.fullname,
          fontSize: 22,
          bold: true,
          absolutePosition: { x: 120, y: 375 },
        },
        {
          text: `em ${userInfo.timeFineshed}, concluiu o curso de`,
          fontSize: 16,
          absolutePosition: { x: 120, y: 400 },
        },
        {
          text: `${userInfo.courseName}`,
          fontSize: 30,
          absolutePosition: { x: 120, y: 425 },
        },
        {
          text: `com carga horária de ${userInfo.workload}.`,
          fontSize: 16,
          absolutePosition: {
            x: 120,
            y: userInfo.courseName.length <= 61 ? 460 : 500
          },
        },
        {
          text: "Universidade Federal do Pará - UFPA",
          fontSize: 12,
          absolutePosition: { y: 525 },
          alignment: "right"
        },
        {
          text: `${userInfo.timeFineshed}`,
          fontSize: 12,
          absolutePosition: { y: 540 },
          alignment: "right"
        },
        {
          text: `FACOMP`,
          fontSize: 12,
          absolutePosition: { y: 555 },
          alignment: "right"
        },

      ], // Conteúdo do certificado, como texto, pode ser adicionado aqui
      background: [
        {
          image: imageDataUrl, // Imagem de fundo carregada dinamicamente
          width: pageWidth,
          height: pageHeight,
        },
      ],
      pageSize: {
        width: pageWidth,
        height: pageHeight,
      },
      pageMargins: [120, 60, 120, 60],
    };

    // Cria e faz o download do PDF usando pdfmake
    pdfMake.createPdf(docDefinition).download('certificado.pdf');
  };

  if (isLoading) {
    return (
      <Button onClick={generatePDF} disabled>
        Carregando...
      </Button>
    )
  }

  return (
    <Button onClick={generatePDF}>Gerar certificado</Button>
  );

};

