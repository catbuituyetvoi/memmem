<?php
class ProductController extends BaseController {

	/* Viewing the form */
	public function view($productId) 
	{
		/**
		 * get Id of product from Route
		 *
		 * @var int
		 */
		$data["productId"] = $productId;
		/**
		 * List of product from Session
		 *
		 * @var array
		 */
		$productList = Session::get('productList');
		/**
		 * product choosed to view
		 *
		 * @var array
		 */
		$targetProduct = array();

		foreach($productList as $id => $product)
		{
			if($id == $productId - 1)
				$targetProduct = $productList[$id];
		}
		/**
		 * Send target Product with View
		 *
		 * @var array
		 */
		$data["targetProduct"] = $targetProduct;

		 return View::make('product.view',$data);
	}
}
			
		