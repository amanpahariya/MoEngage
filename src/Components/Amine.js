import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-regular-svg-icons";
import {useSelector} from "react-redux";
import axios from "axios";


function Amine() {
    const isLogin = useSelector((state) => state.changeLogin)
    const history = useHistory();
    const {id} = useParams();
    const [data, setData] = useState();
    const user = useSelector((state) => state.userDataReduce);
    const [rating, setRating] = useState(0);
    const [totalRating, setTotalRating] = useState(0);
    const [userRating, setUserRating] = useState(0);

    useEffect(() => {
        if (!isLogin) {
            history.push("/login");
        }

    }, [isLogin, history])

    useEffect(() => {
        async function temp() {
            await fetch(`https://api.aniapi.com/v1/anime?anilist_id=${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${process.env.REACT_APP_ANI_APIKEY}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            }).then((res) => res.json())
                .then((res) => setData(res.data.documents[0]))
        }

        temp();
        if (user !== 0) {
            getRatings();
        }
    }, [user, id])


    const myRating = (rating) => {
        for (let i = 0; i < 4; i++) {
            document.getElementById(`faStar${i + 1}`).style.color = "gray"
        }
        for (let i = 0; i < rating; i++) {
            document.getElementById(`faStar${i + 1}`).style.color = "yellow"
        }
    }

    const saveRating = async (rating) => {
        myRating(rating);
        await axios({
            method: 'post',
            url: `${process.env.REACT_APP_PROXY}/add-ratings`,
            credentials: 'include',
            withCredentials: true,
            data: {
                "anime_id": id,
                "user": user,
                "rate": rating
            }
        });
        await getRatings();
    }

    const getRatings = async () => {
        await axios({
            method: 'get',
            url: `${process.env.REACT_APP_PROXY}/get-ratings?anime_id=${id}&user_id=${user}`,
            credentials: 'include',
            withCredentials: true,
        })
            .then(async (res) => {
                setTotalRating(res.data.total_user);
                setRating(parseFloat(res.data.rating));
                if (res.data.user_rate !== undefined) {
                    setUserRating(res.data.user_rate)
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <section className={"amine-container"}>
            {
                data && <>
                    <img className={"banner-img"} src={data.banner_image} alt={"banner"}/>

                    <div className={"d-flex w-100 flex-wrap justify-content-around align-items-center"}>
                        <div style={{maxWidth: 800}}>
                            <div className={"card m-2 p-3"}>
                                <h3 className={"h3"}>{data.titles.en}</h3>
                                <p className={"m-0"}>Ratings <span className={"text-success"}>{rating}</span>
                                    <span className={"text-muted"}>({totalRating})</span></p>

                                <div className={"ms-3"}>
                                    <FontAwesomeIcon className={"m-sm-1"} id={"faStar1"} icon={faStar}
                                                     onClick={() => saveRating(1)}
                                                     color={userRating >= 1 ? "yellow" : "gray"}
                                    />
                                    <FontAwesomeIcon className={"m-sm-1"} id={"faStar2"} icon={faStar}
                                                     onClick={() => saveRating(2)}
                                                     color={userRating >= 2 ? "yellow" : "gray"}
                                    />
                                    <FontAwesomeIcon className={"m-sm-1"} id={"faStar3"} icon={faStar}
                                                     onClick={() => saveRating(3)}
                                                     color={userRating >= 3 ? "yellow" : "gray"}
                                    />
                                    <FontAwesomeIcon className={"m-sm-1"} id={"faStar4"} icon={faStar}
                                                     onClick={() => saveRating(4)}
                                                     color={userRating === 4 ? "yellow" : "gray"}
                                    />
                                </div>
                                <p className={"my-2 text-secondary h6"}>Genres</p>
                                <ul className={"d-flex flex-wrap m-0 p-0"}>
                                    {
                                        data.genres.map((it, i) => <li key={i}>{it} &nbsp;</li>)
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
                            <img className={"cover-img"} src={data.cover_image} alt={"cover"}/>
                        </div>
                    </div>
                </>
            }
        </section>
    )
}

export default Amine;