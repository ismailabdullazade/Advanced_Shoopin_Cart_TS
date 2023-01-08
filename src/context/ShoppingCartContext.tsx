// import { createContext, ReactNode, useContext } from "react";

import { createContext,useContext, ReactNode, useState } from "react";

// type ShoppingCartProviderProps = {
//     children:ReactNode
// }

// const ShoppingCartContext = createContext({});


// export function useShoppingCart(){
//     return useContext(ShoppingCartContext)
// }

// export function useShoppingCartProvider({children}:ShoppingCartProviderProps){
//     return(
//         <ShoppingCartContext.Provider value={{}}>
//             {children}
//         </ShoppingCartContext.Provider>
//     )
// }

// 4) Giving Type to Shopping Cart Provider
type ShoppingCartProviderProps = {
    children: ReactNode
}

type CartItem = {
    id:number,
    quantity:number
}

// 5) Giving Type to Shopping Cart Context
type ShoppingCartContextType ={
    getItemQuantity:(id:number)=>number
    increaseCartQuantity:(id:number)=>void
    decreaseCartQuantity:(id:number)=>void
    removeFromCart:(id:number)=>void
}

// 1) Create Shopping Cart Context and give a type after(create type)
const ShoppingCartContext = createContext({} as ShoppingCartContextType);

// 2) export and create custom Hook 
export function useShoppingCart(){
    return useContext(ShoppingCartContext)
}





// 3)  Wrap them into the Context.Provider
export function ShoppingCartProvider ({children}:ShoppingCartProviderProps){

    // 6) Write all functions
    const[cartItems,setCartItems] = useState<CartItem[]>([]);

    function getItemQuantity(id:number){
        return cartItems.find(item=>item.id === id)?.quantity || 0
    };

    function increaseCartQuantity(id:number){
        setCartItems(currItems=>{
            if(currItems.find(item=>item.id === id) == null){
                return [...currItems,{id,quantity:1}]
            }else{
                return currItems.map(item=>{
                    if(item.id === id){
                        return {...item,quantity:item.quantity+1}
                    }else{
                        return item
                    }
                }) 
            }
        })
    };

    function decreaseCartQuantity(id:number){
        setCartItems(currItems=>{
            if(currItems.find(item=>item.id === id)?.quantity === 1){
               return currItems.filter(item=>item.id !== id)
            }else{
                return currItems.map(item=>{
                    if(item.id === id){
                        return {...item,quantity:item.quantity-1}
                    }else{
                        return item
                    }
                })
            }
        })
    };

    function removeFromCart (id:number){
        setCartItems(currItems=>{
            return currItems.filter(item=>item.id !== id)
        })
    }


    return(
        <ShoppingCartContext.Provider value={{getItemQuantity,increaseCartQuantity,decreaseCartQuantity,removeFromCart}}>
            {children}
        </ShoppingCartContext.Provider>
    )
}
