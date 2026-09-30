import UserInfo from "../UserInfo/UserInfo";
import "./Header.css";

const Header = () => {
    return (
        <header className="header">
            <h1 className="header-title">
                MovieDB
            </h1>
            <UserInfo username="User"/>
        </header>
    );
};
export default Header;