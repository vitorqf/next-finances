"use server";

import api from "@/lib/api";

export async function fetchCategories() {
  try {
    const res = await api.categories.get();
    console.log(res);
    return res;
  } catch (error) {
    console.error(error);
  }
}
