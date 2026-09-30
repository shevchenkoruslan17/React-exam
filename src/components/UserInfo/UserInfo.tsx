import "./UserInfo.css";

interface UserInfoProps {
    username: string;
    avatar?: string;
}
const UserInfo = ({username, avatar,}:UserInfoProps)=> {
    return (
        <div className="user-info">
            {avatar && (
                <img src={avatar} alt={username} width={32} height={32}/>
            )}
            <span>{username}</span>
        </div>
    )
}
export default UserInfo;