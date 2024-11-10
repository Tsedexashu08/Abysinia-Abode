// App.js
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from '../src/components/AuthProvider'; // Import the context from authentication providing component.
import LoginPage from './pages/login';
import PropertyListPage from './pages/PropertyListPage';
import MainPage from './pages/Main_Page';
import AccountPage from './pages/Account_Page';
import AddPropertyPage from './pages/AddProperty_page';
import HomePage from './pages/Home_Page';
import PropertyDetail from './pages/propertyDetailsPage';
import EditAccount from './components/EditAccount';
import Privacy from './pages/privacyPage';
import Terms from './pages/termsPage';
import MyProperties from './pages/MyProperties';
import EditProperty from './components/EditProperty';
import Register from './pages/Register';
import Signup from './pages/Signup';
import NotFound from './components/NotFound';
import Rooms from './pages/Rooms_page';
import AddEvent from './components/AddEvent';
import EventDetails from './pages/EventDetailsPage';
import ReservationDetails from './pages/ReservationDetails';

function App() {
    const { isAuthenticated } = useAuth(); // Get authentication state

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route index element={<LoginPage />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/signup' element={<Signup />} />
                    {/* each route below will only work if authentication is done first(thats why we use ternanry conditional below). */}
                    {/* we show notfound page mak made if not authenticted when opening a page. */}
                    <Route element={<MainPage />}>
                        <Route path='/home' element={isAuthenticated ? <HomePage /> : <Navigate to="/404-notFound" />} />
                        <Route path='/properties' element={isAuthenticated ? <PropertyListPage /> : <Navigate to="/404-notFound" />} />
                        <Route path='/account' element={isAuthenticated ? <AccountPage /> : <Navigate to="/404-notFound" />} />
                        <Route path='/addProperty' element={isAuthenticated ? <AddPropertyPage /> : <Navigate to="/404-notFound" />} />
                        <Route path='/propertyDetails/:name' element={isAuthenticated ? <PropertyDetail /> : <Navigate to="/404-notFound" />} />
                        <Route path='/EventDetails/:name' element={isAuthenticated ? <EventDetails /> : <Navigate to="/404-notFound" />} />
                        <Route path='/ReservationDetails/:name' element={isAuthenticated ? <ReservationDetails /> : <Navigate to="/404-notFound" />} />
                        <Route path='/editaccount' element={isAuthenticated ? <EditAccount /> : <Navigate to="/404-notFound" />} />
                        <Route path='/privacyPage' element={isAuthenticated ? <Privacy /> : <Navigate to="/404-notFound" />} />
                        <Route path='/termsPage' element={<Terms />} />
                        <Route path='/myproperties' element={isAuthenticated ? <MyProperties /> : <Navigate to="/404-notFound" />} />
                        <Route path='/editproperty/:id' element={isAuthenticated ? <EditProperty /> : <Navigate to="/404-notFound" />} />
                        <Route path='/rooms' element={isAuthenticated ? <Rooms /> : <Navigate to="/404-notFound" />} />
                        <Route path='/addevent' element={isAuthenticated ? <AddEvent /> : <Navigate to="/404-notFound" />} />
                    </Route>

                    {/* Catch-all route for displaying Not Found page mak made so user cant just type url without logging in */}
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;