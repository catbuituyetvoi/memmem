<!DOCTYPE html>
<html>
<head>
	@include('include/head')
</head>
<body>


	
			@include('include/navBar')
	

		@if (Session::has('message'))

		<div class="row ">
   			<div  class="message small-4 small-centered columns">{{ Session::get('message') }}
   			</div>
   		</div>
   		<br>
   		
		@endif

		<div class="main">
			@yield('content')
		</div>


</body>
</html>