import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { ConstructorPage,
        ForgotPasswordPage,
        LoginPage, 
        ProfilePage, 
        RegisterPage, 
        ResetPasswordPage,
        IngredientPage } from '../../pages/index';
import { ProtectedRouterElement } from '../../components/protected-router-element/protected-router-element';
import AppHeader from '../app-header/app-header';

const App = () => { 
    const location = useLocation();
    let background = location.state?.background;
  
    return (
        <div>
            <AppHeader/>
            <Routes location={ background || location }>
                <Route path='/' element={<ConstructorPage/>} />
                <Route path='/ingredients/:id' element={<IngredientPage/>}/>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/register' element={<RegisterPage/>}/>
                <Route path='/forgot-password' element={<ForgotPasswordPage/>}/>
                <Route path='/reset-password' element={<ResetPasswordPage/>}/>
                <Route path='/profile' element={<ProtectedRouterElement element={<ProfilePage/>}/>}/>
                <Route path='/profile/orders' element={<ProtectedRouterElement element={<ProfilePage/>}/>}/>
                <Route path='/profile/orders/:id' element={<ProtectedRouterElement element={<ProfilePage/>}/>}/>
            </Routes>
        </div>
    )
}

export default App;