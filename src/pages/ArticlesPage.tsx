
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchArticles, deleteArticle } from "@/services/articleService";
import { toast } from "sonner";
import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import ArticleCard from "@/components/ArticleCard";

const ArticlesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [articleToDelete, setArticleToDelete] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const { data: articles = [], isLoading, error } = useQuery({
    queryKey: ["articles"],
    queryFn: fetchArticles,
  });
console.log("articles", articles);
  const deleteArticleMutation = useMutation({
    mutationFn: deleteArticle,
    onSuccess: () => {
      toast.success("Article deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
    onError: (error) => {
      toast.error(`Error deleting article: ${error instanceof Error ? error.message : "Unknown error"}`);
    },
  });

  const handleDelete = (id: string) => {
    setArticleToDelete(id);
  };

  const confirmDelete = () => {
    if (articleToDelete) {
      deleteArticleMutation.mutate(articleToDelete);
      setArticleToDelete(null);
    }
  };

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (article.author && article.author.toLowerCase().includes(searchTerm.toLowerCase()))
  );
console.log("filteredArticles", filteredArticles);
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold">Articles</h1>

        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search articles..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center min-h-[300px]">
          <Loader2 className="size-8 animate-spin text-primary" />
        </div>
      ) : error ? (
        <div className="py-8 text-center">
          <p className="text-destructive mb-4">
            Error loading articles. Please try again later.
          </p>
          <Button
            onClick={() => queryClient.invalidateQueries({ queryKey: ["articles"] })}
          >
            Retry
          </Button>
        </div>
      ) : filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <ArticleCard
            
              key={article._id}
              article={article}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">
            {searchTerm ? "No articles match your search" : "No articles found"}
          </p>
        </div>
      )}

      <AlertDialog open={!!articleToDelete} onOpenChange={(open) => !open && setArticleToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the article.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ArticlesPage;
