
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Main = () => {
  let Navigate = useNavigate();
  
  return (
    <div className='bg'>
      <h1 className="rosarivo-regular" style={{fontSize: '60px',marginTop:'30px',color:'white'}}>Welcome to QRify</h1>
      <p style={{fontSize:'20px',fontFamily:'serif' ,color:'white'}}>Verify the medicinal product with ease</p>

      <div className="d-flex justify-content-around flex-wrap customCard ">
        {/* Pharmacist Card */}
        <Card style={{ width: "500px", height: "300px",backgroundColor:'#F6F6F6' }} className="mb-3 ">
          <Card.Body >

            <Card.Title style={{marginTop:'10px', fontSize:'30px'}} >PHARMACIST</Card.Title>
            <div className="d-flex flex-column justify-content-center" style={{marginTop:'30px'}} >
            <Card.Text style={{fontFamily:'serif', fontSize:'20px'}}>
              Hello! Are you a manufacturer of medicinal products and want to register?
              <br/> 
              <br/> 
              Click here to login or sign up.
            </Card.Text>
            <div className="d-flex justify-content-between mt-3">
              <Button
                className="btn btn-primary"
                onClick={() => { Navigate("/login") }}
                style={{ width: "200px" }}
              >
                Login
              </Button>
              <Button
                className="btn btn-secondary"
                onClick={() => { Navigate("/register") }}
                style={{ width: "200px" }}
              >
                Sign-up
              </Button>
            </div>
            </div>
          </Card.Body>
        </Card>

        {/* Customer Card */}
        <Card style={{ width: "500px", height: "300px", backgroundColor:'#F6F6F6'}} className="mb-3">
          <Card.Body>
            <Card.Title style={{fontSize:'30px'}}>CUSTOMER</Card.Title>
            <div className="d-flex flex-column justify-content-center align-items-center" style={{marginTop:'50px'}} >

            <Card.Text style={{fontFamily:'serif', fontSize:'20px'}}>
              Hello! Are you a customer wanting to verify the expiry date of your product?
              <br/> 
              <br/>
              Click here to Scan  the QRcode
              <br/>
              
            </Card.Text>
            {/* <div className="d-flex justify-content-between mt-3"> */}
              <Button
                className="btn btn-primary"
                onClick={() => { Navigate("/scan") }}
                style={{ width: "200px" }}
              >
                Scan QR
              </Button>
              
            {/* </div> */}
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};
