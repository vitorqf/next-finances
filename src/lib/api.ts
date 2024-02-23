const BASE_URL = "http://localhost:3000";

async function getTransactions() {
  const response = await fetch(`${BASE_URL}/transactions`);
  return response.json();
}

async function getTransaction(id: string) {
  const response = await fetch(`${BASE_URL}/transactions/${id}`);
  return response.json();
}

const api = {
  transactions: {
    get: getTransactions,
    find: getTransaction,
  },
};

export default api;
