<nav>
	<ul>
		<li> <a href="{{ URL::route('home') }}">Trang chủ </a></li>

		@if(Auth::check())
		
			Hello, {{ Auth::user()->username }} {{{Auth::id()}}}.
			
			<li><a href="{{ URL::route('user-sign-out') }}">Thoát</a></li>	
		@else
			<li><a href="{{ URL::route('user-login') }}">Đăng nhập</a></li>
		@endif
	</ul>
</nav>