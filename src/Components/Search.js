import React, {useEffect} from 'react';
import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";

function Search(props) {
    const isLogin = useSelector((state) => state.changeLogin)
    const history = useHistory();

    useEffect(() => {
        if (!isLogin) {
            history.push("/login");
        }

    }, [isLogin])

    return (
        <section>
            hello world
        </section>
    );
}

export default Search;