import { createContext, ReactNode, useContext } from "react";

type ShoppingCartProviderProps = {
    children:ReactNode
}

const ShoppingCartContext = createContext({});


export function useShoppingCart(){
    return useContext(ShoppingCartContext)
}

export function useShoppingCartProvider({children}:ShoppingCartProviderProps){
    return(
        <ShoppingCartContext.Provider value={{}}>
            {children}
        </ShoppingCartContext.Provider>
    )
}