import { Card } from "@/models/Card";

export const BASE_URL = "http://localhost:3000";

async function login({ email, password }: { email: string; password: string }) {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: email, password }),
  });
  const { access_token } = await response.json();
  if (access_token) {
    const user = await fetch(`${BASE_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }).then((res) => res.json());
    return { ...user, accessToken: access_token };
  }
  throw new Error("invalid credentials");
}

async function getCategories() {
  const response = await fetch(`${BASE_URL}/categories`);
  return response.json();
}

async function getTransactions({
  page = 0,
  limit = 10,
  filter = "",
  filterBy = "",
  date = new Date(),
  token,
}: {
  page?: number;
  limit?: number;
  filter?: string;
  filterBy?: string;
  date?: Date;
  token: string;
}) {
  const response = await fetch(
    `${BASE_URL}/transactions?page=${page}&limit=${limit}&filter=${filter}&filterBy=${filterBy}&date=${date}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  ).then((res) => res.json());
  return {
    results: response.results,
    total: response.total,
  };
}

async function getTransaction(id: string, token: string) {
  const response = await fetch(`${BASE_URL}/transactions/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}

async function getCards(token: string) {
  const response = await fetch(`${BASE_URL}/cards`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}

async function createCard(
  card: {
    digits: string;
    title: string;
    flag: string;
    type: string;
  },
  token: string,
) {
  const response = await fetch(`${BASE_URL}/cards`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      last_digits: Number(card.digits),
      title: card.title,
      flag: card.flag.toLowerCase(),
      type: card.type,
    }),
  });
  return response.json();
}

const api = {
  transactions: {
    get: getTransactions,
    find: getTransaction,
  },
  cards: {
    get: getCards,
    post: createCard,
  },
  auth: {
    login,
  },
  categories: {
    get: getCategories,
  },
};

export default api;
