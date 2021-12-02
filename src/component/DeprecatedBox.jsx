import React from "react";

class DeprecatedBox extends React.Component{
  render(){
    return (
      <div id="browserAlert" className="lg:hidden">
      <div className="py-20 px-20 mx-auto my-10 max-w-lg text-center bg-gray-100">
        Please use your desktop, this apps only support desktop hardware...
      </div>
    </div>
    );
  };
}

export default DeprecatedBox;