@extends('layout.main')

@section('content')

<div class="row">
<div class="profileGuest small-10 small-centered columns">

<div class="row">
		<div class="profileUserInfo medium-6 small-12 columns">

				<h3 class="profileUsername darkGray"> {{ $user->username }} </h3>

				<br>
				Follower : {{ $user->follower->count() }} 
				<br>Following : {{ $user->following->count() }} 
				<br>
				<br>
				<p class="text-center">
				@if( $isFollowing )
				
				
					<button class="btnFollowing green" onclick="follow(this,{{ $user->id }})">Đang theo dõi </button>
				
				@else

					<button class="btnFollow" onclick="follow(this,{{ $user->id }})">Theo dõi</button>
					
				@endif

				</p>
				<div class="profileRank row text-center">
						<div class="small-4 columns">
								110
						</div>
						<div class="small-4 columns">
								14/33
						</div>
						<div class="small-4 columns">
								249
						</div>
				</div>
	
				<br><h4>Bộ từ đang học:</h4>

				<ul class="small-block-grid-2 medium-block-grid-3 large-block-grid-4">

					@foreach($user->addedSet as $sets)
							
							<li>
								<a href="{{ URL::route('set-view',$sets->set_id) }}">
									<img width="200" height="200" src="../img/set/{{ $sets->set_id }}.jpg"/>
								</a>

								<p>{{ $sets->set->title }} </p>
							</li>

					@endforeach

				</ul>

		</div>
		<div class="profileUserWall medium-6 small-12 columns">
			<div class="small-12 profileNewStatus">
				<textarea placeholder="Hỏi một câu hỏi?"></textarea>
				<button class="right tiny">Đăng</button>
			</div>


		</div>

</div>


</div>
</div>

@stop