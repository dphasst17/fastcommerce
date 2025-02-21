import { UserType,UserAddressType } from "types/type";
import { create } from "zustand";

interface userStoreType{
    user:null | UserType[],
    setStoreUser: (user: Partial<UserType>) => void;
    updated_Store_User: (user: Partial<UserType>) => void;
    add_address:(address: Partial<UserAddressType>) => void;
    remove_address:(id: Partial<number[]>) => void;
    updated_type_address: (data: Partial<{ listId?: number[], typeAddress?: string }>) => void;
}

export const userStore = create<userStoreType>((set) => ({
    user:null,
    setStoreUser:(user) => set(() => ({user:user as UserType[]})),
    updated_Store_User: (user) => set((state) => {
        const users = state.user && state.user.map((u:UserType) => ({ ...u, ...user }));
        return { user:users as UserType[] };
    }),
    add_address:(address) => set((state) => {
        console.log(address)
        const users = state.user && state.user.map((u:UserType) => ({ 
            ...u,
            address:[...u.address,address]
        }));
        return { user:users as UserType[] };
    }),
    remove_address:(id) => set((state) => {
        const users = state.user && state.user.map((u:UserType) => ({
            ...u,
            address:u.address.filter((a:UserAddressType) => !id.includes(a.idAddress))
        }));
        return { user:users as UserType[] };
    }),
    updated_type_address:(data) => set((state) => {
        const users = state.user && state.user.map((u:UserType) => ({
            ...u,
            address:u.address.map((a: UserAddressType) => {
                return {
                  ...a,
                  type: data.listId?.includes(a.idAddress) ? data.typeAddress : a.type === "default" ? "extra" : a.type
                }
              }) 
        }));
        return { user:users as UserType[] };
    }),
}))