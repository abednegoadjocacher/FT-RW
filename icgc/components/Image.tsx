import React from 'react';
import Image from 'next/image';

interface MyImageProps {
  className?: string;
}

const MyImage = ({ className }: MyImageProps) => {
  return (
  <div className={`w-20 h-20 bg-green-600 rounded-lg flex items-center justify-center ${className}`}>
  <Image 
  src="/images/icgc-pht.jpeg" 
  alt="icgc-logo" 
  width={300} 
  height={300}
  priority />
  </div>
  );
};

export default MyImage;
