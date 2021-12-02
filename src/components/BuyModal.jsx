import React from "react";

class BuyModal extends React.Component{
  render(){
    return (
      <div id="buy-modal" className="modal">
        <div className="modal-box">
          <div className="form-control">
            <input
              type="number"
              placeholder="quantity"
              className="input input-lg input-bordered"
            />
          </div>
          <div className="modal-action">
              <a href="/components/modal#" className="btn btn-outline">Buy</a>
              <a href="/components/modal#" className="btn btn-outline"
                >Cancel</a
              >
          </div>
        </div>
      </div>
    )
  }
}

export default BuyModal;