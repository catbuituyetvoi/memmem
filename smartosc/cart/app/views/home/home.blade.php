@extends('layout.main')

@section('title','Home page')

@section('content')
	
	<div class="row">
	<div class="small-10 small-centered columns">
<br><br>

	<ul class="product small-block-grid-2 medium-block-grid-3 large-block-grid-4">

		
		@foreach($productList as $product)

		<li>
			
			<h3>
				<a href="{{ URL::route('product-view',$product['id']) }}">{{ $product["name"] }}</a>
			</h3>
			<p>
				{{ $product["price"] }}
			</p>
			<p>
				{{ $product["brand"] }}
			</p>

		</li>	

		@endforeach

	</ul>

	</div>
	</div>

@stop