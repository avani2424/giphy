import React from "react";

function FormInput({ handleChange, formInputData, handleSubmit, handleClose }) {
  return (
    <div className="form-row row">
      <div className="container">
        <div className="head">Receipt Details</div>
        <div className="col">
          <label>Date</label>
          <span>
            <input
              type="date"
              onChange={handleChange}
              value={formInputData.date}
              name="date"
              className="form-control"
              placeholder="Date"
            />
          </span>
          <div className="col">
            <label>Amount</label>
            <span>
              <input
                type="text"
                onChange={handleChange}
                value={formInputData.amount}
                name="amount"
                className="form-control"
                placeholder="Amount"
              />
            </span>
          </div>
          <div className="col">
            <label>PaymentMode</label>
            <span>
              <select
                type="paymentMode"
                onChange={handleChange}
                value={formInputData.paymentMode}
                name="paymentMode"
                className="form-control"
                placeholder="Payment Mode"
              />
            </span>
          </div>
          <div className="col">
            <label>Remark</label>
            <span>
              <input
                type="text"
                onChange={handleChange}
                value={formInputData.remark}
                name="remark"
                className="form-control"
                placeholder="Remark"
              />
            </span>
          </div>
          <div className="col-btn">
            <input
              type="submit"
              name="submit"
              onClick={handleSubmit}
              className=" btn btn-success btn-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormInput;
