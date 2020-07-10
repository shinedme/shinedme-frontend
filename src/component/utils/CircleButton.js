import React from 'react';

export default () => {
  return (
    <div className="p1">
      <div className="p5">
        <div className="p2">
          <div className="p3">
            <div className="p4">
              <i className="fas fa-user-alt"></i>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .p1, .p2, .p3, .p4 {
          border-radius: 50%;
          border: 2px solid rgb(238, 238, 238);
          display: grid;
          justify-self: center;
          align-self: center;
          cursor: pointer;
      }
      
      .p5 {
          display: grid;
      }
      
      .p1 {
          width: 32vh;
          height: 32vh;
          background-color: rgba(236, 232, 232, 1);
          box-shadow: inset 2px 2px 3px rgb(153, 153, 153),
                      2px 2px 3px rgb(153, 153, 153);
      }
      
      .p2 {
          width: 26vh;
          height: 26vh;
          background-color: rgba(238, 238, 238,0.9);
      }
      
      .p3 {
          width: 22vh;
          height: 22vh;
          background-color: rgba(251, 236, 236,0.7);
      }
      
      .p4 {
          width: 16vh;
          height: 16vh;
          justify-items: center;
          align-items: center;
          background-color: rgba(247, 225, 225,0.7);
      }
      
      i {
          font-size: 4em;
          color: rgba(224, 213, 213,0.7);
      }
      
      .p1:active {
          box-shadow: inset -2px -2px 3px rgba(255, 255, 255, .6),
                      inset 2px 2px 3px rgba(0, 0, 0, .6);
      }
      
      .p2:active {
          box-shadow: inset -2px -2px 3px rgba(255, 255, 255, .6),
                      inset 2px 2px 3px rgba(0, 0, 0, .6);
      }
      
      .p3:active {
          box-shadow: inset -2px -2px 3px rgba(255, 255, 255, .6),
                      inset 2px 2px 3px rgba(0, 0, 0, .6);
      }
      
      .p4:active {
          box-shadow: inset -2px -2px 3px rgba(255, 255, 255, .6),
                      inset 2px 2px 3px rgba(0, 0, 0, .6);
      }
      
      i:hover {
         color: rgb(255, 255, 255);
      }
      
      i:active {
          color: rgb(255, 255, 255);
      }
      `}</style>
    </div>
  );
};
