import AsyncStorage from "@react-native-async-storage/async-storage"

export const getAllTransactions = async () => {
  const transactions = await AsyncStorage.getItem('transactions');

  return transactions ? JSON.parse(transactions) : [];
}

export const saveTransactions = async (transactions) => {
  if (!transactions) return;
  await AsyncStorage.setItem('transactions', JSON.stringify(transactions));
}