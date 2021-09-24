import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import {useSelector} from "react-redux";


function Amine() {
    const {id} = useParams();
    const [data, setData] = useState();
    const user = useSelector((state) => state.userDataReduce);

    useEffect(async () => {
        const temp = await fetch(`https://api.aniapi.com/v1/anime?anilist_id=${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${process.env.REACT_APP_ANI_APIKEY}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        }).then((res) => res.json())

        setData(temp.data.documents[0]);
    }, [])
    const saveRating = async (rating) => {
        setRating(rating);
        for (let i = 0; i < 4; i++) {
            document.getElementById(`faStar${i + 1}`).style.color = "gray"
        }
        for (let i = 0; i < rating; i++) {
            document.getElementById(`faStar${i + 1}`).style.color = "yellow"
        }
    }
    return (
        <section className={"amine-container"}>
            {
                data && <>
                    <img className={"banner-img"} src={data.banner_image}/>

                    <div className={"d-flex w-100 flex-wrap justify-content-around align-items-center"}>
                        <div style={{maxWidth: 800}}>
                            <div className={"card m-2 p-3"}>
                                <h3 className={"h3"}>{data.titles.en}</h3>
                                <p className={"m-0"}>Ratings <span className={"text-success"}>4.5</span></p>
                                <div className={"ms-3"}>
                                    <FontAwesomeIcon className={"m-sm-1"} id={"faStar1"} icon={faStar}
                                                     onClick={() => saveRating(1)}
                                                     color={"gray"}
                                    />
                                    <FontAwesomeIcon className={"m-sm-1"} id={"faStar2"} icon={faStar}
                                                     onClick={() => saveRating(2)}
                                                     color={"gray"}
                                    />
                                    <FontAwesomeIcon className={"m-sm-1"} id={"faStar3"} icon={faStar}
                                                     onClick={() => saveRating(3)}
                                                     color={"gray"}
                                    />
                                    <FontAwesomeIcon className={"m-sm-1"} id={"faStar4"} icon={faStar}
                                                     onClick={() => saveRating(4)}
                                                     color={"gray"}
                                    />
                                </div>
                                <p className={"my-2 text-secondary h6"}>Genres</p>
                                <ul className={"d-flex flex-wrap m-0 p-0"}>
                                    {
                                        data.genres.map((it) => <li>{it} &nbsp;</li>)
                                    }
                                </ul>
                                <h6 className={"my-3 text-primary"}>Total Episode <span>{data.episodes_count}</span>
                                </h6>
                            </div>
                            <div className={"card m-2 p-3"}>
                                <h4 className={"fw-bold"}>Description</h4>
                                <p>{data.descriptions.en}</p>
                            </div>
                        </div>

                        <div className={"m-2"}>
                            <img className={"cover-img"} src={data.cover_image}/>
                        </div>
                    </div>
                </>
            }
        </section>
    )
}

export default Amine;