import { useParams } from "react-router-dom"
import 'react-quill/dist/quill.snow.css';// import styles
import "highlight.js/styles/monokai-sublime.min.css";
import { useFetchDataByKey } from "../../hooks/useFetchData";
import { useEffect, useState } from "react";
import { Avatar, Button, Code, Pagination } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { GetToken } from "../../utils/token";
import { commentPostInsert, getCommentByPost } from "../../api/post";
import { CommentResType, CommentType } from "types/type";
import { userStore } from "../../store/user";
const PostsDetail = () => {
    const { register, handleSubmit } = useForm()
    const { user } = userStore()
    const param = useParams()
    const { data } = useFetchDataByKey('posts', 'postGetDetail', Number(param.idPost))
    const { data: commentPost } = useFetchDataByKey('posts', 'getCommentByPost', Number(param.idPost))
    const [value, setValue] = useState("")
    const [activePage, setActivePage] = useState(1)
    const [dComment, setDComment] = useState<CommentResType | null>(null)
    const [comment, setComment] = useState<CommentType[] | null>(null)
    const [firstPage,setFirstPage] = useState<CommentType[] | []>([])
    useEffect(() => {
        document.title = `${param.name}`
    }, [param])
    useEffect(() => {
        commentPost && (
            setDComment({ total: commentPost.data.total, total_page: commentPost.data.total_page, page: commentPost.data.page }),
            setComment(commentPost.data.detail),
            setFirstPage(commentPost.data.detail),
            setActivePage(commentPost.data.page)
        )
    }, [commentPost])
    const onSubmit = async (data: any) => {
        const token = await GetToken()
        const dataInsert = [{
            idPost: Number(param.idPost!),
            commentValue: data.message,
            created_date: new Date().toISOString().split("T")[0]
        }]
        token && commentPostInsert(token, dataInsert)
            .then(res => {
                if (res.status === 201 && comment && dComment) {
                    const newDComment: CommentResType = {
                        total: dComment?.total + 1,
                        total_page: Math.ceil((dComment.total + 1) / 4),
                        page: 1
                    }
                    const appendData = [{ ...dataInsert[0], nameUser: user ? user[0].nameUser : '', img: '', idComment: res.data.id }, ...firstPage.slice(0,3)]
                    setFirstPage(appendData)
                    setComment(appendData)
                    setDComment(newDComment)
                    setActivePage(1)
                    setValue("")
                }
            })
    }
    const handleChange = (e: any) => {
        setActivePage(e)
        getCommentByPost(Number(param.idPost), e)
                .then(res => {
                    if(res.status === 200 && comment) {
                        setDComment(res.data),
                        setComment(res.data.detail)
                    }
                })
    }
    return <div className="PostsDetail w-full h-auto min-h-[90vh] flex flex-row items-start justify-evenly">
        <div className="w-3/5 h-auto py-10">
            {data !== null && data.data.map((e: any) => <div className="ql-snow" key={e.idPost}>
                <div className={`ql-editor text-slate-700 bg-transparent`} dangerouslySetInnerHTML={{ __html: e.valuesPosts }} />
            </div>)}
        </div>
        <div className="w-1/4 h-auto min-h-screen flex flex-col justify-start">
            <div className="form-comment w-full flex flex-col justify-start pt-10">
                <textarea {...register('message', { required: true })} rows={5}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="rounded-md p-6 w-full text-sm outline-none border-0 bg-zinc-700 text-white placeholder-gray-400"
                    placeholder="Write a comment..." required />
                <Button className="w-[200px] h-[40px] my-2 bg-zinc-800 text-zinc-100" size="sm" onClick={() => handleSubmit(onSubmit)()}>Send</Button>
            </div>
            <Code radius="sm" className="flex items-center justify-center my-2 font-bold cursor-pointer bg-zinc-600 text-zinc-50">Comment for post</Code>
            <div className="comment-detail w-full flex flex-wrap items-center justify-center">
                <div className="comment-list w-full flex flex-wrap items-center justify-center">
                    {comment && comment.map((d: CommentType) => <div className="w-4/5 text-zinc-900 flex items-center justify-center my-2 !-z-0" key={d.id}>
                        <Avatar isBordered radius="sm" src={d.img !== "" ? d.img : "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"} />
                        <div className="w-4/5 h-auto min-h-[50px] mx-2">
                            <div className="w-full flex justify-between">
                                <p className="font-semibold font-mono">{d.nameUser}</p>
                                <p>{new Date(d.created_date!).toLocaleDateString()}</p>
                            </div>
                            <Code style={{ color: "#fff" }} className="w-full bg-zinc-900 z-10 text-wrap" radius="sm">{d.commentValue}</Code>
                        </div>
                    </div>)}
                </div>
                {dComment && comment && comment.length !== 0 && <Pagination isCompact size="lg" showControls page={activePage}
                    total={dComment.total_page} initialPage={1} onChange={(e) => handleChange(e)} />}
            </div>
        </div>

    </div>

}
export default PostsDetail