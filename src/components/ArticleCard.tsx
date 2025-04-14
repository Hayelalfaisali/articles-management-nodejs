
import React from "react";
import { Link } from "react-router-dom";
import { Calendar, Edit, Trash } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { Article } from "@/types";

interface ArticleCardProps {
  article: Article;
  onDelete: (id: string) => void;
}

const ArticleCard = ({ article, onDelete }: ArticleCardProps) => {
  const { _id, title, content, createdAt } = article;
  
  const truncateContent = (text: string, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };
  
  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold line-clamp-2">
          <Link to={`/article/${_id}`} className="hover:text-primary transition-colors">
            {title}
          </Link>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="py-2 flex-grow">
        <p className="text-muted-foreground line-clamp-3">{truncateContent(content)}</p>
      </CardContent>
      
      <CardFooter className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        {createdAt && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="size-3" />
            <span>{formatDate(createdAt)}</span>
          </div>
        )}
        
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
            <Link to={`/${_id}`}>
              <span className="sr-only">Edit</span>
              <Edit className="size-4" />
            </Link>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
            onClick={() => onDelete(_id)}
          >
            <span className="sr-only">Delete</span>
            <Trash className="size-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ArticleCard;
