import React, { useEffect, useState } from 'react'
import "../index.css"
import "./ListingsPage.css"
import ListItem from './ListItem'
import ListingsService from '../Services/listingsService'
import swal from 'sweetalert'
import { BackdropLoader } from "../ShareComponents/loader";
import { useHistory, useLocation } from "react-router-dom";


function ListingsPage(props) {
    useEffect(() => {
        getModelData();
    }, []);

    const [femaleModelList, setFemaleModelList] = useState([])
    const [maleModelList, setMaleModelList] = useState([])
    const [loader, setloader] = useState(false)
    let history = useHistory();
    let location = useLocation();

    const getModelData = async () => {
        setloader(true);
        const response = await ListingsService.getModelList();

        if(response && response.data){
            const female = [];
            const male = [];
            response.data.forEach((model) => {
                if(model.gender === "F"){
                    female.push(model);
                }
                else if (model.gender === "M"){
                    male.push(model)
                }
            })
    
            setFemaleModelList(female);
            setMaleModelList(male);
        }
        setloader(false);
    }

    const handleModelClick = (modelId) => {
        history.push(`${location.pathname}/${modelId}`);
    }

    return (
        <div className="container mb-5">
            <BackdropLoader open={loader} />
            <div className="row">
                <div className="title col-sm-12">{props.category}</div>
            </div>
            <div className="row">
                {props.category === "Ladies"
                    ? femaleModelList.map((model, index) => {
                        return <ListItem data={model} onHandleClick={handleModelClick} key={index} />
                    })
                    : props.category === "Men"
                        ? maleModelList.map((model, index) => {
                            return <ListItem data={model} onHandleClick={handleModelClick} key={index} />
                        })
                        : "Invalid Category"
                }
            </div>
        </div>
    )
}

export default ListingsPage
