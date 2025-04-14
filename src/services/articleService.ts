
import { Article } from "@/types";

const API_URL = "http://192.168.20.115:5000/articles";

export async function fetchArticles(): Promise<Article[]> {
  const response = await fetch(API_URL);
  
  if (!response.ok) {
    throw new Error("Failed to fetch articles");
  }
  
  return response.json();
}

export async function fetchArticleById(id: string): Promise<Article> {
  const response = await fetch(`${API_URL}/${id}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch article with ID: ${id}`);
  }
  
  return response.json();
}

export async function createArticle(articleData: Omit<Article, "id">): Promise<Article> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(articleData),
  });
  
  if (!response.ok) {
    throw new Error("Failed to create article");
  }
  
  return response.json();
}

export async function updateArticle(id: string, articleData: Partial<Article>): Promise<Article> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(articleData),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to update article with ID: ${id}`);
  }
  
  return response.json();
}

export async function deleteArticle(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  
  if (!response.ok) {
    throw new Error(`Failed to delete article with ID: ${id}`);
  }
}
