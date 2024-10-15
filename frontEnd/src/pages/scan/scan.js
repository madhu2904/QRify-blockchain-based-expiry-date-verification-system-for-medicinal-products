import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import Web3 from 'web3';
import MedicineContract from '../../Medicine.json';



export const Scan = () => {
  
  const [scanResult, setScanResult] = useState(null);
  const [scanner, setScanner] = useState(null);

  //usestates for medicine details
const[contract,setContract]=useState(null);
  const [productName, setProductName] = useState('');
  const [manufacturingDate, setManufacturingDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [formulations, setFormulations] = useState('');
  const [hashString ,setHash]=useState(null);
  const nav = useNavigate();
  useEffect(() => {
    // Initialize the QR code scanner
    const qrScanner = new Html5QrcodeScanner('reader', {
      qrbox: {
        height: 300,
        width: 300,
      },
      fps: 5,
    });

    // Start scanning when component mounts
    qrScanner.render(
      (result) => {
        setScanResult(result);
        qrScanner.clear(); // Clear only after result is set
                  },
      (err) => {
        console.error("QR Scan Error:", err);
               }
    );

    // Store the scanner instance in the state
    setScanner(qrScanner);

    // Cleanup the scanner on unmount
    return () => {
      qrScanner.clear();
    };
  }, []);

  useEffect(()=>{
    const initialize =async ()=>{
    const web3= new Web3('http://127.0.0.1:7545');
    const networkId = await web3.eth.net.getId();
    const deployedNetwork=MedicineContract.networks[networkId];
    const contractInstance = new web3.eth.Contract(
      MedicineContract.abi,
      deployedNetwork && deployedNetwork.address);
setContract(contractInstance);

    };
    initialize();
  }
,[]);


  function toBytes32(hexString) {
    // Ensure the string is 66 characters long (0x + 64 hex chars)
    if (hexString.length !== 66) {
        throw new Error("Invalid hexadecimal string length for bytes32");
    }
    return hexString; // Directly return the hex string
}
let bytes32Value;
// Example usage
//  const qrCodeString = "0x41ad52d56527228c6d779b8ab21971cb491ef12e5c6fa4dc79a91a77727d1465"; // String from QR code

//  bytes32Value =scanResult ? toBytes32(scanResult) : null;

// console.log("Bytes32:", bytes32Value);

const getProductDetails=async()=>
{
  if(!scanResult || !contract ) return;
  const bytes32Value= toBytes32(scanResult);
  console.log("Bytes32:", bytes32Value);

  try {
    const productDetails = await contract.methods.getProduct(bytes32Value).call(); // Replace with your contract method name
    setProductName(productDetails[0]);
    setManufacturingDate(productDetails[1]);
    setExpiryDate(productDetails[2]);
    setFormulations(productDetails[3]);
  } catch (error) {
    console.error("Error retrieving product details:", error);
  };
};

useEffect(()=>{
  getProductDetails();
},[scanResult,contract]);
  
  return (
    <div style={{display:'flex',flexDirection:'column',justifyContent: 'center',alignItems:'center',gap:20,height: '100vh',backgroundColor:'#3B5998'}}>
      <Card style={{ width: '500px', height: '500px',backgroundColor:'#F6F6F6'}}>
        <div style={{borderStyle:'solid',height:450,width:450,borderColor:'black',margin:'auto'}}>
        {scanResult ? <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
          <h7  style={{fontSize:'30px',paddingTop:20,color:'#3B5998'}}>Product Name</h7>
          <h7 style={{fontSize:25}}>{productName}</h7>
          <h7 style={{fontSize:'30px',paddingTop:20,color:'#3B5998'}}>Manufacturing Date</h7>
          <h7 style={{fontSize:25}}>{manufacturingDate}</h7>
          <h7 style={{fontSize:'30px',paddingTop:20,color:'#3B5998'}}>Expiry Date</h7>
          <h7 style={{fontSize:25}}>{expiryDate}</h7>
          <h7 style={{fontSize:'30px',paddingTop:20,color:'#3B5998'}}>Formulations</h7>
          <h7 style={{fontSize:25}}>{formulations}</h7>




        </div> : <div style={{display:'flex',alignItems:'center',flexDirection:'column',justifyContent:'center'}} id="reader"></div>}
        </div>
      </Card>
      <button className="w-25 mb-2 btn btn-lg rounded-3 btn-light" onClick={() => nav("/")}>Go To Home</button>
    </div>
  );
};

