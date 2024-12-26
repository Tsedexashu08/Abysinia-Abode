import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavigationBar from '../components/Navigation_bar';
import style from '../styles/mainStyle.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';



function MainPage() {
    const [headerKey, setHeaderKey] = useState(0);
    const handleOutletChange = () => {
        setHeaderKey(prevKey => prevKey + 1);
    };
    return (
        <>
            <NavigationBar />
            <div className={style.mainPage}>
                <Header key={headerKey} />
                <main className={style.main}>
                    <Outlet context={{ onChange: handleOutletChange }} />
                </main>
                <Footer />
            </div>
        </>
    );
}

export default MainPage;