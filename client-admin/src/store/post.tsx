import {create} from "zustand";

export interface CategoryPostType{
    idType: number,
    nameType:string,
    create_at?: string,
    update_at?: string
}
export interface PostType{
    idPost:number,
    title:string,
    idType:number,
    nameType?:string,
    poster:string,
    dateAdded?: string,
    thumbnails?: string
}

interface PostStoreType {
    categoryPost:CategoryPostType[] | null,
    post:PostType[] | null,
    setCategoryPost: (category: CategoryPostType[]) => void,
    setPost: (post: PostType[]) => void
}

export const postStore = create<PostStoreType>((set:any) => ({
    categoryPost: null,
    post: null,
    setCategoryPost: (category: CategoryPostType[]) => set({ category }),
    setPost: (post: PostType[]) => set({ post }),
}));