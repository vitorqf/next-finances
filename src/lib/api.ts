export const BASE_URL = "http://localhost:3000";

async function getTransactions({
  page = 0,
  limit = 10,
  filter = "",
  filterBy = "",
}: {
  page?: number;
  limit?: number;
  filter?: string;
  filterBy?: string;
} = {}) {
  const response = await fetch(
    `${BASE_URL}/transactions?page=${page}&limit=${limit}&filter=${filter}&filterBy=${filterBy}`
  ).then((res) => res.json());
  return {
    results: response.results,
    total: response.total,
  };
}

async function getTransaction(id: string) {
  const response = await fetch(`${BASE_URL}/transactions/${id}`);
  return response.json();
}

async function getCards() {
  const response = await fetch(`${BASE_URL}/cards`);
  return response.json();
}

const api = {
  transactions: {
    get: getTransactions,
    find: getTransaction,
  },
  cards: {
    get: getCards,
  },
};

export default api;
