# Shoppin Store

Shoppin Store is a React-based web application that provides an interactive product browsing experience. Users can swipe through products, like them, pass on them, or add them to their cart. The application is designed with a modern UI and supports drag-and-swipe gestures for an engaging user experience.

## Features

- **Interactive Product Deck**: Swipe left, right, or up to interact with products.
- **Drag-and-Swipe Gestures**: Intuitive drag gestures for product interaction.
- **Dynamic Product Cards**: Displays product details, images, and discounts.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Native Platform Support**: Leverages CapacitorJS to enable deployment on iOS and Android.

## Technologies Used

- **React**: Frontend library for building user interfaces.
- **TypeScript**: For type safety and better developer experience.
- **Tailwind CSS**: For styling and responsive design.
- **Lucide Icons**: For modern and customizable icons.
- **CapacitorJS**: For building native mobile applications using web technologies.

## Folder Structure

```
shoppin-store/
├── src/
│   ├── components/
│   │   ├── ProductDeck.tsx   # Handles the product deck and swipe logic
│   │   ├── ProductCard.tsx   # Displays individual product details
│   ├── types/
│   │   ├── product.ts        # Type definitions for products
├── public/
├── README.md                 # Project documentation
```

## Setup Instructions

Follow these steps to set up the project locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/shoppin-store.git
   cd shoppin-store
   ```

2. **Install Dependencies**:
   Ensure you have Node.js and npm installed. Then, run:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   npm start
   ```
   The application will be available at `http://localhost:3000`.

4. **Build for Production**:
   To create a production build, run:
   ```bash
   npm run build
   ```

## Usage

- **Swipe Left**: Pass on a product.
- **Swipe Right**: Like a product.
- **Swipe Up**: Add a product to the cart.
- **Reset Deck**: Use the reset button to restart the product deck.

## Components

### ProductDeck
- Manages the stack of product cards.
- Handles swipe actions and deck reset functionality.

### ProductCard
- Displays individual product details such as name, brand, price, and discount.
- Supports drag-and-swipe gestures for interaction.

## Customization

- **Styling**: Modify styles in `tailwind.config.js` or directly in the components.
- **Icons**: Replace or customize icons using the `lucide-react` library.
- **Product Data**: Update the product data structure in `src/types/product.ts`.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push the branch.
4. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [CapacitorJS](https://capacitorjs.com/)

Feel free to reach out if you have any questions or suggestions!
