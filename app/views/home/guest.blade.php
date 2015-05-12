@extends('layout.main')
@section('content')
	<div class="row">
		<div class="medium-3 small-12 columns right homeRight">
			<div class="rightLogin">

				<p class="text-center darkGreen size-20">Đăng nhập</p>
				<form  action="{{ URL::route('user-login-post') }}" method="post">
	
					<div class="row ">
						 <div class="small-12 small-centered columns">
			         		<input type="text" name="username" placeholder="Tên đăng nhập">
			      
							@if($errors->has('username'))
								{{ $errors->first('username')}}
							@endif
						</div>
					</div>
					
					<div class="row">
						<div class="small-12  small-centered columns">
			         		<input type="password" name="password" placeholder="Mật khẩu">
			      
							@if($errors->has('password'))
								{{ $errors->first('password')}}
							@endif
						</div>
					</div>
					<div class="row">
						<div class="small-12 columns">
					 		<input type="submit" class=" small-12 columns button success radius" value="Đăng nhập">
						</div>
					</div>

					{{ Form::token() }}
				</form>
				<p>hoặc</p>
				<a class="button alert" href="{{ URL::route('user-register') }}">Tạo tài khoản và học ngay!</a>
			</div>
		</div>

		<div class="medium-9 small-12 columns">
			
			<h2> Bộ từ được chia sẻ</h2>
			
			<ul class="small-block-grid-2 medium-block-grid-3 large-block-grid-4">

			@foreach( Set::all()  as $set)
			
			<li>
				<a href="{{ URL::route('set-view',$set->id) }} "><img width="200" height="200" src="img/set/{{{ $set->id }}}.jpg"/></a>
				<p>{{ $set->title }} </p>
				Author: <a href="{{ URL::route('view-profile', $set->author->username ) }}"> {{ $set->author->username }}</a>
			</li>

			@endforeach

			</ul>
		</div>
	</div>
@stop
