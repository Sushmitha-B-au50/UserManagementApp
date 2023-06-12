
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import React, {  useEffect,useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {loadUsers} from '../actions/userActions';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import {deleteUser} from '../actions/userActions';
import { showToastMessage } from './toastMessages';
import { ToastContainer } from 'react-toastify';





export default function UserListing() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {users} = useSelector((state) => state.userRed);
    useEffect(() =>
    {
      dispatch(loadUsers());
    
    },[]);

    const [searchField, setSearchField] = useState("");
    const [sortStatus, setSortStatus] = useState('');
    const [pg, setpg] = React.useState(0);
    const [rpg, setrpg] = React.useState(5);

    const handleChange = e => {
        setSearchField(e.target.value);

    };
    const handleDelete =(email) =>
    {
    debugger;
        dispatch(deleteUser(email))
        showToastMessage("deleted")
        window.location.reload();    
    }
   
    function handleSort(event) {
        setSortStatus(event.target.value);
      }
    //sorting function
    const handleSortByUserName = (a,b) => {
      const   Users = users.filter(
            user => {
                return (
                   user.UserName.toString().toLowerCase().includes(searchField.toString().toLowerCase())
                );
            }
        );
        filteredUsers = [...Users]
    }
    const handleSortByEmail = (a,b) => {
       const  Users = users.filter(
            user => {
                return (
                   user.UserName.toString().toLowerCase().includes(searchField.toString().toLowerCase())
                );
            }
        );
        filteredUsers = [...Users]
      }
      let filteredUsers = [...users];
      if (sortStatus === "UserName") {
        filteredUsers.sort(handleSortByUserName);
      } else if (sortStatus === "Email") {
        filteredUsers.sort(handleSortByEmail);
      }

    function handleChangePage(event, newpage) {
        setpg(newpage);
    }
  
    function handleChangeRowsPerPage(event) {
        setrpg(parseInt(event.target.value, 10));
        setpg(0);
    }
  
    return (
        <div className='list'>
            <Button className="fs-6 float-end me-5 mb-5"  variant="secondary"  size="sm" onClick={() =>  navigate('/AddUser')}> Create User </Button>
            <Form className="m-5 text-center">              
                <Form.Group as={Row}>          
                    <Col sm="5">
                            <Form.Control
                                type="search"
                                placeholder="Search" onChange={handleChange}
                                aria-label="Search"/>
                    </Col>
                        <Col sm="3">
                        <select className="form-select" value={sortStatus} onChange={handleSort}>
                        <option value="">-- Select an option --</option>
                        <option value="UserName">UserName</option>
                        <option value="Email">Email</option>
                    </select>
                        </Col>
                </Form.Group>
            </Form>
                <div className="m-5">
                <Paper>
                <h1 style={{ textAlign: "center", color: "black" }}>
                    Users
                </h1>
                <TableContainer component={Paper} id="tbl">
                    <Table sx={{ minWidth: 650 }} 
                        aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell className='text-white'>UserName</TableCell>
                                <TableCell className='text-white' align="right">Email
                                </TableCell>
                                <TableCell className='text-white' align="right">Address
                                </TableCell>
                                <TableCell className='text-white' align="right">PhoneNumber
                                </TableCell>
                                <TableCell className='text-white' align="right">Edit
                                </TableCell>
                                <TableCell className='text-white' align="right">Delete
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredUsers.slice(pg * rpg, pg * rpg + rpg).map((row) => (
                                <TableRow
                                    key={row.Email}>
                                    <TableCell component="th" scope="row" className='text-white'>
                                        {row.UserName}
                                    </TableCell>
                                    <TableCell className='text-white' align="right">{row.Email}
                                    </TableCell>
                                    <TableCell className='text-white' align="right">{row.Address}
                                    </TableCell>
                                    <TableCell className='text-white' align="right">{row.PhoneNumber}
                                    </TableCell>
                                    <TableCell className='text-white' align="right">
                                    <Button  style={{ backgroundColor: 'darkgray', border: '0' }}>
                                    <FontAwesomeIcon icon={faPenToSquare} onClick={() => navigate(`/EditUser/${row._id}`)} />
                                </Button>
                                </TableCell>
                                <TableCell className='text-white' align="right">
                                    <Button style={{ backgroundColor: 'darkgray', border: '0' }}>
                                        <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(row.Email)} />
                                    </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination 
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredUsers.length}
                    rowsPerPage={rpg}
                    page={pg}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            </div>
            <ToastContainer/>
        </div>
    );
}

