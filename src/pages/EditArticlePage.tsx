
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchArticleById, updateArticle } from "@/services/articleService";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ArticleForm from "@/components/ArticleForm";

const EditArticlePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const { data: article, isLoading, error } = useQuery({
    queryKey: ["article", id],
    queryFn: () => fetchArticleById(id!),
    enabled: !!id,
  });
  
  const updateArticleMutation = useMutation({
    mutationFn: (data: any) => updateArticle(id!, data),
    onSuccess: () => {
      toast.success("Article updated successfully");
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      queryClient.invalidateQueries({ queryKey: ["article", id] });
      navigate("/");
    },
    onError: (error) => {
      toast.error(`Error updating article: ${error instanceof Error ? error.message : "Unknown error"}`);
    },
  });
  
  const handleSubmit = (data: any) => {
    updateArticleMutation.mutate(data);
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[300px]">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-destructive mb-4">
          Error loading article. The article may have been deleted or you may have entered an invalid URL.
        </p>
        <Button onClick={() => navigate("/")}>Back to Articles</Button>
      </div>
    );
  }
  
  if (!article) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-destructive mb-4">Article not found</p>
        <Button onClick={() => navigate("/")}>Back to Articles</Button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Edit Article</h1>
      
      <div className="max-w-2xl mx-auto">
        <ArticleForm 
          article={article} 
          onSubmit={handleSubmit} 
          isLoading={updateArticleMutation.isPending}
        />
      </div>
    </div>
  );
};

export default EditArticlePage;
