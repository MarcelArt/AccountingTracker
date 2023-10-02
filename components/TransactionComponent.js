import { Box, HStack, Heading, Text, VStack } from 'native-base';
import React from 'react';
import { Theme1, formatThousandSeparator } from '../utils/common';
import moment from 'moment';

const TransactionComponent = ({ description, date, amount }) => {
  amount = Number(amount);
  return (
    <VStack
      margin="1.5"
      justifyContent="flex-start"
      backgroundColor={Theme1.secondary}
      width="100%"
      borderRadius="5"
      padding={1.5}
      space={1}>
      <Heading size="sm" bold color={Theme1.accent}>
        {description}
      </Heading>
      <HStack space={1} justifyContent="space-between">
        <Text color={Theme1.accent}>{moment.utc(date).add(8, 'hours').format('ddd, Do MMM, YYYY HH:mm')}</Text>
        <Text marginX={1.5} alignSelf="flex-end" color={amount > 0 ? Theme1.success : Theme1.danger}>Rp. {formatThousandSeparator(amount)}</Text>
      </HStack>
    </VStack>
  );
};

export default TransactionComponent;
