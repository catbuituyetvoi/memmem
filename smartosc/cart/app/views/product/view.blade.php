@extends('layout.main')
@section('content')

<div class="row">
<div class="small-6 small-centered columns">

	
	<h3> Info about {{ $targetProduct["name"] }}: </h3>

	<p>Price: {{ $targetProduct["price"] }}</p>
	<p>Brand: {{ $targetProduct["brand"] }}</p>

	<p><a class="button success" href="{{ URL::route('product-add-to-cart', $targetProduct['id'] ) }}">Add to Cart</a>
	
	
</div>
</div>

@stop