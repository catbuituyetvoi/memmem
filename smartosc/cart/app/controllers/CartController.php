<?php

 class CartController extends BaseController {
 	/**
		 * view Cart
		 *
		 * @param Item Id
		 * @return View
		 */
 	public function view()
 	{
 		$data["count"] = 1;

 		return View::make('cart.cart',$data);
 	}
	/* Viewing the form */
	public function addProduct($productId) 
	{
		$product = array();

		$productList = Session::get('productList');

		foreach($productList as $index => $item)
		{
			//If this product exist in List
			//Get information this product to $product
			if($item["id"] == $productId)
				$product = $productList[$index];
		}
		//Default of this product amount = 1
		$product["amount"]  = 1;

		//if Cart in Session is exists
		//Check if Product exists in cart to increase Amount by 1
		if( Session::has('cart') )
		{
			/**
			 * count increase 1 if found a product in List
			 *
			 * @var int
			 */
			$count = 0;
			/**
			 * get Cart from session
			 *
			 * @var array
			 */
			$cart = Session::get('cart');
			//Increase by 1 if this product exists in cart
			foreach( $cart as $stt => $item )
			{
				if( $item["id"] == $productId)
				{
					$cart[$stt]["amount"] += 1;

					$count++;
				}
					
			}
			//If product not exists in cart
			//count still 0
			//Push this product to Cart array
			if($count == 0)
			{
				array_push($cart,$product);
			}
			//Push to cart
			Session::put('cart',$cart);
		}
		//if Cart is null, push new product to cart
		else
		{
			$cart = array();
			array_push($cart,$product);

			Session::put('cart',$cart);
		}	

		return Redirect::back()
		 		->with('message','Successfully add to Cart!');
	}

	/**
		 * delete item in Cart
		 *
		 * @param Item Id
		 */
	public function deleteItem($itemId)
	{
		$cart = Session::get('cart');

		foreach($cart as $index => $item)
		{
			if($item["id"] == $itemId)
				unset($cart[$index]);
		}

		Session::put('cart', $cart);

		return Redirect::back();
	}


		public function updateItem($itemId)
		{
			//Get new amount to update
			$newAmount = $_GET["amount"];

			$cart = Session::get('cart');

			foreach($cart as $index => $item)
			{
				if($item["id"] == $itemId)
					$cart[$index]["amount"] = $newAmount;
			}

			Session::put('cart', $cart);

			return Redirect::back();
		}
}