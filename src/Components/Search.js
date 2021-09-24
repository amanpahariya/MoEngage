import React, {useEffect, useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import {MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem, MDBDropdownLink} from 'mdb-react-ui-kit';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function Search(props) {
    const isLogin = useSelector((state) => state.changeLogin)
    const history = useHistory();
    const [searchBy, setSearchBy] = useState("genres");
    const [search, setSearch] = useState("");

    const [data, setData] = useState(null)

    useEffect(() => {
        if (!isLogin) {
            history.push("/login");
        }

    }, [isLogin])

    const onSubmit = async (e) => {
        e.preventDefault();
        if (search === "") {
            alert("Enter some input to search")
        }
        const temp = await fetch(`https://api.aniapi.com/v1/anime?${search}=${searchBy}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${process.env.REACT_APP_ANI_APIKEY}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        }).then((res) => res.json())
        setData(temp.data.documents);
    }
    return (
        <>
            <section className={"container"}>
                <div className={"search-container"}>
                    <div className={"mx-2"}>
                        <form action="post" onSubmit={(e) => onSubmit(e)}>
                            <div className={"bg-white d-flex search-input px-3"}>
                                <input type={"text"} value={search}
                                       onChange={(e) => setSearch(e.target.value)}
                                       className={"h-100 border-0 bg-transparent outline-none w-100"}/>
                                <button type={"submit"} className={"border-0 bg-transparent"}>
                                    <FontAwesomeIcon icon={faSearch}/>
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className={"mx-2"}>
                        <MDBDropdown>
                            <MDBDropdownToggle></MDBDropdownToggle>
                            <MDBDropdownMenu>
                                <MDBDropdownItem>
                                    <MDBDropdownLink href="#"
                                                     onClick={(e) => setSearchBy("genres")}>Genres</MDBDropdownLink>
                                </MDBDropdownItem>
                                <MDBDropdownItem>
                                    <MDBDropdownLink href="#"
                                                     onClick={(e) => setSearchBy("description")}>Description</MDBDropdownLink>
                                </MDBDropdownItem>
                                <MDBDropdownItem>
                                    <MDBDropdownLink href="#"
                                                     onClick={(e) => setSearchBy("title")}>Title</MDBDropdownLink>
                                </MDBDropdownItem>
                            </MDBDropdownMenu>
                        </MDBDropdown>
                    </div>
                </div>
            </section>
            <section className={"container"}>
                <div className={"d-flex flex-wrap justify-content-center"}>
                    {

                        data && data.map((item) => {
                            return (
                                <div className="card m-2 position-relative" style={{width: "18rem", height: "28rem"}}>
                                    <img src={item.banner_image} className="card-img-top" alt={item.titles.en}
                                         style={{width: "100%", height: "10rem", objectFit: "cover"}}/>
                                    <div className="card-body">
                                        <h5 className="card-title">{item.titles.en}</h5>
                                        <p className={"text-end mb-1"}>Ratings <span
                                            className={"text-success"}>4.5</span>
                                        </p>
                                        <p className={"m-0 text-secondary"}>Genres</p>
                                        <ul className={"d-flex p-0"}>
                                            <li className={"px-1"}>{item.genres[0]}<span>,</span></li>
                                            <li className={"px-1"}>{item.genres[1]}</li>
                                        </ul>
                                        <p className="card-text mb-1">{item.descriptions.en.slice(0, 30) + (item.descriptions.en.length > 30 ? "..." : "")}</p>
                                        {
                                            item.trailer_url ? <a href={item.trailer_url}>Watch trailer</a> : <></>
                                        }
                                       <div className={"position-absolute bottom-0"}>
                                           <div className={"mb-1 d-flex small justify-content-between"}>
                                               <p className={"text-muted pe-1 m-0"}>Season year {item.season_year}</p>
                                               <p className={"text-muted ps-1 m-0"}>Total Episode {item.episodes_count}</p>
                                           </div>
                                           <Link to={`/amine/${item.anilist_id}`}>see more</Link>
                                       </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </section>
        </>
    );
}

export default Search;