import React, { useState, useEffect } from 'react'
import axios from "axios";

export const Home = () => {


  const [weight, setWeight] = useState(0)
  const [height, setHeight] = useState(0)
  const [responseData, setResponseData] = useState([])
  const [videoSource, setVideoSource] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const [showAlert, setshowAlert] = useState(false)

  const handleSubmit = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/bmi?weight=${weight}&height=${height}`);
      setResponseData(response.data);

     // console.log(response.data);

    } catch (error) {
      setshowAlert(true)
      setShowVideo(false)
      setVideoSource(null)
      //console.error(error);
    }
  }


  useEffect(() => {



    if (responseData.length > 1) {
      // Assuming you have the base64 string
      const base64String = responseData[1];

      // Convert base64 to binary (Uint8Array)
      const binaryData = Uint8Array.from(atob(base64String), (char) => char.charCodeAt(0));

      // Create a Blob from binary data
      const blob = new Blob([binaryData], { type: 'video/mp4' });

      // Create a URL for the Blob
      const videoURL = URL.createObjectURL(blob);
      setVideoSource(videoURL);
    }

    return () => {
      setShowVideo(false)
      setVideoSource(null)
      setshowAlert(false)
    };
  }, [responseData,]);

  return (
    <><div className='mt-5 mb-2'>

      <h2 className='text-danger rounded bg-danger text-white d-inline-flex p-2'> <i className="bi bi-calculator"></i>BMI CALCULATOR</h2>
    </div>
      {showAlert && <div className="alert alert-danger " role="alert">
        Zero weight and height not acceptable
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>}
      <div className='container mt-5 d-flex justify-content-center'>

        <div className='row '>



          <div className="card " >


            <div className="card-body mt-3 mb-2">
              <div className="mb-3">

                <div className='row mt-4'>
                  <div className='col-md-6'>
                    <label className="form-label mx-3">Weight</label>
                    <input type="number" className="form-control-sm" placeholder="Weight in kg" value={weight} onChange={(event) => { setWeight(event.target.value) }} />
                  </div>
                  <div className='col-md-6'>
                    <label className="form-label mx-3">Height</label>
                    <input type="number" className="form-control-sm" placeholder="Height in cm" value={height} onChange={(event) => { setHeight(event.target.value) }} />
                  </div>
                </div>

              </div>
              <button type="button" onClick={handleSubmit} className="btn btn-success mt-3">Submit</button>
            </div>
          </div>


          {responseData.length > 0
            ?

            <div className='mt-4'>

              <h4 className='text-primary'>{responseData[0]}</h4>
              {responseData.length > 1 ?
                <button type="button" className="btn btn-success mt-3" onClick={() => { setShowVideo(true) }}>Click to suggestion</button>
                :
                <h3 className='text-Info'>Sorrry No suggestions :(</h3>
              }
              {showVideo &&

                <div>

                  <video width="320" height="240" controls>
                    <source src={videoSource} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              }
            </div>
            :
            <div></div>
          }
        </div>

      </div>
      <div className='d-flex align-items-end flex-column mt-5'>
        <h3>Art by :</h3>
        <h3> Jitendra Saivaraprasad Pitchuka</h3>
      </div>
    </>
  )
}
