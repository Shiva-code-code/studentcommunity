import { Models } from "appwrite"
import { Link } from 'react-router-dom'
import { formatDate } from "@/lib/utils"
import { useUserContext } from "@/contex/AuthContext";
import { PostStats } from ".";


type PostCardProps = {
  post: Models.Document;
}

const PostCard = ({ post }: PostCardProps) => {
  console.log(post);
 const { user } = useUserContext();


  if(!post.creators) return;

  return (
    
    <div className="post-card">
      <div className="flex-between">
        <div className="flex items-center gap-3">
          <Link to={'/profile/${post.creators.$id}'}>
            <img 
              src={post?.creators?.imageUrl || '/assets/icons/profile-placeholder.svg' }
              alt="creators"
              className="rounded-full w-12 lg:h-12"
              />
          </Link>
          <div className="flex flex-col">
            <p className="base-medium lg:body-body text-dark-1">
               {post.creators.name} 
            </p>
            <div className="flex-center gap-2 text-dark-3">
              <p className="subtle-semibold lg:small-regula">
              {formatDate(post.$createdAt)}
              </p>

              <p className="subtle-semibold lg:small-regular">
                {post.location}
              </p>
            </div>
          </div>
        </div>

        <Link to={'/update-post/${post.$id}'}
           className={`${user.id !== post.creators.$id && "hidden"}`}
          >
          <img 
            src="/assets/icons/edit.svg"
            alt="20"
            width={20}
            height={20}
            />
        </Link>
      </div>
      <Link to = {`/posts/${post.$id}`}>
        <div className="small-medium lg:base-medium py-5">
          <p className="text-dark-3">{post.caption}</p>
          <ul className="flex gap-1 mt-2">
            {post.tags.map((tag:string) => (
            <li key={tag} className="text-dark-3">
              #{tag}
              </li>
              ))}
          </ul>
        </div>

        <img 
          src={post.imageUrl || '/assets/icons/profile-placeholder.svg'}
          className="post-card_image"
          alt="post image"
          />
      </Link>
      <PostStats post={post} userId={user.id} />
    </div>
  )
}

export default PostCard