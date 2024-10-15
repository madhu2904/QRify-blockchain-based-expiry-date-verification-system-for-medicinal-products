
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Web3 from 'web3';
import { QRCodeCanvas } from 'qrcode.react';

import MedicineContract from '../../Medicine.json'; // Update the path to your compiled contract

export const Product = () => {
  const [productName, setProductName] = useState('');
  const [manufacturingDate, setManufacturingDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [formulations, setFormulations] = useState('');
  const navigate = useNavigate();

  const [qrValue, setQrValue] = useState('');

  const generateHash=async(event)=>{
    event.preventDefault();
    const combinedString = productName + manufacturingDate + expiryDate + formulations;

    // Generate the hash using keccak256
    const hash = Web3.utils.keccak256(combinedString);
    setQrValue(hash); // Set the QR code value
    console.log(hash);
  }
  const registerProduct = async (event) => {
    event.preventDefault();

   
    const web3 = new Web3('http://127.0.0.1:7545'); 

    // Get the network ID
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = MedicineContract.networks[networkId];

    // Create a contract instance
    const contract = new web3.eth.Contract(
      MedicineContract.abi,
      deployedNetwork && deployedNetwork.address
    );

    // Get accounts from Ganache
    const accounts = await web3.eth.getAccounts();

    // Call the registerProduct method
    // await contract.methods.registerProduct(productName, manufacturingDate, expiryDate, formulations)
    //   .send({ from: accounts[0] });
    const contractReceipt=await contract.methods.registerProduct(productName, manufacturingDate, expiryDate, formulations)
    .send({ from: accounts[0], gas: 3000000 }); // Set a higher gas limit
    const contractHash = contractReceipt.events.ProductRegistered.returnValues.productHash;

    alert("Product Registered Successfully!");
generateHash(event);
console.log("ProductHash",contractHash);

  };

  // const generateHash=async(event)=>{
  //   event.preventDefault();
  //   const combinedString = productName + manufacturingDate + expiryDate + formulations;

  //   // Generate the hash using keccak256
  //   const hash = Web3.utils.keccak256(combinedString);
  //   setQrValue(hash); // Set the QR code value
  // }

  return (
    <div style={{ backgroundColor: '#3B5998', minHeight: '100vh', padding: '20px' }}>
      <div className="registerCard" style={{ width: '500px', margin: 'auto', marginTop: '50px' }}>
        <div className="modal-content rounded-4 shadow" style={{ backgroundColor: '#F6F6F6' }}>
          <div className="modal-header p-5 pb-4 border-bottom-0">
            <h1 className="fw-bold mb-0 fs-2">REGISTER PRODUCT</h1>
          </div>
          <div className="modal-body p-5 pt-0">
            <form onSubmit={registerProduct}>
              <div className="form-floating mb-3">
                <input 
                  type="text" 
                  className="form-control rounded-3" 
                  id="productName" 
                  placeholder="Name of the Product" 
                  value={productName} 
                  onChange={(e) => setProductName(e.target.value)} 
                />
                <label htmlFor="productName">Name of the Product</label>
              </div>
              <div className="form-floating mb-3">
                <input 
                  type="text" 
                  className="form-control rounded-3" 
                  id="manufacturingDate" 
                  placeholder="Manufacturing Date" 
                  value={manufacturingDate} 
                  onChange={(e) => setManufacturingDate(e.target.value)} 
                />
                <label htmlFor="manufacturingDate">Manufacturing Date (dd-mm-yyyy)</label>
              </div>
              <div className="form-floating mb-3">
                <input 
                  type="text" 
                  className="form-control rounded-3" 
                  id="expiryDate" 
                  placeholder="Expiry Date" 
                  value={expiryDate} 
                  onChange={(e) => setExpiryDate(e.target.value)} 
                />
                <label htmlFor="expiryDate">Expiry Date (dd-mm-yyyy)</label>
              </div>
              <div className="form-floating mb-3">
                <input 
                  type="text" 
                  className="form-control rounded-3" 
                  id="formulations" 
                  placeholder="Formulations" 
                  value={formulations} 
                  onChange={(e) => setFormulations(e.target.value)} 
                />
                <label htmlFor="formulations">Formulations</label>
              </div>
              <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit">Register Product</button>
              {/* <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" onClick={generateHash}>
  Generate QRCode
</button> */}
              <small className="text-body-secondary">By registering your product, you agree to the terms of use.</small>
              <hr className="my-4" />
              <button className="w-100 mb-2 btn btn-lg rounded-3 btn-light" onClick={() => navigate("/")}>Go To Home</button>
            </form>
          </div>
        </div>
      </div>
      {qrValue && (
              <div className="mt-4">
                <h5 className='fw- mb-0 fs-2' style={{color:'white',paddingBottom:10}}>Generated QR Code:</h5>
                <div style={{backgroundColor:"white",height:150 ,width:150,display:'flex',justifyContent:'center',alignItems:'center',margin:'auto'}}>
                <QRCodeCanvas value={qrValue} /> {/* Display the QR code */}
                </div>
              </div>

            )}
    </div>
  );
};
