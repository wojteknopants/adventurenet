import {useState, useEffect} from "react";
import './style/Message.css'
import { useParams, Link, useNavigate } from "react-router-dom/";
import PageTitle from "../../components/PageTitle";
import { FaSearch } from "react-icons/fa";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store";
import {searchUser} from "./chatSlice";
import {isNil} from "../../pages/main/Messages";
import {profilePlaceholder} from "../../assets";

const SearchUsers = () => {

    const dispatch = useDispatch<AppDispatch>();
    const [newSearch, setNewSearch] = useState<string>('')
    const [searchedUsers, setSearchedUsers] = useState<any[]>([])
    const [hasFoundUsers, setHasFoundUsers] = useState(true);

    const navigate = useNavigate()

    const canPerformSearch = (): boolean => {
        return newSearch !== null && newSearch !== undefined && newSearch !== '';
    }

    const performSearch = () => {
        if (!canPerformSearch()) {
            return;
        }
        dispatch(searchUser(newSearch)).then((users) => {
            if (users.payload === undefined) {
                setHasFoundUsers(false);
                return;
            }
            setHasFoundUsers(true);
            setSearchedUsers(users.payload);
        })
    }

    const navigateToNewMessage = (user: any) => {
        navigate('/messages', {state: {user: user}});
    }


    const getUserFullName = (userprofile: any): string | null => {
    if (isNil(userprofile)) {
      return null;
    }
    if (isNil(userprofile.name) || isNil(userprofile.surname)) {
      return String(userprofile.email);
    }
    return userprofile.name + ' ' + userprofile.surname;
  }

    return (
        <>
            <PageTitle title="Find user and write new message" />
            <main className="content">
                    <div className="container p-0">
                    <div className="card">
                        <div className="row g-0">
                        <div className="col-12 col-lg-5 col-xl-3 border-right">
                        <div className="px-4 ">
                            <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 mb-16">
                                <div className="flex flex-col space-y-3 items-center justify-center">
                                    <input
                                        value={newSearch}
                                        onChange={(event) => setNewSearch(event.target.value)}
                                        placeholder="Pass the username"
                                        className="focus:ring-blue-500 focus:border-blue-500 w-full focus:placeholder-gray-400 text-gray-600 placeholder-gray-300 pl-12 rounded-full py-3 border-gray-200"
                                    />
                                    <button disabled={!canPerformSearch()} onClick={() => performSearch()}
                                            className={`flex flex-row items-center justify-center gap-x-3 btn btn-primary btn-lg mr-1 px-3 w-1/2 ${canPerformSearch() ? 'text-black' : 'text-gray-100'}`}><FaSearch /> Search</button>
                                </div>
                            </div>
                        </div>

                            {hasFoundUsers ? searchedUsers?.map((user, index) =>
                                <div
                                    onClick={() => navigateToNewMessage(user)}
                                    key={user.email}
                                    className="list-group-item list-group-item-action border-0 hover:cursor-pointer">

                                    <small><div className="badge bg-success float-right text-white"></div></small>
                                    <div className="d-flex align-items-start">
                                    <img src={user.profile_picture || profilePlaceholder} className="rounded-circle mr-1" alt="1" width={40} height={40}/>
                                    
                                    <div className="flex-grow-1 ml-3">
                                        {getUserFullName(user)}

                                        <div className="small">
                                        <small><i className='fas fa-envelope'> Send Message</i></small>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            ) : <span>We couldn't find user with usernanme {newSearch}</span>}
                            
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