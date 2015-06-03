@extends('layout.main')

@section('content')

<div class="row">
<div class="small-10 small-centered columns">

	<h3> {{ $user->username }} </h3>

	<br>
	Follower : {{ $user->follower->count() }} 
	<br>Following : {{ $user->following->count() }} 
	<br>
	<br>
	@if($isFollowing)

		<button class="btnFollowing green" onclick="follow(this,{{ $user->id }})">Đang theo dõi </button>
		<a href="user/follow/{{ $user->id }}">bỏ theo dõi</a>

	@else

		<button class="btnFollow" onclick="follow(this,{{ $user->id }})">Theo dõi</button>
		
	@endif
			
	<br><h4>Cac bộ từ đã thêm vào</h4>

	<ul class="small-block-grid-2 medium-block-grid-3 large-block-grid-4">

		@foreach($user->set as $sets)
				
				<li>
					<a href="{{ URL::route('set-view',$sets->set_id) }}">
						<img width="200" height="200" src="../img/set/{{ $sets->set_id }}.jpg"/>
					</a>

					<p>{{ $sets->set->title }} </p>
				</li>

		@endforeach

	</ul>

</div>
</div>

@stop