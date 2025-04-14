import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createArticle } from "@/services/articleService";
import { toast } from "sonner";
import ArticleForm from "@/components/ArticleForm";

const AddArticlePage = () => {
  const navigate = useNavigate();
  
  const createArticleMutation = useMutation({
    mutationFn: createArticle,
    onSuccess: () => {
      toast.success("Article created successfully");
      navigate("/");
    },
    onError: (error) => {
      toast.error(`Error creating article: ${error instanceof Error ? error.message : "Unknown error"}`);
    },
  });
  
  const handleSubmit = (data: any) => {
    createArticleMutation.mutate(data);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Add New Article</h1>
      
      <div className="max-w-2xl mx-auto">
        <ArticleForm 
          onSubmit={handleSubmit} 
          isLoading={createArticleMutation.isPending}
        />
      </div>
    </div>
  );
};

export default AddArticlePage;
