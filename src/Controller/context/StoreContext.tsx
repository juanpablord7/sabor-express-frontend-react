import { createContext, ReactNode, useContext, useMemo, useState } from "react";

type StoreContext = {
    page: number
    limit: number

    refreshProducts:(page:number, limit:number) => void
}

type StoreProviderProps = {
    children: ReactNode
}

const StoreContext = createContext({} as StoreContext)

export function StoreProvider({ children }: StoreProviderProps){
    const [page, setPage] = useState<number>(1)
    const [limit, setLimit] = useState<number>(10)

    const refreshProducts = async (page:number, limit:number) => {
        setPage(page)
        setLimit(limit)
                
    }

    const value = useMemo(() => {
            return {
                page,
                limit,

                refreshProducts
            }
            }, [])
        
    return <StoreContext.Provider value={value}>
        {children}
    </StoreContext.Provider>
}

export function useStore(){
    return useContext(StoreContext)
}