import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-text font-sidebar">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <h2 className="text-4xl font-title mb-6">Page Not Found</h2>
      <p className="text-lg mb-8">
        Oops! The page you are looking for does not exist. It might have been moved or deleted.
      </p>
      <Link to="/" className="px-6 py-3 bg-button text-head rounded-md hover:bg-secondary transition-all">
        Go Back Home
      </Link>
    </div>
  );
}

export default NotFound;
