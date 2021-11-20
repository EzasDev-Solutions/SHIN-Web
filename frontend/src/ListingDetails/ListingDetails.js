import React, { useEffect, useState } from 'react'
import PhotoGallery from './PhotoGallery'
import listingsService from '../Services/listingsService';
import "./ListingDetails.css";
import { useParams, useHistory } from 'react-router-dom';
import locationIcon from "../assets/images/location-icon.png"
import arrowIcon from "../assets/images/arrows.png"
import Login from '../Login/Login'; 

function ListingDetails({ setIsLoggedIn, isLoggedIn }) {
    useEffect(() => {
        getModelDetailsData();
    }, []);

    const [openModal, setOpenModal] = useState(false)
    const [loader, setloader] = useState(false);
    const [model, setmodel] = useState(null);
    const [images, setimages] = useState([])

    const history = useHistory();
    let { id } = useParams();

    const getModelDetailsData = async () => {
        setloader(true);
        const response = await listingsService.getModelDetails(id);
        setmodel(response.data);
        setimages(response.data.image_link);
        setloader(false);
    }

    const handleBooking = () => {
        if (localStorage.getItem('apiToken') === null) {
            setOpenModal(true);
        } else {
            history.push(`/payment/${id}`);
        }
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="profile-images col-xl-4 col-lg-12 col-md-12 col-sm-12">
                    <PhotoGallery images={images} />
                </div>
                <div className="col-xl-8 col-lg-12 col-md-12 col-sm-12">
                    <div className="row">
                        <div className="col-5">
                            <h1 className="model-name">{model && model.model_name}</h1>
                            <div className="d-flex align-items-center">
                                <img src={locationIcon} style={{ height: "15px" }} />
                                <span className="country ml-1">{model && model.country}</span>
                            </div>

                            <div className="my-5 py-3">
                                <div className="d-flex flex-wrap text-left">
                                    <div className="w-50">Age</div>
                                    <div className="w-50">{model && model.age}</div>
                                </div>
                                <div className="d-flex flex-wrap text-left my-3">
                                    <div className="w-50">Height</div>
                                    <div className="w-50">{model && model.height} cm</div>
                                </div>
                                <div className="d-flex flex-wrap text-left">
                                    <div className="w-50">Languages</div>
                                    <div className="w-50">{model && model.languages.join(", ")}</div>
                                </div>
                            </div>

                            <div className="text-left">
                                <div>Availability</div>
                                <div className="font-weight-bold mt-2">
                                    {model && `${new Date(model.start_date).toLocaleDateString("en-us", { month: 'long', year: 'numeric' })} -
                                    ${new Date(model.end_date).toLocaleDateString("en-us", { month: 'long', year: 'numeric' })}`}
                                </div>
                            </div>
                        </div>

                        <div className="col-7">
                            <div className="row">
                                <div className="col-12">
                                    <div className="book-btn shadow" onClick={handleBooking}>
                                        Book
                                    </div>
                                </div>

                                <div className="col-12 text-left mt-5 px-5 pt-4">
                                    <div>Description</div>
                                    <div className="mt-2">{model && model.description}</div>
                                </div>

                                <div className="col-12 text-left mt-5 px-5 pt-4">
                                    <div>Services</div>
                                    <div className="mt-4 row">
                                        {model && model.services.map((service, index) => {
                                            return (
                                                <div className="col-6 mb-4" key={index}>
                                                    <img src={arrowIcon} style={{ height: "40px", width: "40px" }} />
                                                    <span className="ml-3">{service}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {openModal && 
                <Login 
                    openModal={openModal} 
                    setOpenModal={setOpenModal} 
                    setIsLoggedIn={setIsLoggedIn} 
                    from="listingDetails" 
                    id={id} 
                />
            }
        </div>
    )
}


export default ListingDetails
