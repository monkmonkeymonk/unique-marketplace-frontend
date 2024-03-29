import React, { FC, useCallback, useMemo, useState } from 'react';
import { Heading, Modal } from '@unique-nft/ui-kit';
import styled from 'styled-components/macro';

import { TAccountModalProps, CreateAccountModalStages, TAccountProperties, TCreateAccountBodyModalProps } from './types';
import { useAccounts } from '../../../hooks/useAccounts';
import { FinalModal } from './Final';
import { AskCredentialsModal } from './AskCredentials';
import { AskSeedPhraseModal } from './AskSeedPhrase';
import { sleep } from '../../../utils/helpers';

export const derivePath = '';

export const defaultPairType = 'sr25519';

export const CreateAccountModal: FC<TAccountModalProps> = ({ isVisible, onFinish, onClose }) => {
  const [stage, setStage] = useState<CreateAccountModalStages>(CreateAccountModalStages.AskSeed);
  const [accountProperties, setAccountProperties] = useState<TAccountProperties>();
  const { addLocalAccount } = useAccounts();

  const ModalBodyComponent = useMemo<FC<TCreateAccountBodyModalProps> | null>(() => {
    switch (stage) {
      case CreateAccountModalStages.AskSeed:
        return AskSeedPhraseModal;
      case CreateAccountModalStages.AskCredentials:
        return AskCredentialsModal;
      case CreateAccountModalStages.Final:
        return FinalModal;
      default:
        return null;
    }
  }, [stage]);

  const onStageFinish = useCallback((accountProperties: TAccountProperties) => {
    if (stage === CreateAccountModalStages.Final) {
      if (!accountProperties) return;
      addLocalAccount(accountProperties.seed, derivePath, accountProperties.name || '', accountProperties.password || '', defaultPairType);
      onFinish();
      setStage(CreateAccountModalStages.AskSeed);
      return;
    }
    setAccountProperties(accountProperties);
    setStage(stage + 1);
  }, [stage]);

  const onGoBack = useCallback(() => {
    if (stage === CreateAccountModalStages.AskSeed) return;
    setStage(stage - 1);
  }, [stage]);

  if (!ModalBodyComponent) return null;

  return (<Modal isVisible={isVisible} isClosable={true} onClose={onClose}>
    <Content>
      <Heading size='2'>Add an account via seed phrase</Heading>
    </Content>
    <ModalBodyComponent
      accountProperties={accountProperties}
      onFinish={onStageFinish}
      onGoBack={onGoBack}
    />
  </Modal>);
};

const Content = styled.div`
  && h2 {
    margin-bottom: 0;
  }
`;
