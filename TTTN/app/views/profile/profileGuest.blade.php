@extends('layout.main')

@section('content')

<div class="row">
<div class="small-10 small-centered columns">

	<h3> {{ $user->username }} </h3>

	<br>
	Follower:{{ $user->follower->count() }} 
	<br>Following:{{ $user->following->count() }} 
			
	<br><h4>Các bộ từ đã thêm vào:</h4>

	<ul class="small-block-grid-2 medium-block-grid-3 large-block-grid-4">

	@foreach($user->set as $sets)
			
			<li>
				<a href="{{ URL::route('set-view',$sets->set_id) }}"><img width="200" height="200" src="../img/set/{{ $sets->set_id }}.jpg"/></a>
				<p>{{ $sets->set->title }} </p>
				Author: <a href="{{ URL::route('view-profile', $sets->set->author->username ) }}"> {{ $sets->set->author->username }}</a>
			</li>

	@endforeach

	</ul>

</div>
</div>

@stop