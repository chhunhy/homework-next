'use client'
import Product from '@/app/(admin)/product/page';
import { useCreateProductMutation, useDeleteProductMutation, useUpdateProductMutation } from '@/redux/service/ecommerce';
import { error } from 'console';
import React, { useState } from 'react';

export default function TestJWT() {
    const [accessToken, setAccessToken] = useState("");
    const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation()
    const [user,setUser] = useState(null)
    const [unAuthorized,setUnAuthorized] = useState(false)
    const [createProduct,{data,isLoading,error}] = useCreateProductMutation();
    const [updateProduct,{isLoading:isUpdating}] = useUpdateProductMutation();
    //handle login
    const handleLogin = async ()=>{
        const email = "chhunhychhunhy121828@gmail.com";
        const password = "chhunhy171103";
        fetch(process.env.NEXT_PUBLIC_API_URL + "/login",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        }).then(res => res.json())
        .then(data => {
            console.log("Data in jwt :",data)
            setAccessToken(data.accessToken)
            setUser(data.user)
        })
        .catch(error => {
            console.log(error);
        })
    }

    //handle patial update
    const handlePartialUpdate = async ()=>{
        const body = {
            name:"for women shoes update",
        };
      const res = await  fetch(`${process.env.NEXT_PUBLIC_DJANGO_API_URL}/api/products/${436}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify(body)
        })
        if(res.status === 401){
            setUnAuthorized(true)
        }

        const data = await res.json()
        console.log("Update data :",data)
    }

    //hanlde refresh token
    const handleRefreshToken = async()=>{
        fetch(process.env.NEXT_PUBLIC_API_URL + "/refresh",{
            method: "POST",
            credentials:"include",
            body: JSON.stringify({}),
        }).then((res)=>res.json())
        .then((data)=>{
            console.log("Data refresh token :",data)
             setAccessToken(data.accessToken)
            
        }).catch((error)=>{
            console.log(error)
        });
    }

    //handle logout
    const handleLogout = async()=>{
        fetch(process.env.NEXT_PUBLIC_API_URL + "/logout",{
            method: "POST",
            credentials:"include",
            body: JSON.stringify({}),
        }).then((res)=>res.json())
        .then((data)=>{
            console.log("Data from logout :",data)
             //setAccessToken(data.accessToken)
            
        }).catch((error)=>{
            console.log(error)
        });

    }
    //handle create product wiht rtk
    const handleCreateProductWithRTK = async()=>{
        const body ={
            category: {
              name: "running shoes",
              icon: "https://store.istad.co/media/category_images/4k-image_kdywn9O.jpg"
            },
            name: "Running Shoes for Snappy Strides",
            desc: "Lightweight running shoes have come a long way as both racing flats and daily trainers. Once upon a time, to shave grams on a shoe and get it down to a competitive weight, brands had to make considerable compromises in comfort and stability—but that’s no longer the case. Thanks to lighter midsole foams and meshy upper materials, some of our favorite supportive and maximally cushioned shoes now sit well below 8 ounces on the scale.",
            image: "https://store.istad.co/media/product_images/Screenshot_2024-02-12_152037.png",
            price: "95.25",
            quantity: 200
          }
          
          const productBody={
            newProduct:body,
            accessToken:accessToken
          }
        
        // const productBody ={
        //     category: {
        //       name: "running shoes",
        //       icon: "https://store.istad.co/media/category_images/4k-image_kdywn9O.jpg"
        //     },
        //     name: "Running Shoes for Snappy Strides",
        //     desc: "Lightweight running shoes have come a long way as both racing flats and daily trainers. Once upon a time, to shave grams on a shoe and get it down to a competitive weight, brands had to make considerable compromises in comfort and stability—but that’s no longer the case. Thanks to lighter midsole foams and meshy upper materials, some of our favorite supportive and maximally cushioned shoes now sit well below 8 ounces on the scale.",
        //     image: "https://store.istad.co/media/product_images/Screenshot_2024-02-12_152037.png",
        //     price: "95.25",
        //     quantity: 200
        //   }
        // const productBody={
        //     newProduct:body,
        //     accessToken:accessToken
        // }
         console.log("product body :",productBody)
        try{
            const res = await createProduct(productBody).unwrap();
            console.log("data :",res)
        }
        catch(error){
            console.log(error)
        }
        // try{
        //     const res = await createProduct({newProduct:productBody,accessToken:accessToken}).unwrap();
        //     console.log("data :",res)
        // }
        // catch(error){
        //     console.log(error)
        // }
        // createProduct({
        //     newProduct: productBody,
        //     accessToken: accessToken,
        // });
        // console.log("New Product",productBody);
        // console.log("AccessToken",accessToken);
    }
    //handle update product
    const handleUpdateProductWithRTK = async()=>{
        const productUpdateBody = {
            name:"for women1"
        }
        // try{
        //     const res = await                   
        //     updateProduct({id:546,updatedProduct:productUpdateBody,accessToken:accessToken}).unwrap();
        //     console.log("data :",res)
        // }
        // catch(error){
        //     console.log(error)
        // }
        updateProduct({
            id: 546,
            updatedProduct: productUpdateBody,
            accessToken: accessToken,
        });
        console.log("Update Product",productUpdateBody);
    }
    

  return (
    <main className='grid h-screen place-content-center'>
      <h1 className='text-5xl text-pink-700'>Test Handle JWT</h1>
      <button onClick={handleLogin} className='my-4 p-4 bg-pink-600 rounded-xl text-gray-100 text-3xl'>Login</button>
      <button onClick={handlePartialUpdate} className='my-4 p-4 bg-pink-600 rounded-xl text-gray-100 text-3xl'>Update Patial</button>
      {unAuthorized && <button onClick={handleRefreshToken} className='my-4 p-4 bg-pink-600 rounded-xl text-gray-100 text-3xl'>Refresh Token</button>}
      <button onClick={handleLogout} className='my-4 p-4 bg-pink-600 rounded-xl text-gray-100 text-3xl'>Logout</button>
       <button onClick={handleCreateProductWithRTK} className='my-4 p-4 bg-pink-600 rounded-xl text-gray-100 text-3xl'>Create</button> 
      <button
                onClick={() =>
                    deleteProduct({
                        id: 547,
                        accessToken: accessToken,
                    })
                }
                className="text-4xl"
            >
                Delete Product with RTK
    </button>
    <button onClick={handleUpdateProductWithRTK} className='my-4 p-4 bg-pink-600 rounded-xl text-gray-100 text-3xl'>Update Product wiht RTK</button>


    </main>
  );
}
