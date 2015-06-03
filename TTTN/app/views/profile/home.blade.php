@extends('layout.main')

@section('content')

<div class="row">
<div class="small-10 small-centered columns">
	
	<br>
	Follower:{{ User::find(Auth::id())->follower->count() }} 
	<br>Following:{{ User::find(Auth::id())->following->count() }} 


	<br>Các bộ từ đã thêm vào:

<ul class="small-block-grid-2 medium-block-grid-3 large-block-grid-4">

	@foreach( User::find(Auth::id())->set as $sets)
			
			<li>
				<a href="{{ URL::route('set-view',$sets->set_id) }}"><img width="200" height="200" src="../img/set/{{ $sets->set_id }}.jpg"/></a>
				<p>{{ $sets->set->title }} </p>
			</li>

	@endforeach

	<br>Các bộ từ được tạo:

</ul>

</div>
</div>

@stop