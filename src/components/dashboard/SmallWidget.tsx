import React from "react";
import Image from "next/image";

interface SmallWidgetProps {
  title: string;
  number: number;
  image: string;
}

const SmallWidget: React.FC<SmallWidgetProps> = ({ title, number, image }) => {
  return (
    <div className="card">
      <div className="flex gap-2 h-[100%]">
        <div className="flex-1 flex flex-col justify-between py-4 pl-4">
          <h2 className="text-base md:text-xs lg:text-base">{title}</h2>
          <p className="text-xl md:text-lg lg:text-xl font-bold">{number}</p>
        </div>
        <div className="flex-1 max-w-[140px] flex items-center">
          <Image src={image} alt="image" width={140} height={120} />
        </div>
      </div>
    </div>
  );
};

export default SmallWidget;
