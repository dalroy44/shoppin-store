import React, { useReducer } from "react";
import ProductCard from "./ProductCard";
import { Product } from "../types/product";
import { ThumbsDown, ThumbsUp, ShoppingCart, RefreshCw, Heart, X, Star } from "lucide-react"; // Import icons

interface ProductDeckProps {
  products: Product[];
}

type ProductDeckAction =
  | { type: "SWIPE"; direction: "left" | "right" | "up"; productId: string }
  | { type: "RESET" };

interface ProductDeckState {
  activeProductIndex: number;
}

const initialProductDeckState: ProductDeckState = {
  activeProductIndex: 0,
};

const productDeckReducer = (state: ProductDeckState, action: ProductDeckAction): ProductDeckState => {
  switch (action.type) {
    case "SWIPE":
      console.log(`Swiped ${action.direction} on Product ID: ${action.productId}`);
      return { ...state, activeProductIndex: state.activeProductIndex + 1 };
    case "RESET":
      return initialProductDeckState;
    default:
      return state;
  }
};

const ProductDeck: React.FC<ProductDeckProps> = ({ products }) => {
  const [deckState, dispatchDeckAction] = useReducer(productDeckReducer, initialProductDeckState);

  const handleProductSwipe = (swipeDirection: "left" | "right" | "up", productId: string) => {
    dispatchDeckAction({ type: "SWIPE", direction: swipeDirection, productId });
  };

  const resetProductDeck = () => {
    dispatchDeckAction({ type: "RESET" });
  };

  return (
    <div className="relative w-full max-w-xs sm:max-w-sm h-[600px] flex flex-col items-center">
      {/* Card Stack */}
      <div className="relative w-full h-[500px]">
        {products
          .slice(deckState.activeProductIndex, deckState.activeProductIndex + 3) // Show up to 3 cards for stacking effect
          .map((product, cardPosition) => (
            <div
              key={product.id}
              className={`absolute inset-0 transition-transform duration-300 ${
                cardPosition === 0 ? "z-30" : cardPosition === 1 ? "z-20 scale-95" : "z-10 scale-90"
              }`}
            >
              <ProductCard product={product} onSwipe={handleProductSwipe} />
            </div>
          ))}
      </div>

      {/* Action Buttons */}
      <div className="z-40 mt-4 flex gap-4">
        <button
          onClick={() =>
            handleProductSwipe("left", String(products[deckState.activeProductIndex]?.id || ""))
          }
          className="p-3 bg-white dark:bg-gray-800 text-red-500 dark:text-red-400 rounded-full shadow-md hover:shadow-lg transition"
        >
          <X size={24} />
        </button>
        <button
          onClick={() =>
            handleProductSwipe("up", String(products[deckState.activeProductIndex]?.id || ""))
          }
          className="p-3 bg-white dark:bg-gray-800 text-blue-500 dark:text-blue-400 rounded-full shadow-md hover:shadow-lg transition"
        >
          <Star size={24} />
        </button>
        <button
          onClick={() =>
            handleProductSwipe("right", String(products[deckState.activeProductIndex]?.id || ""))
          }
          className="p-3 bg-white dark:bg-gray-800 text-green-500 dark:text-green-400 rounded-full shadow-md hover:shadow-lg transition"
        >
          <Heart size={24} />
        </button>
        <button
          onClick={resetProductDeck}
          className="p-3 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-full shadow-md hover:shadow-lg transition"
        >
          <RefreshCw size={24} />
        </button>
      </div>
    </div>
  );
};

export default ProductDeck;
