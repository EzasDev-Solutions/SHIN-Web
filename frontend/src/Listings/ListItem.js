import React from 'react'
import locationIcon from "../assets/images/location-icon.png"

function ListItem({ data, onHandleClick }) {
    return (
        <>
            <div className="list-item col-lg-4 col-md-6 col-sm-6 col-xs-12 mt-5">
                <div className="list-content" onClick={() => onHandleClick(data.model_id)}>
                    <img className="model-image" src={data.image_link} alt={data.model_name}/>
                    <div className="d-flex flex-wrap align-items-center mt-1">
                        <div className="mr-1">
                            <div className="model-name">
                                {data.model_name}, {data.age}
                            </div>
                            <div className="d-flex align-items-center">
                                <img src={locationIcon} style={{ height:"15px" }}/>
                                <span className="country">{data.country}</span>
                            </div>
                        </div>
                        <div className="ml-auto price">
                            S${data.rate}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListItem
