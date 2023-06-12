import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React, { useState,useEffect } from "react";
import { useNavigate,useParams } from 'react-router-dom';
import { updateuser } from '../actions/userActions';
import { ToastContainer } from 'react-toastify';
import { showToastMessage } from './toastMessages';
import { useDispatch,useSelector } from 'react-redux';




function EditUser() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        UserName: "",
        Email: "",
        Address: "",
        PhoneNumber: "",
    });
    let {id}= useParams();
 
    const {users} = useSelector((state) => state.userRed);
    const  currentUser = users.find((user) => user._id===id);
    debugger;
    const { UserName, Email, Address, PhoneNumber } = user;
 
    useEffect(() =>
   {
    debugger;
    console.log("currentUser " + currentUser)
    if(currentUser)
    {
        setUser({...currentUser})
        console.log(user)
    }
},[currentUser])



    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        debugger;
        setUser({ ...user, [name]: value })
        console.log(user);
    }

    const resEditUser = async (e) => {
    e.preventDefault();
        console.log(user);
        debugger;
        try {
            if(!user.UserName)
            {
               showToastMessage("UserName needed");
            }
            else{
            let res = await dispatch(updateuser(id,user))
            debugger;

            if (res.status === 200) {
                debugger;
                showToastMessage("user edited")
                navigate("/Listing")
            }
            else {
                alert(res.response.data.message);
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
                <Card.Title className="display-5 text-dark"> Edit User</Card.Title>
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
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="5">
                               Email
                            </Form.Label>
                            <Col sm="7">
                                <Form.Control type="text" placeholder="Email" name="Email" readOnly="true" value={Email} onChange={handleChange} />
                            </Col>
                        </Form.Group>
                       <Form.Group as={Row} className="mb-3" controlId="formPlaintextAddress">
                            <Form.Label column sm="5">
                                  Address
                            </Form.Label>
                            <Col sm="7">
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Address" name="Address" value={Address} onChange={handleChange}></textarea>
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
                        <Button as="input" variant="secondary" type="button" onClick={resEditUser} value="Update" />
                    </Form>
                </Card.Body>
            </Card>
           <ToastContainer/>
        </div>
    );
}

export default EditUser;