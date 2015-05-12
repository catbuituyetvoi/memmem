@extends('layout.main')
@section('content')

<div class="row">
<div class="medium-6 small-10 small-centered columns rightLogin homeRight">

	
	<br><br>
	<form class="form" action="{{ URL::route('user-login-post') }}" method="post">
	 <div class="small-8 small-centered columns">
			<div class="row ">
			
         		<input type="text" name="username" placeholder="Tên đăng nhập">
      
				@if($errors->has('username'))
					{{ $errors->first('username')}}
				@endif
		
		</div>
		
		<div class="row">
        <input type="password" name="password" placeholder="Mật khẩu">
      
				@if($errors->has('password'))
					{{ $errors->first('password')}}
				@endif
		
		</div>
		<div class="row">
		
				<div class="medium-6 small-12 columns right">
					<button type="submit" class="success small right">Đăng nhập</button>
				</div>
				<div class="medium-6 small-12 columns right">
					<a href="#" class="left forgotPassword">Quên mật khẩu?</a>
		 		</div>
			</div>
	</div>

		{{ Form::token() }}
	</form>

</div>
</div>

@stop