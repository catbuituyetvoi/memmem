@extends('layout.main')

@section('content')
	@foreach($user->following)
		{{{ $user->username }}}
	@endforeach
@stop