import {React}  from 'react';
import Image from 'react-bootstrap/Image';
import '../App.css';
import Card from 'react-bootstrap/Card';
import { useSelector } from 'react-redux';
import userIcon from '../Images/usersIcon.png';



export default function Home() {
    const {users} = useSelector((state) => state.userRed);
    return (
        <div className='home'>
              <Card id = "dashboard" className="text-white text-center mt-5 col-md-6 shadow mx-auto border border-dark">
                    <h3 className="display-5 text-center">DashBoard</h3> 
                    <Card.Body className='fs-5'>
                        User Management System allows to Create, Edit, Delete Users 
                    </Card.Body>
                    <Card.Body className='fs-5'>
                    <Image src={userIcon}  height={70} width={75} className='me-3'/>
                    Total No of Users Registered:
                    {(users[0] && users.length > 0) ?
                                        (<p className="font-weight-bold text-danger">{users.length}</p>) : <p className="font-weight-bold text-danger">0</p>}
                    
                    </Card.Body>
              </Card>
        </div>
    );
}

