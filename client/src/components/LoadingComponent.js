import React from 'react';

class LoadingComponent extends React.Component{
    render(){
        const divStyle = {
            position: "fixed",
            top: "50%",
            left: "50%",            
            color:"darkred"
          }
        return( 
            <div style={divStyle}>
            <div className="preloader-wrapper big active">
                <div className="spinner-layer spinner-blue-only">
                  <div className="circle-clipper left">
                    <div className="circle"></div>
                  </div><div className="gap-patch">
                    <div className="circle"></div>
                  </div><div className="circle-clipper right">
                    <div className="circle"></div>
                  </div>
                </div>
            </div>            
            </div>
        );
    }
}

export default LoadingComponent;
