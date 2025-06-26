import React from 'react'

const CityImage = ({src, alt}) => {
    return (
        <>
            <img src={src} alt={alt} style={{width:"300px"}}/>
        </>
        )
    }

export default CityImage
