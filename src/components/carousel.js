import React from 'react';
import { Carousel } from 'antd';

import './components.css';

const AppCarousel = () => {
    return (
    <Carousel autoplay style={{
        textAlign: 'center',
        height: '25vw',
        background: '#364d79',
        overflow: 'hidden',
        }}>
            <div>
                <div className="carousel-item-1"
                style={{
                height:'50vh',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                }}>
                    <div style={{color: '#ffffff'}} className="carousel-item-quote">
                        <div className="quote-div">
                            <i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>
                            &nbsp;&nbsp;&nbsp;best food service in town!&nbsp;&nbsp;&nbsp; 
                            <i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>
                        </div>
                        <span style={{fontSize: '15px'}}>- food magazine</span>
                    </div>
                </div>
            </div>
            <div>
            <div className="carousel-item-2"
                style={{
                height:'55vh',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                }}>
                    <div style={{color: '#ffffff'}} className="carousel-item-quote">
                        <div className="quote-div">
                            <i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>
                            &nbsp;&nbsp;&nbsp;very professional staff and good food!&nbsp;&nbsp;&nbsp; 
                            <i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>
                        </div>
                        <span style={{fontSize: '15px'}}>- health magazine</span>
                    </div>
                </div>
            </div>
            <div>
            <div 
                className="carousel-item-3"
                style={{
                height:'50vh',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                }}>
                    <div style={{color: '#ffffff'}} className="carousel-item-quote">
                        <div className="quote-div">
                            <i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>
                            &nbsp;&nbsp;&nbsp;safe and timely delivery.&nbsp;&nbsp;&nbsp; 
                            <i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>
                        </div>
                        <span style={{fontSize: '15px'}}>- african beats magazine</span>
                    </div>
                </div>
            </div>
        </Carousel>
    );
}

export default AppCarousel;