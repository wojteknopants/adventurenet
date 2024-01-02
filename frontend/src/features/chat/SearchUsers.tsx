import {useState, useEffect} from "react";
import './style/Message.css'
// import useAxios from "./utils/useAxios";
import axios from "axios";

// import jwtDecode from "jwt-decode";
// import moment from 'moment';
import { useParams, Link, useHistory } from "react-router-dom/";
// import Swal from "sweetalert2";

const SearchUsers = () => {

    // const axios = useAxios()

    const baseURL = 'http://localhost:8000/api'

    // const baseURL = `${import.meta.env.VITE_REACT_APP_API_URL}/`

    let [newSearch, setNewSearch] = useState({search: ""})
    let [user, setUser] = useState([])

    const username = useParams()
    const history = useHistory()

    // useEffect(() => {
    //     axios.get(baseURL + '/search/' + username.username + '/')
    //     .then((res) => {
    //         setUser(res.data)
    //         console.log(res.data);
    //     })
    //     .catch((error) => {
    //         // Swal.fire({
    //         //     title:"User does not exist",
    //         //     icon:"error",
    //         //     toast:true,
    //         //     timer:2000,
    //         //     position:"middle"
    //         // })
    //         console.log(error);
    //     })
    // }, [history, newSearch.username])

    // const handleSearchChange = (event) => {
    //     setNewSearch({
    //         ...newSearch,
    //         [event.target.name]: event.target.value
    //     })
    // }

    // console.log("newSearch.username:", newSearch.username);

    // const SearchUser = () => {
    //     try {
    //         axios(baseURL + '/search/' + newSearch.username + '/')
    //         .then((res) => {
    //             if (res.status === 404) {
    //                 console.log(res.details);
    //                 // alert("User does not exist")
    //             } else {
    //                 history.push("/search/" + newSearch.username)
    //                 console.log(user);
    //                 setUser(res.data)
    //             }
    //         })
    //         .catch((error) => {
    //             console.log("No users found");
    //         })
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `JWT ${localStorage.getItem("access")}`,
                        Accept: "application/json",
                    },
                };

                const response = await axios.get(
                    `${baseURL}/search/${username.username}/`,
                    config
                );
                setUser(response.data);
                console.log(response.data);
            } catch (error) {
                // Handle error or show a message (e.g., using Swal)
                console.error(error);
            }
        };
      
        fetchUserData();
    }, [history, newSearch.username]);



    const handleSearchChange = (event) => {
        setNewSearch({
            ...newSearch,
            [event.target.name]: event.target.value,
        });
    };


    console.log("newSearch.username:", newSearch.username);


    const SearchUser = async () => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `JWT ${localStorage.getItem("access")}`,
                    Accept: "application/json",
                },
            };

            const res = await axios(
                `${baseURL}/search/${newSearch.username}/`,
                config
            );
            if (res.status === 404) {
                console.log(res.details);
                // alert("User does not exist")
            } else {
                history.push(`/search/${newSearch.username}`);
            }
        } catch (error) {
            console.log('No users found');
        }
    };



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
                                    <img src={user.profile_picture} className="rounded-circle mr-1" alt="1" width={40} height={40}/>
                                    
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