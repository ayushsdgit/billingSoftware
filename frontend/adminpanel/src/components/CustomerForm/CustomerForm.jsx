import React from 'react'


const CustomerForm = ({ customerName, setCustomerName, mobileNumber, setMobileNumber }) => {
  return (
    <div className='p-3'>
      <div className="mb-3">
        <label htmlFor="customerName" className="col-4">Customer Name</label>
        <input type="text" className="form-control form-control-sm" id="customerName" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
      </div>

      <div className="mb-3">
        <label htmlFor="mobileNumber" className="col-4">Mobile Number</label>
        <input type="text" className="form-control form-control-sm" id="mobileNumber" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
      </div>
    </div>
  )
}

export default CustomerForm
