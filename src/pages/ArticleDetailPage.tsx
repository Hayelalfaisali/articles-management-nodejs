
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchArticleById } from "@/services/articleService";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Edit, Loader2, User } from "lucide-react";

const ArticleDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { data: article, isLoading, error } = useQuery({
    queryKey: ["article", id],
    queryFn: () => fetchArticleById(id!),
    enabled: !!id,
  });
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[300px]">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }
  
  if (error || !article) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-destructive mb-4">
          Error loading article. The article may have been deleted or you may have entered an invalid URL.
        </p>
        <Button onClick={() => navigate("/")}>Back to Articles</Button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="mr-2 size-4" />
          Back
        </Button>
        
        <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
        
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground mb-8">
          {article.author && (
            <div className="flex items-center gap-1.5">
              <User className="size-4" />
              <span>{article.author}</span>
            </div>
          )}
          
          {article.createdAt && (
            <div className="flex items-center gap-1.5">
              <Calendar className="size-4" />
              <span>{formatDate(article.createdAt)}</span>
            </div>
          )}
          
          <Button variant="outline" size="sm" asChild className="ml-auto">
            <Link to={`/${article._id}`} className="flex items-center gap-1.5">
              <Edit className="size-4" />
              <span>Edit</span>
            </Link>
          </Button>
        </div>
      </div>
      
      <div className="prose prose-lg max-w-none">
        {article.content.split("\n").map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
};

export default ArticleDetailPage;
