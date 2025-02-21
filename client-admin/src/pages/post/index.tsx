import CreatePosts from "./create"
import ShortKey from "./shortcut"

const Post = () => {
  return <div className="w-full h-auto flex flex-wrap justify-center items-center !text-zinc-900">
    <div className="w-[90%] my-2">
      <h1 className="text-blue-500 text-[25px] text-center font-bold my-4">Create a new Posts</h1>
      <ShortKey />
      <CreatePosts />
    </div>
  </div>
}

export default Post