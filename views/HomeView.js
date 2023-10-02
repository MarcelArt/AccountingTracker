import {
  NativeBaseProvider,
  Box,
  FlatList,
  Fab,
  Icon,
  AddIcon,
  Modal,
  FormControl,
  Button,
  Input,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import TransactionComponent from '../components/TransactionComponent';
import { Theme1, formatThousandSeparator } from '../utils/common';

import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { getAllTransactions, saveTransactions } from '../services/transactionService';
import BalanceComponent from '../components/BalanceComponent';

const dummyTransactions = [
  {
    id: uuidv4(),
    description: 'Monthly Salary',
    date: moment.utc().toDate(),
    amount: 4000000,
    type: 'income',
  },
  {
    id: uuidv4(),
    description: 'Withdraw ATM',
    date: moment.utc().toDate(),
    amount: -250000,
    type: 'outcome',
  },
];

const HomeView = () => {
  let [isAddTrx, setIsAddTrx] = useState(false);
  let [description, setDescription] = useState('');
  let [amount, setAmount] = useState('');
  let [transactions, setTransactions] = useState([]);
  // let [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getTransactions = async () => {
      transactions = await getAllTransactions();
      console.log({ transactions });
      // setIsLoading(false);
      setTransactions(transactions);
    };
  
    getTransactions();

    return () => {};
  }, [])

  useEffect(() => {
    setDescription('');
    setAmount('');
    // setIsLoading(true);
  }, [isAddTrx]);

  const renderTransactions = ({ item }) => {
    return (
      <TransactionComponent
        description={item.description}
        date={item.date}
        amount={item.amount}
      />
    );
  };

  const onPressAddTransaction = () => {
    setIsAddTrx(true);
  };

  const onPressSaveTransaction = () => {
    console.log({
      description,
      amount,
    });

    transactions.unshift({
      id: uuidv4(),
      description,
      date: moment.utc().toDate(),
      amount: +amount,
      type: +amount > 0 ? 'income' : 'outcome',
    });

    saveTransactions(transactions);

    setIsAddTrx(false);
  };

  const onPressResetTransactions = () => {
    transactions = [];
    saveTransactions(transactions);
    setTransactions(transactions);
  }

  return (
    <Box
      backgroundColor={Theme1.primary}
      alignItems="center"
      height="100%"
      paddingX="5">
      <BalanceComponent transactions={transactions} />
      <Button onPress={onPressResetTransactions} alignSelf="flex-start" variant="ghost" colorScheme="danger">Reset Transactions</Button>
      <FlatList
        width="100%"
        data={transactions}
        renderItem={renderTransactions}
      />
      <Fab
        onPress={onPressAddTransaction}
        renderInPortal={false}
        shadow={2}
        size="sm"
        icon={<AddIcon />}
      />
      <Modal isOpen={isAddTrx} onClose={() => setIsAddTrx(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Add transaction @ {formatThousandSeparator(amount)}</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Description</FormControl.Label>
              <Input value={description} onChangeText={setDescription} />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Amount</FormControl.Label>
              <Input
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
              />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setIsAddTrx(false);
                }}>
                Cancel
              </Button>
              <Button onPress={onPressSaveTransaction}>Save</Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Box>
  );
};

export default HomeView;
