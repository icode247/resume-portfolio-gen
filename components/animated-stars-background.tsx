import React from 'react';

const AnimatedStarsBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className="absolute bg-white rounded-full animate-star"
          style={{
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 5 + 5}s`,
          }}
        />
      ))}
      <style jsx global>{`
        @keyframes star-fall {
          0% {
            transform: translateY(-20px) translateX(0px) scale(0.5);
            opacity: 0.5;
          }
          50% {
            transform: translateY(calc(50vh - 10px)) translateX(10px) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(calc(100vh + 20px)) translateX(20px) scale(0.5);
            opacity: 0;
          }
        }
        .animate-star {
          animation-name: star-fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  );
};

export default AnimatedStarsBackground;
