@extends('layout.main')
@section('content')
	@if(Auth::check())
		 @include('home.auth')
	@else
		@include('home.guest')
	@endif
@stop

