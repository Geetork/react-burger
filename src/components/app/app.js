import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ConstructorPage,
        ForgotPasswordPage,
        LoginPage, 
        ProfilePage, 
        RegisterPage, 
        ResetPasswordPage,
        IngredientPage } from '../../pages/index';
import { ProtectedRouterElement } from '../../components/protected-router-element/protected-router-element';

const App = () => { 
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<ConstructorPage/>} />
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/register' element={<RegisterPage/>}/>
                <Route path='/forgot-password' element={<ForgotPasswordPage/>}/>
                <Route path='/reset-password' element={<ResetPasswordPage/>}/>
                <Route path='/profile' element={<ProtectedRouterElement element={<ProfilePage/>}/>}/>
                <Route path='/profile/orders' element={<ProtectedRouterElement element={<ProfilePage/>}/>}/>
                <Route path='/profile/orders/:id' element={<ProtectedRouterElement element={<ProfilePage/>}/>}/>
                <Route path='/ingredients/:id' element={<IngredientPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;