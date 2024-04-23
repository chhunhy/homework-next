"use client";
import CardProduct from "@/components/card/CardProduct";
import { useAppSelector } from "@/redux/hooks";
import { useGetProductsQuery } from "@/redux/service/ecommerce";
import { useSession } from "next-auth/react";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ENDPOINT = "https://fakestoreapi.com/products/";

export default function Service() {
	const { data, error, isLoading, isFetching } = useGetProductsQuery({
        page: 1,
        pageSize: 10,
    });
	const state = useAppSelector((state) =>state);
	console.log("Global state :", state);
	console.log("data", data);
    console.log("error", error);
    console.log("isLoading", isLoading);

	
	const { data: session } = useSession();
	const [products, setProducts] = useState([]);
	const router = useRouter();
	

	useEffect(() => {
		fetch(ENDPOINT)
			.then((res) => res.json())
			.then((data) => setProducts(data));
	}, []);


	return (
		<>
		{session ? <div className="h-screen mt-6 container mx-auto grid grid-cols-5 grid-flow-row gap-4">
			{products.map((product: any, index) => (
				<CardProduct
					onClick={() => router.push(`/service/${product.id}`)}
					key={index}
					id={product.id}
					title={product.title}
					image={product.image}
					price={product.price}
				/>
			))}
		</div> : <div className="w-full h-screen flex flex-col justify-center items-center">
			Unauthorize!</div>}
		</>
	);
}
