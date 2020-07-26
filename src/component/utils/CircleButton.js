import React from 'react';
import { RiUserHeartLine } from 'react-icons/ri';

export default ({ clicked }) => {
  return (
    <div className="p1" onClick={clicked}>
      <div className="p5">
        <div className="p2">
          <div className="p3">
            <div className="p4">
              <RiUserHeartLine className="icon" />
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
          width: 160px;
          height: 160px;
          background-color: rgba(236, 232, 232, 1);
          box-shadow: inset 2px 2px 3px rgb(153, 153, 153),
                      2px 2px 3px rgb(153, 153, 153);
          margin: 20px auto;
      }
      
      .p2 {
          width: 120px;
          height: 120px;
          background-color: rgba(238, 238, 238,0.9);
      }
      
      .p3 {
          width: 80px;
          height: 80px;
          background-color: rgba(251, 236, 236,0.7);
      }
      
      .p4 {
          width: 40px;
          height: 40px;
          justify-items: center;
          align-items: center;
          background-color: rgba(247, 225, 225,0.7);
      }
      
      .icon {
          font-size: 2rem;
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
      
      .icon:hover {
         color: rgb(255, 255, 255);
      }
      
      .icon:active {
          color: rgb(255, 255, 255);
      }
      
      `}</style>
    </div>
  );
};
