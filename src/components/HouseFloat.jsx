import React, { useEffect } from 'react';
import $ from 'jquery';
import houseImage from '../images/house.png'
import style from '../styles/styles.module.css'

//let img=<img className='house' src={houseImage} alt="House" width={'100px'}/>;

function Float(){
    useEffect(() => {
        const intervalId = setInterval(() => {
          $(`.${style.house}`).animate({ top: '190px'}, 'fast');
          $(`.${style.house}`).animate({ top: '200px'}, 'slow');
          $(`.${style.house}`).animate({ top: '0px'}, 'slow');
          $(`.${style.house}`).animate({ top: '-20px'}, 'slow');
          $(`.${style.house}`).animate({ top: '200px'}, 'slow');
          $(`.${style.house}`).animate({ top: '260px'}, 'slow');
          $(`.${style.house}`).animate({ top: '180px'}, 'slow');
          $(`.${style.house}`).animate({ top: '0px'}, 'slow');
          $(`.${style.house}`).animate({ top: '-10px'}, 'fast');
          $(`.${style.house}`).animate({ top: '190px'}, 'slow');
          $(`.${style.house}`).animate({ top: '170px'}, 'slow');
          $(`.${style.house}`).animate({ top: '10px'}, 'slow');
          $(`.${style.house}`).animate({ top: '0px'}, 'slow');
          $(`.${style.house}`).animate({ top: '30px'}, 'fast');
          $(`.${style.house}`).animate({ top: '200px'}, 'slow');
          $(`.${style.house}`).animate({ top: '260px'}, 'fast');
        }, 200); // Adjust the interval time as needed
    
        return () => clearInterval(intervalId); // Cleanup on component unmount
      }, []);
    
    return(
    <>
    <img className={style.house} src={houseImage} alt="House" width={'100px'}/>
    {/* {img}; */}
    </>)
}

function HouseFloat(){
    return(
        <Float/>
    )
}

export default HouseFloat