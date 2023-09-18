import TopSidebar from "../../components/mypage/TopSidebar";
import BottomSidebar from "../../components/mypage/BottomSidebar";
import MypageNotice from "../../components/mypage/MypageNotice";
import UserInfo from "../../components/mypage/UserInfo";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { User, userInfo } from "../../recoil/mypage";
import Follower from "../../components/mypage/Follower";
import MypageHeaderBtn from "../../components/buttons/mypage/MypageHeaderBtn";

export default function MyPage() {
  const [data, setData] = useRecoilState(User);
  const [info, setInfo] = useRecoilState(userInfo);
  const [nickname, setNickname] = useState(data.nickname);
  const [nationality, setNationality] = useState(data.nationality);
  const [password, setPassword] = useState('');
  const [birth, setBirth] = useState(data.birth);
  console.log(data);
 	useEffect(() => {
		const getData = async () => {
			try {
				const data = await axios.get(
					`${process.env.REACT_APP_TEST_URL}/members/test@google.com`,
					{
						headers: {
							"Content-Type": "application/json",
							"ngrok-skip-browser-warning": "69420",
						},
					}
				);
				setData(data.data);
				const { nickname, nationality, password, birth, id } = data.data;
				setInfo({ nickname, nationality, password, birth, id });
			} catch (err) {
				console.log(err);
			}
		};

		getData();
	}, []);
  return (
    <>
      <MypageHeaderBtn />
      <div className="flex justify-center">
        <TopSidebar />
        <BottomSidebar />
        <div className="flex flex-col items-center w-[50rem] h-[50rem] mt-[3rem] shadow-xss rounded-t-[2rem] bg-white ">
          <MypageNotice nickname={nickname} nationality={nationality} password={password} birth={birth} />
          <UserInfo
            setNickname={setNickname}
            setNationality={setNationality}
            setPassword={setPassword}
            setBirth={setBirth}
          />
          <div className="bg-white h-[0.5rem] w-[50rem] border-b-[1px] border-gray-300">&nbsp;</div>
          <div className="bg-white h-[0.5rem] w-[50rem] border-b-[1px] border-gray-300">&nbsp;</div>
          <div className="bg-white h-[0.5rem] w-[50rem] border-b-[1px] border-gray-300">&nbsp;</div>
          <div className="bg-white h-[0.5rem] w-[50rem] rounded-b-3xl shadow-xss">&nbsp;</div>
        </div>
        <Follower/>
      </div>
    </>
  );
}
