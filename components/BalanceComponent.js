import { Box, HStack, Heading, Text, VStack } from 'native-base';
import { Theme1, formatThousandSeparator } from '../utils/common';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const BalanceComponent = ({ transactions }) => {
  const balance = transactions?.reduce(
    (total, transaction) => total + +transaction.amount,
    0,
  );

  const incomes = transactions?.filter(transaction => transaction.amount >= 0).reduce(
    (total, transaction) => total + +transaction.amount,
    0,
  );

  const outcomes = transactions?.filter(transaction => transaction.amount < 0).reduce(
    (total, transaction) => total + +transaction.amount,
    0,
  );

  console.log('balance :>> ', balance);

  return (
    <VStack width="100%" marginY="1.5" space={1} alignItems="center">
      <Box
        alignItems="center"
        backgroundColor={Theme1.secondary}
        borderRadius={5}
        padding="1.5"
        width="100%">
        <Text color={Theme1.accent}>Current balance</Text>
        <Heading color={Theme1.accent}>Rp. {formatThousandSeparator(balance || 0)}</Heading>
      </Box>
      <HStack space={1} justifyContent="space-between">
        <Box
          width="1/2"
          alignItems="left"
          padding={2}
          backgroundColor={Theme1.secondary}
          borderRadius={5}>
          <MaterialIcon name="trending-up" size={30} color={Theme1.success}/>
          <Heading size="md" color={Theme1.accent}>Incomes</Heading>
          <Text color={Theme1.accent}>Rp. {formatThousandSeparator(incomes || 0)}</Text>
        </Box>
        <Box
          width="1/2"
          alignItems="left"
          padding={2}
          backgroundColor={Theme1.secondary}
          borderRadius={5}>
          <MaterialIcon name="trending-down" size={30} color={Theme1.danger}/>
          <Heading size="md" color={Theme1.accent}>Outcomes</Heading>
          <Text color={Theme1.accent}>Rp. {formatThousandSeparator(outcomes|| 0)}</Text>
        </Box>
      </HStack>
    </VStack>
  );
};

export default BalanceComponent;
