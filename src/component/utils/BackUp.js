import React from 'react';

export default ({ children }) => {
  let squares = [];

  for (let i = 0; i < 20; i++) {
    squares.push(i);
  }

  const generateRandomNum = ({ min, max }) =>
    Math.floor(Math.random() * (max - min + 1) + min);

  return (
    <div className="intro">
      <div>
        <ul className="squares">
          {squares.map((el, i) => {
            const randomDimensions = Math.floor(
              Math.random() * (150 - 15 + 1) + 15
            );

            return (
              <li
                key={i}
                style={{
                  left: `${generateRandomNum({ min: 0, max: 90 })}%`,
                  width: randomDimensions,
                  height: randomDimensions - 20,
                  animationDelay: `${
                    i % 2 ? generateRandomNum({ min: 0, max: 20 }) : 0
                  }s`,
                  animationDuration: `${generateRandomNum({
                    min: 10,
                    max: 50,
                  })}s`,
                }}
              />
            );
          })}
        </ul>
        {children}
      </div>
      <style>{`
        .intro {
          position: relative;
          height: 100vh;
          width: 100%;
          text-align: center;
          text-shadow: 1px 1px;
          color: #fff;
          overflow: hidden;
        }
        
        @media (min-width: 512px) {
          .info {height: 55vh;}
        }
        
        .squares-wrapper {
          background: rgba(78,84,200,0.5);
          width: 100%;
          height: 40%;
          border-radius: 25px 25px 50% 50%;
        }
        
        .squares {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          margin: 0;
          padding: 0;
        }
        
        li{
          position: absolute;
          display: block;
          list-style: none;
          width: 10px;
          height: 30px;
          background: rgba(255, 255, 255, 0.2);
          animation: animate 25s linear infinite;
          bottom: -150px;            
          border-radius: 50%;
        }
        
        @keyframes animate {
          0% {
            transform: translateY(-1000px) rotate(0deg);
            opacity: 1;
        
          }
        
          100% {
            transform: translateY(1000px) rotate(1440deg);
            opacity: 0;
            }
        }
        `}</style>
    </div>
  );
};
