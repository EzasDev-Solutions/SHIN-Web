import React from 'react'

function PhotoGallery({ images }) {
    return (
        <>
            <div className="photo-gallary">
                <div id="carousel-thumb" className="carousel slide carousel-fade carousel-thumbnails" data-ride="carousel">
                    <div className="carousel-inner" role="listbox">
                        {images.map((image, index) => {
                            return (
                                <div className={index === 0 ? "carousel-item active" : "carousel-item"} key={index}>
                                    <img className="d-block w-100" src={image} alt="Images"/>
                                </div>)
                        })}
                    </div>
                    <a className="carousel-control-prev" href="#carousel-thumb" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carousel-thumb" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
                {images.map((image, index) => {
                    return (<span data-target="#carousel-thumb" className={index === 0 ? "active" : ""} data-slide-to={index} key={index}>
                                <img className="thumbnail img-fluid" src={image}/>
                            </span>)
                })}
            </div>
        </>
    )
}

export default PhotoGallery
