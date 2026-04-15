export interface QRConfig {
  data: string;
  image: string | null;
  width: number;
  height: number;
  margin: number;
  dotsOptions: {
    color: string;
    type: 'rounded' | 'dots' | 'classy' | 'classy-rounded' | 'square' | 'extra-rounded';
  };
  cornersSquareOptions: {
    color: string;
    type: 'dot' | 'square' | 'extra-rounded';
  };
  cornersDotOptions: {
    color: string;
    type: 'dot' | 'square';
  };
  backgroundOptions: {
    color: string;
  };
  imageOptions: {
    crossOrigin: string;
    margin: number;
    imageSize: number;
  };
}

export const DEFAULT_QR_CONFIG: QRConfig = {
  data: 'https://qr-code-styling.com',
  image: null,
  width: 300,
  height: 300,
  margin: 10,
  dotsOptions: {
    color: '#333333',
    type: 'square',
  },
  cornersSquareOptions: {
    color: '#333333',
    type: 'square',
  },
  cornersDotOptions: {
    color: '#333333',
    type: 'square',
  },
  backgroundOptions: {
    color: '#ffffff',
  },
  imageOptions: {
    crossOrigin: 'anonymous',
    margin: 20,
    imageSize: 0.4,
  },
};
