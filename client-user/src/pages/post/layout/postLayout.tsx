import { useNavigate } from 'react-router-dom'
import { PostType } from 'types/type'

const PostLayout = ({ data }: { data: PostType }) => {
    const navigate = useNavigate()
    return <div onClick={() => { navigate(`/post/detail/${data.idPost}/${data.title}`) }}
    className="w-full flex flex-wrap mb-0 overflow-hidden rounded flex-row bg-zinc-900 cursor-pointer">
        <div className="relative w-full overflow-hidden lg:w-2/4 h-80">
            <img className="object-cover w-full h-auto min-h-full transition-all hover:scale-110"
                src={data.thumbnails} alt="images-thumbnails-post" loading='lazy' />
        </div>
        <div
            className="relative flex self-center flex-1 p-2 m-0 lg:-ml-12 border rounded shadow border-zinc-300 bg-zinc-900 lg:items-center">
            <div>
                <span className="block mb-2 text-xs font-semibold uppercase text-blue-300">
                    {data?.dateAdded.split("T")[0].split("-").reverse().join("/")}
                </span>
                <div>
                    <h2 className="mb-3 text-2xl font-bold leading-9 text-white">
                        {data?.title}
                    </h2>
                </div>
                <span className="px-4 py-2 text-xs text-white bg-zinc-800 rounded top-4 left-4">
                    {data?.poster}
                </span>
                <span className="px-4 py-2  mx-2 text-xs text-white bg-zinc-800 rounded top-4 left-4">
                    {data?.nameType}
                </span>
            </div>
        </div>
    </div>
}

export default PostLayout