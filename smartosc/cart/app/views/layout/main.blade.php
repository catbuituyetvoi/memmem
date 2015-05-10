<!DOCTYPE html>
<html>
<head>
	@include('include/head')
</head>
<body>
<div class="marketing off-canvas-wrap" data-offcanvas="">

		<header>
			@include('include/navBar')
		</header>

		@if (Session::has('message'))
		<div class="row ">
   			<div class=" message small-4 small-centered columns">{{ Session::get('message') }}
   			</div>
   		</div>
   		<br>
		@endif

		<div class="main">

			@yield('content')
		</div>

	</div>
</body>
</html>