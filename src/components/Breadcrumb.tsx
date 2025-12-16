import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className = '' }) => {
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    ...items
  ];

  return (
    <nav 
      className={`flex items-center space-x-2 text-sm text-muted-foreground ${className}`}
      aria-label="Breadcrumb navigation"
    >
      <ol className="flex items-center space-x-2">
        {breadcrumbItems.map((item, index) => (
          <li key={item.url} className="flex items-center">
            {index === 0 ? (
              <Link
                to={item.url}
                className="flex items-center hover:text-primary transition-colors"
                aria-label="Navigate to home page"
              >
                <Home className="w-4 h-4" />
                <span className="sr-only">Home</span>
              </Link>
            ) : (
              <>
                <ChevronRight className="w-4 h-4 mx-2 text-muted-foreground/50" />
                {index === breadcrumbItems.length - 1 ? (
                  <span className="text-foreground font-medium" aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <Link
                    to={item.url}
                    className="hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                )}
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
