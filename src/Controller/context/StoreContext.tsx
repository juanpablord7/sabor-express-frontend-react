import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { getProducts } from "../../Model/services/productsService";
import { Product } from "../../Model/types/productTypes";

type StoreContext = {
    products: Product[] | null
    page: number
    limit: number
    totalItems: number

    refreshProducts:(page:number, limit:number) => void
}

type StoreProviderProps = {
    children: ReactNode
}

const StoreContext = createContext({} as StoreContext)

export function StoreProvider({ children }: StoreProviderProps){
    const [products, setProducts] = useState<Product[] | null>(null);

    const [page, setPage] = useState<number>(1)
    const [limit, setLimit] = useState<number>(10)

    const [totalItems, setTotalItems] = useState<number>(1)

    const refreshProducts = async (page:number, limit:number) => {
        setPage(page)
        setLimit(limit)
        
        const { products, totalItems } = await getProducts(page, limit)
        setProducts(products)
        setTotalItems(totalItems)
                
    }

    const value = useMemo(() => {
            return {
                products,
                page,
                limit,
                totalItems,

                refreshProducts
            }
            }, [products])
        
    return <StoreContext.Provider value={value}>
        {children}
    </StoreContext.Provider>
}

export function useStore(){
    return useContext(StoreContext)
}