import { FC, useEffect } from 'react';
import { useCancelSellFixStages } from '../../../hooks/useMarketplaceStages';
import DefaultMarketStages from './StagesModal';
import { TTokenPageModalBodyProps } from './TokenPageModal';

export const CancelSellFixStagesModal: FC<TTokenPageModalBodyProps> = ({ token, onFinish, setIsClosable }) => {
  const { stages, status, initiate } = useCancelSellFixStages(token.collectionId || 0, token.id);
  useEffect(() => { initiate(null); }, []);
  return (
    <div>
      <DefaultMarketStages stages={stages} status={status} onFinish={onFinish} />
    </div>
  );
};
