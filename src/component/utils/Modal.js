import React from 'react';

export default ({ show, Close, children, className }) => {
  return (
    <div>
      {show ? <div className="Backdrop" onClick={Close}></div> : null}
      <div
        className={"Modal " + className}
        style={{
          transform: show ? 'rotate(0deg)' : 'rotate(180deg)',
          width: show ? '70%' : '0',
        }}
      >
        {children}
      </div>
      <style>{`
                    .Modal {
                        position: fixed;
                        z-index: 20;
                        transition: all 0.5s ease-out;
                        width: 70%;
                        height: calc(100vh - 110px);
                        margin-top: 100px;
                        top:0;
                    }
                    
                    @media (max-width:416px) {
                        .Modal {
                            left: 2%;
                        }
                    }
                    .Backdrop {
                        width: 100%;
                        height: 100%;
                        position: fixed;
                        z-index: 10;
                        left: 0;
                        top: 0;
                        margin: 1%;      
                    }
                `}</style>
    </div>
  );
};
