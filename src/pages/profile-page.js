import AppHeader from "../components/app-header/app-header";
import Profile from "../components/profile/profile";
import ProfileNavigation from "../components/profile/profile-navigation";
import pageStyles from './pages.module.css';

const ProfilePage = () => {
    return (
        <>
            <AppHeader/>
            <main className={pageStyles.profile__container}>
                <div className={pageStyles.profile}>
                    <ProfileNavigation/>
                    <Profile/>
                </div>
            </main>
        </>
    )
}

export default ProfilePage;