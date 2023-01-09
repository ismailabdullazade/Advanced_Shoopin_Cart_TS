// import { createContext,useContext, ReactNode, useState } from "react";

// // 4) Giving Type to Shopping Cart Provider
// type ShoppingCartProviderProps = {
//     children: ReactNode
// }

// type CartItem = {
//     id:number,
//     quantity:number
// }

// // 5) Giving Type to Shopping Cart Context
// type ShoppingCartContextType ={
//     getItemQuantity:(id:number)=>number;
//     increaseCartQuantity:(id:number)=>void;
//     decreaseCartQuantity:(id:number)=>void;
//     removeFromCart:(id:number)=>void;
// }

// // 1) Create Shopping Cart Context and give a type after(create type)
// const ShoppingCartContext = createContext({} as ShoppingCartContextType);

// // 2) export and create custom Hook 
// export function useShoppingCart(){
//     return useContext(ShoppingCartContext)
// }





// // 3)  Wrap them into the Context.Provider
// export function ShoppingCartProvider ({children}:ShoppingCartProviderProps){

//     // 6) Write all functions
//     const[cartItems,setCartItems] = useState<CartItem[]>([]);

//     // function getItemQuantity(id:number){
//     //     return cartItems.find(item=>item.id === id)?.quantity || 0
//     // };
    
//     function getItemQuantity(id: number) {
//         return cartItems.find(item => item.id === id)?.quantity || 0
//       }


//     function increaseCartQuantity(id:number){
//         setCartItems(currItems=>{
//             if(currItems.find(item=>item.id === id) == null){
//                 return [...currItems,{id,quantity:1}]
//             }else{
//                 return currItems.map(item=>{
//                     if(item.id === id){
//                         return {...item,quantity:item.quantity+1}
//                     }else{
//                         return item
//                     }
//                 }) 
//             }
//         })
//     };

//     function decreaseCartQuantity(id:number){
//         setCartItems(currItems=>{
//             if(currItems.find(item=>item.id === id)?.quantity === 1){
//                return currItems.filter(item=>item.id !== id)
//             }else{
//                 return currItems.map(item=>{
//                     if(item.id === id){
//                         return {...item,quantity:item.quantity-1}
//                     }else{
//                         return item
//                     }
//                 })
//             }
//         })
//     };

//     function removeFromCart (id:number){
//         setCartItems(currItems=>{
//             return currItems.filter(item=>item.id !== id)
//         })
//     }


//     return(
//         <ShoppingCartContext.Provider value={{getItemQuantity,increaseCartQuantity,decreaseCartQuantity,removeFromCart}}>
//             {children}
//         </ShoppingCartContext.Provider>
//     )
// }

import { createContext, ReactNode, useContext, useState } from "react"
import { ShoppingCart } from "../components/ShoppingCart"
import { useLocalStorage } from "../hooks/useLocalStorage"

type ShoppingCartProviderProps = {
  children: ReactNode
}

type CartItem = {
  id: number
  quantity: number
}

type ShoppingCartContextType = {
  openCart: () => void
  closeCart: () => void
  getItemQuantity: (id: number) => number
  increaseCartQuantity: (id: number) => void
  decreaseCartQuantity: (id: number) => void
  removeFromCart: (id: number) => void
  cartQuantity: number
  cartItems: CartItem[]
}

const ShoppingCartContext = createContext({} as ShoppingCartContextType)

export function useShoppingCart() {
  return useContext(ShoppingCartContext)
}
export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  )

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  )

  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)
  function getItemQuantity(id: number) {
    return cartItems.find(item => item.id === id)?.quantity || 0
  }
  function increaseCartQuantity(id: number) {
    setCartItems(currItems => {
      if (currItems.find(item => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }]
      } else {
        return currItems.map(item => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            return item
          }
        })
      }
    })
  }
  function decreaseCartQuantity(id: number) {
    setCartItems(currItems => {
      if (currItems.find(item => item.id === id)?.quantity === 1) {
        return currItems.filter(item => item.id !== id)
      } else {
        return currItems.map(item => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 }
          } else {
            return item
          }
        })
      }
    })
  }
  function removeFromCart(id: number) {
    setCartItems(currItems => {
      return currItems.filter(item => item.id !== id)
    })
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        cartItems,
        cartQuantity,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  )
}