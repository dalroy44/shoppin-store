import { products } from "./data/mock-data";
import { registerCapacitorListeners } from "./capacitor/listeners";
import ProductDeck from "./components/ProductDeck";
import { Sun, Moon, Star, Heart, X } from "lucide-react"; // Import icons
import { useState } from "react";
import { AppProvider, useAppContext } from "./context/AppContext"; // Import context

registerCapacitorListeners();

function AppContent() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { state } = useAppContext(); // Access state from context

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", !isDarkMode);

    // Update theme-color meta tag
    const themeColorMetaTag = document.querySelector('meta[name="theme-color"]');
    if (themeColorMetaTag) {
      themeColorMetaTag.setAttribute("content", "#ff444f");
    }
  };

  return (
    <div className={`h-lvh flex ${isDarkMode ? "dark" : ""}`}>
      {/* Header */}
      <header className="fixed top-0 w-full flex justify-between items-center p-4 bg-white dark:bg-gray-800 z-10">
        <h2 className="text-xl font-bold">Shoppin</h2>
        <button
          onClick={handleThemeToggle}
          className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full shadow-md hover:shadow-lg transition"
        >
          {isDarkMode ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} className="text-gray-500" />}
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden bg-surface-base dark:bg-black text-text-dark dark:text-text-light flex justify-center items-center mt-[64px] mb-[64px]">
        <ProductDeck products={products} /> {/* Use ProductDeck */}
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 w-full bg-white dark:bg-gray-800 shadow-md p-4 flex justify-around items-center z-10">
        <div className="relative flex flex-col items-center">
          <Star size={24} className="text-blue-500" />
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium text-blue-500">Cart</span>
            {state.cartProducts.size > 0 && (
              <span className="text-xs font-bold text-white bg-red-500 rounded-full px-2 py-0.5">
                {state.cartProducts.size}
              </span>
            )}
          </div>
        </div>
        <div className="relative flex flex-col items-center">
          <Heart size={24} className="text-green-500" />
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium text-green-500">Liked</span>
            {state.likedProducts.size > 0 && (
              <span className="text-xs font-bold text-white bg-red-500 rounded-full px-2 py-0.5">
                {state.likedProducts.size}
              </span>
            )}
          </div>
        </div>
        <div className="relative flex flex-col items-center">
          <X size={24} className="text-red-500" />
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium text-red-500">Disliked</span>
            {state.dislikedProducts.size > 0 && (
              <span className="text-xs font-bold text-white bg-red-500 rounded-full px-2 py-0.5">
                {state.dislikedProducts.size}
              </span>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
