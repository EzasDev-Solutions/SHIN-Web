import React, { useEffect, useState } from 'react'
import PhotoGallery from './PhotoGallery'
import listingsService from '../Services/listingsService';
import "./ListingDetails.css";
import { useParams } from 'react-router';

function ListingDetails() {
    useEffect(() => {
        getModelDetailsData();
    }, []);

    const [loader, setloader] = useState(false);
    const [model, setmodel] = useState(null);
    const [images, setimages] = useState([])
    let { id } = useParams();

    const getModelDetailsData = async () => {
        setloader(true);
        const response = await listingsService.getModelDetails(id);
        setmodel(response.data);
        setimages(response.data.image_link);
        setloader(false);
    }

    return (
        <div>
            <div className="">
                <PhotoGallery images={images}/>
            </div>
        </div>
    )
}

export default ListingDetails
