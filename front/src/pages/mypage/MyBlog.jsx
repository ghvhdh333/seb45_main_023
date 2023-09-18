import BlogList from "../../components/mypage/BlogList";
import ComentList from "../../components/mypage/ComentList";
import TopSidebar from "../../components/mypage/TopSidebar";
import BottomSidebar from "../../components/mypage/BottomSidebar";
import { useEffect } from "react";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { Blogs, Comments, User } from "../../recoil/mypage";
import Follower from "../../components/mypage/Follower";
import { authorizationTokenState } from "../../recoil/logInSignUpState";
import MypageHeaderBtn from "../../components/buttons/mypage/MypageHeaderBtn";

export default function MyBlog() {
	const data = useRecoilValue(User);
	const [blogs, setBlogs] = useRecoilState(Blogs);
	const [comments, setComments] = useRecoilState(Comments);
	const token = useRecoilValue(authorizationTokenState)
	console.log("blogs", blogs);
	console.log("comment : ", comments);

	useEffect(() => {
		const getData = async () => {
			const BlogResponse = await axios.get(
				`${process.env.REACT_APP_SERVER_URL}/blogs/members/${data.id}?page=1&size=4`,
				{
					headers: {
						"Content-Type": "application/json",
						"ngrok-skip-browser-warning": "69420",
						"Authorization": `Bearer ${token}`
					},
				}
			);

			// authorization 토큰 갱신
			if(BlogResponse.headers.get("Authorization")) {
				const Authorization = BlogResponse.headers.get("Authorization");
				localStorage.setItem('Authorization', Authorization ?? '');
			};
			setBlogs(BlogResponse.data.data);
			const CommentResponse = await axios.get(
				`${process.env.REACT_APP_SERVER_URL}/comments/members/${data.id}?page=4&size=1`,
				{
					headers: {
						"Content-Type": "application/json",
						"ngrok-skip-browser-warning": "69420",
						"Authorization": `Bearer ${token}`
					},
				}
			);
			
			// authorization 토큰 갱신
			if(CommentResponse.headers.get("Authorization")) {
				const Authorization = CommentResponse.headers.get("Authorization");
				localStorage.setItem('Authorization', Authorization ?? '');
			};

			setComments(CommentResponse.data.data);
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
          <BlogList />
          <ComentList />
          <div className="bg-white h-[0.5rem] w-[50rem] border-b-[1px] border-gray-300">&nbsp;</div>
          <div className="bg-white h-[0.5rem] w-[50rem] border-b-[1px] border-gray-300">&nbsp;</div>
          <div className="bg-white h-[0.5rem] w-[50rem] border-b-[1px] border-gray-300">&nbsp;</div>
          <div className="bg-white h-[0.5rem] w-[50rem] rounded-b-[2rem]"></div>
        </div>
        <Follower/>
      </div>
	</>
  );
}
