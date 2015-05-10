@extends('layout.main')
@section('content')

<div class="row">
	<div class="small-10 small-centered columns">
	
	@if(Session::has('cart'))
		
		<h3>Your cart</h3>

		<table>

		<tr>
	    <th scope="column">STT</th>
	    <th scope="column">Name</th>
	    <th scope="column">Price</th>
	    <th scope="column">Brand</th>
	    <th scope="column">Amount</th>
	    <th scope="column">Total</th>
	    <th scope="column">Delete</th>

	  	</tr>
	
		@foreach(Session::get('cart') as $product)

		<tr>
			<td>
				{{ $count++ }} 
			</td>
			<td>
				<a href="{{ URL::route('product-view',$product['id']) }}">{{ $product["name"] }}</a>
			</td>
			<td>
				{{ $product["price"] }}
			</td>
			<td>
				{{ $product["brand"] }}
			</td>
			<td>
				<input type="number" id="for{{ $product['id'] }}" value="{{  $product['amount'] }}">

				<a id="{{ $product['id'] }}"  class="update-item button tiny success round" href="{{ URL::route('cart-update-item',$product['id']) }}">Update</a>
			</td>
			<td>
				<input type="text" value="{{  $product['amount'] * $product['price'] }}">
			</td>
		
			<td>
				<a class="button tiny alert round" href="{{ URL::route('cart-delete-item',$product['id']) }}">Delete </a>
			</td>
			
		</tr>	

		@endforeach

		</table>
	@else
		
		<h2>No item was buyed in Cart!</h2>

	@endif

	</div>
	</div>

@stop