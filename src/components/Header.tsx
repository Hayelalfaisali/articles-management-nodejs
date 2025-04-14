
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Book, PlusCircle, List } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <header className="bg-background border-b border-border sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2">
          <Book className="size-6 text-primary" />
          <span className="font-bold text-xl">ArticleVerse</span>
        </Link>
        
        <nav className="flex items-center gap-2">
          <Button
            variant={isActive("/") ? "default" : "ghost"}
            size="sm"
            asChild
          >
            <Link to="/" className="flex items-center gap-2">
              <List className="size-4" />
              <span>Articles</span>
            </Link>
          </Button>
          
          <Button
            variant={isActive("/add") ? "default" : "ghost"}
            size="sm"
            asChild
          >
            <Link to="/add" className="flex items-center gap-2">
              <PlusCircle className="size-4" />
              <span>Add Article</span>
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
