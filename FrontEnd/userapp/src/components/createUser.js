import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { adduser } from '../actions/userActions';
import { ToastContainer } from 'react-toastify';
import { showToastMessage } from './toastMessages';
import { useDispatch,useSelector } from 'react-redux';




function CreateUser() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        UserName: "",
        Email: "",
        Address: "",
        PhoneNumber: "",
    });

    const {users} = useSelector((state) => state.userRed);
    var ExistingUser;
    const { UserName, Email, Address, PhoneNumber } = JSON.stringify(user);
    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        debugger;
        if(name==="Email")
        {
             ExistingUser = users.filter((user) => user.Email===value).length>0
            if(ExistingUser)
                showToastMessage("Email already registred, please give another email")  // validating if the useremail already exist if yes then not allowed to register
            else 
              setUser({ ...user, [name]: value })                
       }       
        else
            setUser({ ...user, [name]: value })
        console.log(user);
    }

    const resAddUser = async (e) => {
    e.preventDefault();
        console.log(user);
        debugger;
        try {
            if(!user.UserName && !user.Email)
               showToastMessage("UserName,Email are needed");
            else if(!user.Email)
                showToastMessage("Email")
            else if(!user.UserName)
               showToastMessage("UserName")
            else{
                    if(ExistingUser)
                        showToastMessage("Email already registred, please give another email")  // validating if the useremail already exist if yes then not allowed to register
                    else{
                    let res = await dispatch(adduser(user))
                    debugger;

                    if (res.status === 200) {
                        debugger;
                        showToastMessage("user added")
                        navigate("/Listing")
                    }
                    else {
                        alert(res.response.data.message);
                    }
                }
             }
        }
        catch (err) {
            alert(err.message);
        }
    }
    return (
        <div className='adduser'>
            <Button size="sm"  variant="secondary" className="float-end me-5" onClick={() => navigate('/Listing')}>
                Go Back
            </Button>
            <Card className="text-center mt-5 col-md-6 shadow mx-auto">
                <Card.Title className="display-5 text-dark"> Add User</Card.Title>
                <Card.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextUserName">
                            <Form.Label column sm="5">
                               User Name
                            </Form.Label>
                            <Col sm="7">
                                <Form.Control type="text" placeholder="Username" name="UserName" value={UserName} onChange={handleChange} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="eaddress">
                            <Form.Label column sm="5">
                               Email
                            </Form.Label>
                            <Col sm="7">
                                <Form.Control type="text" placeholder="Email"  name="Email" value={Email} onChange={handleChange} />
                            </Col>
                        </Form.Group>
                       <Form.Group as={Row} className="mb-3" controlId="formPlaintextAddress">
                            <Form.Label column sm="5">
                                  Address
                            </Form.Label>
                            <Col sm="7">
                            <textarea className="form-control" type="text" placeholder="Address" name="Address" value={Address} onChange={handleChange} rows="3"></textarea>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPhoneNumber">
                            <Form.Label column sm="5">
                            PhoneNumber
                            </Form.Label>
                            <Col sm="7">
                                <Form.Control type="number" placeholder="PhoneNumber" name="PhoneNumber" value={PhoneNumber} onChange={handleChange} />
                            </Col>
                        </Form.Group>
                        <Button as="input" variant="secondary" type="button" onClick={resAddUser} value="Register" />
                    </Form>
                </Card.Body>
            </Card>
           <ToastContainer/>
        </div>
    );
}

export default CreateUser;