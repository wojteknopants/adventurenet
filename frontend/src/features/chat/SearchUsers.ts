import {React, useState, useEffect} from "react";
import './style/Message.css'
import useAxios from "../utils/useAxios";
import jwtDecode from "jwt-decode";
import moment from 'moment';
import { useParams, Link, useHistory } from "react-router-dom/";
import Swal from "sweetalert2";

function SearchUsers() {

    const baseURL = 'http://127.0.0.1:8000/api'

    let [newSearch, setNewSearch] = useState({search: ""})
    let [user, setUser] = useState([])

    const username = useParams()
    const axios = useAxios()
    const history = useHistory()

    useEffect(() => {
        axios.get(baseURL + '/search/' + username.username + '/')
        .then((res) => {
            setUser(res.data)
            console.log(res.data);
        })
        .catch((error) => {
            Swal.fire({
                title:"User does not exist",
                icon:"error",
                toast:true,
                timer:2000,
                position:"middle"
            })
            console.log(error);
        })
    }, [history, newSearch.username])

    const handleSearchChange = (event) => {
        setNewSearch({
            ...newSearch,
            [event.target.name]: event.target.value
        })
    }

    console.log("newSearch.username:", newSearch.username);

    const SearchUser = () => {
        try {
            axios(baseURL + '/search/' + newSearch.username + '/')
            .then((res) => {
                if (res.status === 404) {
                    console.log(res.details);
                    alert("User does not exist")
                } else {
                    history.push("/search/" + newSearch.username)
                    console.log(user);
                    setUser(res.data)
                }
            })
            .catch((error) => {
                console.log("No users found");
            })
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <>
            <main className="content" style={{ marginTop: "150px" }}>
                    <div className="container p-0">
                    <h1 className="h3 mb-3">Messages</h1>
                    <div className="card">
                        <div className="row g-0">
                        <div className="col-12 col-lg-5 col-xl-3 border-right">
                        <div className="px-4 ">
                            <div className="d-flfex align-itemfs-center">
                                <div className="flex-grow-1 d-flex align-items-center mt-2">
                                <input
                                    type="text"
                                    className="form-control my-3"
                                    placeholder="Search..."
                                    onChange={handleSearchChange}
                                    name='username'

                                />
                                <button className='ml-2' onClick={SearchUser} style={{border:"none", borderRadius:"50%"}}><i className='fas fa-search'></i></button>
                                </div>
                            </div>
                        </div>
                            
                            {user.map((user, index) => 
                                <Link 
                                    to={"/inbox/" + user.id}
                                    className="list-group-item list-group-item-action border-0"
                                >

                                    <small><div className="badge bg-success float-right text-white"></div></small>
                                    <div className="d-flex align-items-start">
                                    <img src={user.image} className="rounded-circle mr-1" alt="1" width={40} height={40}/>
                                    
                                    <div className="flex-grow-1 ml-3">
                                        {user.full_name}  

                                        <div className="small">
                                        <small><i className='fas fa-envelope'> Send Message</i></small>
                                        </div>
                                    </div>
                                    </div>
                                </Link>
                            )}
                            
                            <hr className="d-block d-lg-none mt-1 mb-0" />
                        </div>
                        
                        </div>
                    </div>
                    </div>
            </main>
        </>        
    )
}

export default SearchUsers