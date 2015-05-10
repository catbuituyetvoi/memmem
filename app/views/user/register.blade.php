@extends('layout.main')
@section('content')
<div class="row">

<div class="small-6 small-centered columns">

	<form action="{{ URL::route('user-register-post') }}" method="post">

		<div class="field">
			Email: <input type="text" name="email" value="{{ Input::old('email') }}"> 
			@if($errors->has('email'))
				{{ $errors->first('email')}}
			@endif	
		</div>

		<div class="field">
			Tên đăng nhập: <input type="text" name="username" value="{{ Input::old('username') }}"> 
			@if($errors->has('username'))
				{{ $errors->first('username')}}
			@endif
		</div>

		<div class="field">
			Mật khẩu: <input type="password" name="password"> 
			@if($errors->has('password'))
				{{ $errors->first('password')}}
			@endif
		</div>

		<div class="field">
			Nhập lại mật khẩu: <input type="password" name="password_again"> 
			@if($errors->has('password_again'))
				{{ $errors->first('password_again')}}
			@endif
		</div>

		<input class="button success" type="submit" value="Tạo tài khoản">
			{{ Form::token() }}
	</form>

</div>
</div>
@stop