@extends('layout.main')

@section('title', Auth::user()->username)

@section('content')

<div class="row">
<div class="small-10 small-centered columns">


@if($activitiesList != null)
	
	<h4>Activities</h4>

	@foreach($activitiesList as $activities)
		
		@if($activities->action == 1)

		<br>{{  Mtime::getTime($activities->created_at) }} -

			<a href="{{ URL::route('view-profile',$activities->owner->username) }}">{{ User::find( $activities->user_id )->username }}</a>

			 đã thêm bộ từ {{ Set::find( $activities->object_id )->title }} vào bộ sưu tập.

		@elseif($activities->action == 2)

		<br>{{  Mtime::getTime($activities->created_at) }} - 

			
			@if( $activities->object_id == Auth::id() )

			<a href="{{ URL::route('view-profile',$activities->owner->username) }}">{{ User::find( $activities->user_id )->username }}</a>

			 cũng đang theo dõi bạn. Hãy chia sẻ với nhau những kiến thức mới nhất nhé!!!
			
			@else

				<a href="{{ URL::route('view-profile',$activities->owner->username) }}">{{ User::find( $activities->user_id )->username }}</a>

				đang theo dõi 
				<a href="{{ URL::route('view-profile',User::find( $activities->object_id )->username ) }}">{{ User::find( $activities->object_id )->username   }}</a>

			@endif

		@else

		<br>{{  Mtime::getTime($activities->created_at) }} - 

			<a href="{{ URL::route('view-profile',$activities->owner->username) }}">{{ User::find( $activities->user_id )->username }}</a>

			tạo bộ từ mới: <a href="{{ URL::route('set-view', $activities->object_id ) }}">{{ Set::find( $activities->object_id )->title   }}</a>

		@endif

	@endforeach

@endif

<br><br>

@if($setLearned != null)

	<h2>Chủ đề đang học</h2>
	
	<ul class="small-block-grid-2 medium-block-grid-3 large-block-grid-4">

	@foreach($setLearned as $set)
	
	<li>
		@if($set->course_id != 0)

			<br> <a href="{{ URL::route('set-view', $set->set_id) }}"><img width="200" height="200" src="img/set/{{{ $set->set_id }}}.jpg"/></a> 
			<p>{{ Object::find($set->object_id)->title }}</p>

			<br>Author: {{ Set::find($set->set_id)->author->username }}

			<a class="button" href="{{ URL::route('set-learn',$set->object_id) }}">Học tiêp</a>

		@endif
	</li>

	@endforeach
	</ul>

@else

Chưa thêm bộ từ nào để học, hãy tìm và học một chủ đề!!!

@endif

@if($setAdded != null)

	<h2>Bộ từ được thêm vào</h2>

	<ul class="small-block-grid-2 medium-block-grid-3 large-block-grid-4">

	@foreach( $setAdded as $set)
	

	<li>
		<a href="{{ URL::route('set-view',$set->set_id) }}">
			<img width="200" height="200" src="img/set/{{ $set->set_id }}.jpg"/>
		</a>
		<br> <a href="{{ URL::route('set-view', $set->set_id) }}">{{ $set->title }}</a> 

		<br>Author: {{ Set::find($set->set_id)->author->username }}
		
		
	</li>

	@endforeach
	</ul>

@else

Chưa thêm bộ từ nào vào bộ sưu tập của bạn, hãy tìm, thêm và trải nghiệm thôi ^^


@endif



	<h2> Bộ từ được chia sẻ</h2>

	<ul class="small-block-grid-2 medium-block-grid-3 large-block-grid-4">


	@foreach( Set::all()  as $set)

	<li>
				
		<a href="{{ URL::route('set-view',$set->id) }} ">
			<img width="200" height="200" src="img/set/{{ $set->id }}.jpg"/>
		</a>
		<p>{{ $set->title }} </p>

	</li>

	@endforeach

	</ul>


</div>
</div>
@stop