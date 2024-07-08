'use client';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

// Configuração necessária para pdfmake
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const CertificateGenerator = () => {
  const [imageDataUrl, setImageDataUrl] = useState(''); // Estado para armazenar o data URL da imagem
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar o estado de carregamento

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
    const imageUrl = '/c.png'; // Caminho para sua imagem de fundo
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

    const docDefinition = {
      content: [], // Conteúdo do certificado, como texto, pode ser adicionado aqui
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
    };

    // Cria e faz o download do PDF usando pdfmake
    pdfMake.createPdf(docDefinition).download('certificado.pdf');
  };

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-4">Gerar Certificado</h1>
      {isLoading ? ( // Exibe um botão desativado se ainda estiver carregando a imagem
        <Button onClick={generatePDF} disabled>
          Carregando...
        </Button>
      ) : ( // Exibe o botão normal para gerar o certificado quando a imagem estiver carregada
        <Button onClick={generatePDF}>Gerar certificado</Button>
      )}
    </div>
  );
};

export default CertificateGenerator;
