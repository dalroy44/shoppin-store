import { products } from "./data/mock-data";
import { registerCapacitorListeners } from "./capacitor/listeners";
import ProductDeck from "./components/ProductDeck";

registerCapacitorListeners();

function App() {
  return (
    <main className="h-dvh bg-surface-base dark:bg-black text-text-dark dark:text-text-light p-4 flex justify-center items-center">
      <ProductDeck products={products} /> {/* Use ProductDeck */}
    </main>
  );
}

export default App;
