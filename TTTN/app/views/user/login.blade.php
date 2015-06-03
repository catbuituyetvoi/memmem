@extends('layout.main')
@section('content')

<div class="row">
<div class="small-6 small-centered columns">

	
	<br><br>
	<form class="form" action="{{ URL::route('user-login-post') }}" method="post">
	
		<div class="row ">
			 <div class="small-8 small-centered columns">
         		<input type="text" name="username" placeholder="Tên đăng nhập">
      
				@if($errors->has('username'))
					{{ $errors->first('username')}}
				@endif
			</div>
		</div>
		
		<div class="row">
			<div class="small-8  small-centered columns">
         		<input type="password" name="password" placeholder="Mật khẩu">
      
				@if($errors->has('password'))
					{{ $errors->first('password')}}
				@endif
			</div>
		</div>
		<div class="row">
			<div class="small-8 small-centered columns">
		 		<button type="submit" class="btn btn-default right">Đăng nhập</button>
			</div>
		</div>

		{{ Form::token() }}
	</form>

</div>
</div>

@stop