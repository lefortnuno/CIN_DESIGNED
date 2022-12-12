import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Protected(props) {
    const Cmp = props.Cmp
    const navigate = useNavigate();
    const usrInfo = localStorage.getItem("usreInfo");
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token) {
            localStorage.clear();
            navigate("/");
        }
    }, []);
    return (
        <>
            <Cmp />
        </>
    );
}