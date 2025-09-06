import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { ShoppingCart, Heart } from 'lucide-react';
import { Button } from '../ui/Button';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (user && user.id !== product.seller_id) {
      addToCart(product);
    }
  };

  const isOwnProduct = user?.id === product.seller_id;

  return (
    <div className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full border border-gray-100">
      <Link to={`/product/${product.id}`} className="flex flex-col h-full">
        <div className="aspect-w-4 aspect-h-3 relative">
          <img
            src={product.image_url || `https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=400`}
            alt={product.title}
            className="w-full h-52 object-cover"
          />
          <div className="absolute top-2 left-2">
            <span className="text-xs bg-primary-500 bg-opacity-90 text-white px-2 py-0.5 rounded-full shadow-sm">
              {product.category}
            </span>
          </div>
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
              {product.title}
            </h3>
            <button className="text-gray-400 hover:text-red-500 transition-colors ml-2 flex-shrink-0">
              <Heart className="w-5 h-5" />
            </button>
          </div>

          <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">
            {product.description}
          </p>

          <div className="mt-auto space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-primary-700">
                ${product.price.toFixed(2)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                by {product.seller?.username || 'Unknown'}
              </p>
              {user && !isOwnProduct && (
                <Button
                  size="sm"
                  onClick={handleAddToCart}
                  className="flex items-center space-x-1"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};