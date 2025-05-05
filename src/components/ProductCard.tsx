import React, { useState } from "react";
import { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
  onSwipe: (swipeDirection: "left" | "right" | "up", productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onSwipe }) => {
  const productImages = product.imageUrls?.length ? product.imageUrls : [product.imageUrl];
  const [activeImageIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartPosition, setDragStartPosition] = useState({ x: 0, y: 0 });
  const [cardPosition, setCardPosition] = useState({ x: 0, y: 0 });
  const [cardRotation, setCardRotation] = useState(0);

  const startDrag = (startX: number, startY: number) => {
    setIsDragging(true);
    setDragStartPosition({ x: startX, y: startY });
  };

  const moveCard = (currentX: number, currentY: number) => {
    if (!isDragging) return;
    const deltaX = currentX - dragStartPosition.x;
    const deltaY = currentY - dragStartPosition.y;
    setCardPosition({ x: deltaX, y: deltaY });
    setCardRotation(deltaX / 20); // Slight rotation based on horizontal movement
  };

  const endDrag = () => {
    setIsDragging(false);

    if (cardPosition.x > 150) {
      onSwipe("right", String(product.id));
      console.log(`Liked Product ID: ${product.id}`);
    } else if (cardPosition.x < -150) {
      onSwipe("left", String(product.id));
      console.log(`Passed Product ID: ${product.id}`);
    } else if (cardPosition.y < -150) {
      onSwipe("up", String(product.id));
      console.log(`Add to cart Product ID: ${product.id}`);
    }

    // Reset position and rotation
    setCardPosition({ x: 0, y: 0 });
    setCardRotation(0);
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    startDrag(event.clientX, event.clientY);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    moveCard(event.clientX, event.clientY);
  };

  const handleMouseUp = () => {
    endDrag();
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    startDrag(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    moveCard(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = () => {
    endDrag();
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseMove={isDragging ? handleMouseMove : undefined}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={isDragging ? handleTouchMove : undefined}
      onTouchEnd={handleTouchEnd}
      style={{
        transform: `translate(${cardPosition.x}px, ${cardPosition.y}px) rotate(${cardRotation}deg)`,
        transition: isDragging ? "none" : "transform 0.3s ease", // Smooth transition when not dragging
        position: "absolute", // Ensure the card stays within its parent bounds
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
      className="relative w-full max-w-xs sm:max-w-sm h-[500px] rounded-2xl overflow-hidden shadow-xl font-body select-none cursor-pointer"
    >
      {/* Product Image */}
      <img
        src={productImages[activeImageIndex]}
        alt={product.name}
        className="w-full h-full object-cover"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />

      {/* Image Progress Bars */}
      {productImages.length > 1 && (
        <div className="absolute top-2 left-0 right-0 z-30 flex justify-center gap-1 px-4">
          {productImages.map((_, index) => (
            <div
              key={index}
              className={`h-1 flex-1 rounded-full transition-all ${
                index === activeImageIndex ? "bg-white" : "bg-gray-500/50"
              }`}
            />
          ))}
        </div>
      )}

      {/* Info Overlay */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-4">
        <div className="space-y-1">
          <h2 className="text-xl font-heading text-white capitalize leading-tight">
            {product.name}
          </h2>
          <p className="text-sm text-gray-300">{product.brand}</p>
        </div>

        <div className="flex items-center gap-2 mt-2">
          <span className="text-lg font-bold text-primary">₹{product.price}</span>
          {product.discountPercentage > 0 && (
            <>
              <span className="text-sm line-through text-gray-400">
                ₹{product.originalPrice}
              </span>
              <span className="text-sm font-medium text-green-400">
                ({product.discountPercentage}% off)
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
