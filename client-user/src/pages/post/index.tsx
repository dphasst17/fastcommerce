import { Fade } from 'react-awesome-reveal'
import { StateContext } from '../../context/stateContext'
import { useContext } from 'react'
import PostLayout from '../post/layout/postLayout'
import { PostType } from '../../types/type'

const Post = () => {
    const { post } = useContext(StateContext)
    return <section className="flex items-center w-full h-auto min-h-[80vh]">
        <div className="p-4 mx-auto w-[90%] h-auto">
            <div className="grid grid-cols-1 gap-4 lg:gap-8 sm:gap-4 sm:grid-cols-2 lg:grid-cols-2">
                {post?.map((e: PostType) => <Fade triggerOnce fraction={0.5} key={e.idPost}><PostLayout data={e} /></Fade>)}
            </div>
        </div>
    </section>
}

export default Post