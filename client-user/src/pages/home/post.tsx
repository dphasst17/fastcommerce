import { Fade } from 'react-awesome-reveal'
import { StateContext } from '../../context/stateContext'
import { useContext } from 'react'
import PostLayout from '../post/layout/postLayout'
import { PostType } from '../../types/type'

const Post = () => {
    const { post } = useContext(StateContext)
    return <section className="flex items-center justify-center w-full">
        <div className="p-4 w-[90%]">
            <div className="w-full flex flex-wrap justify-around content-around">
                {post?.slice(0, 4).map((e: PostType) => <Fade
                triggerOnce 
                className='w-full sm:w-4/5 xl:w-[45%] my-1'
                fraction={0.8} key={e.idPost}>
                    <PostLayout data={e} />
                </Fade>)}
            </div>
        </div>
    </section>
}

export default Post