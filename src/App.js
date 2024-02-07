import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';
import ImageGrid from './components/imageGrid'
import debounce from 'lodash/debounce';

function App() {    
    const [images, setImages] = useState([]);
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false);

    const spinnerStyle = {
      width: '5rem',
      height: '5rem',
      borderWidth: '0.5em'
    };

    useEffect(() => {    
      const getImageData = async () => {
        try {
          const response = await axios.get(`https://jsonplaceholder.typicode.com/photos?_limit=24&_page=${page}`);
          setImages((prev) => [...prev, ...response.data]);
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      };
      getImageData();
    }, [page]);

    const handleInfiniteScroll = debounce(async () => {
      try {
        if (
          window.innerHeight + document.documentElement.scrollTop + 1 >
            document.documentElement.scrollHeight
        ) {
          setPage((prev) => prev + 1);
        }
      } catch (error) {
        console.log(error);
      }
    }, 500);

    useEffect(() => {
        window.addEventListener("scroll", handleInfiniteScroll);
        return () => window.removeEventListener("scroll", handleInfiniteScroll)
    }, [handleInfiniteScroll])

    return (
      (
        <div className='image-container' id="image-wrapper">
            <h1>Image Gallery</h1>
            <ImageGrid images={images}/>
            { loading && <Spinner animation="border" role="status" style={spinnerStyle}>
              <span className="visually-hidden">Loading...</span>
            </Spinner>} 
        </div>
      )
    );
}

export default App;
