import React from 'react';
import Retailrunner from './Retailrunner';

interface RetailrunnerWidgetProps {
  wallet?: string | null;
}

const RetailrunnerWidget = ({ wallet }: RetailrunnerWidgetProps) => {
  return (
    <div className="fixed bottom-4 right-4 z-[9999]">
      <Retailrunner wallet={wallet} />
    </div>
  );
};

export default RetailrunnerWidget; 