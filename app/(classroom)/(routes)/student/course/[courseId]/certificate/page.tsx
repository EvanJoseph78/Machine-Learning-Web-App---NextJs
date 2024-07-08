'use client';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const CertificateGenerator = () => {
  const [imageDataUrl, setImageDataUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const loadImageAsDataUrl = (url: string) => {
    return new Promise((resolve, reject) => {
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
    const imageUrl = '/c.png'; // Caminho para sua imagem
    loadImageAsDataUrl(imageUrl)
      .then((dataUrl) => {
        setImageDataUrl(dataUrl);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Failed to load image:', error);
        setIsLoading(false);
      });
  }, []);

  const generatePDF = () => {
    if (!imageDataUrl) {
      alert('Imagem de fundo ainda não carregada!');
      return;
    }

    const pageWidth = 1123;
    const pageHeight = 794;

    const docDefinition = {
      content: [
      ],
      background: [
        {
          image: imageDataUrl,
          width: pageWidth,
          height: pageHeight,
        },
      ],
      pageSize: {
        width: pageWidth,
        height: pageHeight,
      },
    };

    pdfMake.createPdf(docDefinition).download('certificado.pdf');
  };

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-4">Gerar Certificado</h1>
      {isLoading ? (
        <Button onClick={generatePDF} disabled>
          Carregando...
        </Button>
      ) : (
        <Button onClick={generatePDF}>Gerar certificado</Button>
      )}
    </div>
  );
};

export default CertificateGenerator;

