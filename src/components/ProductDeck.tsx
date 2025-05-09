import React, { useReducer, useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Added Framer Motion
import ProductCard from "./ProductCard";
import { Product } from "../types/product";
import { RefreshCw, Heart, X, Star } from "lucide-react"; // Import icons
import { useAppContext } from "../context/AppContext"; // Import context

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
  const { dispatch } = useAppContext(); // Access dispatch from context
  const [deckState, dispatchDeckAction] = useReducer(productDeckReducer, initialProductDeckState);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | "up" | null>(null);

  const handleProductSwipe = (swipeDirection: "left" | "right" | "up", productId: string) => {
    setSwipeDirection(swipeDirection);

    // Dispatch actions to the global context
    if (swipeDirection === "right") {
      dispatch({ type: "LIKE", productId });
    } else if (swipeDirection === "left") {
      dispatch({ type: "DISLIKE", productId });
    } else if (swipeDirection === "up") {
      dispatch({ type: "ADD_TO_CART", productId });
    }

    dispatchDeckAction({ type: "SWIPE", direction: swipeDirection, productId });
    setTimeout(() => setSwipeDirection(null), 300); // Clear swipe direction after animation
  };

  const resetProductDeck = () => {
    dispatchDeckAction({ type: "RESET" }); // Reset local state
    dispatch({ type: "RESET" }); // Reset global context
  };

  return (
    <div className="relative w-full max-w-sm sm:max-w-md h-full flex flex-col items-center justify-center mx-auto overflow-hidden">
      {/* Swipe Feedback Overlay */}
      <AnimatePresence>
        {swipeDirection && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-50"
          >
            {swipeDirection === "right" && (
              <div className="flex flex-col items-center text-green-500">
                <Heart size={99} />
                <span className="text-2xl font-bold mt-2">Liked</span>
              </div>
            )}
            {swipeDirection === "left" && (
              <div className="flex flex-col items-center text-red-500">
                <X size={99} />
                <span className="text-2xl font-bold mt-2">Disliked</span>
              </div>
            )}
            {swipeDirection === "up" && (
              <div className="flex flex-col items-center text-blue-500">
                <Star size={99} />
                <span className="text-2xl font-bold mt-2">Added to Cart</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

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
