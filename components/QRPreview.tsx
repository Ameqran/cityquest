'use client';

import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Button } from './ui/button';

interface QRPreviewProps {
  text: string;
}

export function QRPreview({ text }: QRPreviewProps) {
  const [dataUrl, setDataUrl] = useState<string>('');

  useEffect(() => {
    QRCode.toDataURL(text, { margin: 2, width: 240 }).then(setDataUrl);
  }, [text]);

  return (
    <div className="flex flex-col items-center space-y-4">
      {dataUrl ? <img src={dataUrl} alt="QR code" className="h-48 w-48 rounded-lg border bg-white p-4" /> : null}
      {dataUrl ? (
        <Button
          onClick={() => {
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = 'cityquests-qr.png';
            link.click();
          }}
        >
          Download PNG
        </Button>
      ) : null}
    </div>
  );
}
