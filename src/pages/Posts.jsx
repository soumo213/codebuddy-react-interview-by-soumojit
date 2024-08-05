import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { LoadingScreen } from "../components";

const Posts = () => {
  const navigate = useNavigate();
  const [postList, setPostList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://codebuddy.review/posts");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setPostList(result.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const redirectToAddPost = () => {
    navigate("/add-post");
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="rounded-lg bg-gray-50 p-7 text-gray-900 shadow-lg">
      <h1 className="mb-7 text-4xl font-bold">Posts</h1>
      <div className="mb-4 flex items-center justify-between">
        <Link to="/" className="flex items-center text-blue-600 hover:underline">
          <Icon icon="mdi:arrow-left" className="mr-2" />
          Back to Home
        </Link>
        <button
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={redirectToAddPost}
        >
          Add Post
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {postList?.length > 0 &&
          postList.map((post) => (
            <div className="rounded-lg bg-white p-7 shadow-lg" key={post.id}>
              <h2 className="flex items-center space-x-4 text-2xl font-bold">
                <img
                  src={post.avatar}
                  alt={`${post.firstName} ${post.lastName}`}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <span>
                  {post.firstName} {post.lastName}
                </span>
              </h2>
              <p className="text-gray-700">{post.writeup}</p>
              <img src={post.image} alt="" />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Posts;
