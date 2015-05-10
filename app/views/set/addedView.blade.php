@extends('layout.main')
@section('content')

<div class="row">
<br>
<br>
	<div class="small-10 small-centered columns">
		<div class="row">

			<div class="small-3 columns">
				<img width="100" height="100" src="../img/set/{{{ $set->id }}}.jpg"/>
				
			</div>

			<div class="small-9 columns">
				<b> {{ $set->title }} </b>
				 <br> Tác giả: <a href=" {{ URL::route('view-profile', $set->author->username) }} ">{{ $set->author->username }}</a> <br>
			
			</div>

		</div>
	</div>
</div>

<div class="row">
<div class="medium-8 small-12 columns">

	<br>  <a class="button" href="{{ URL::route('object-add-get',$set->id) }}">Thêm chủ đề </a>
	<br>

	@if(isset($currentLearningObject))
	
	Đang học: <h4><b>{{  $currentLearningObject->title }}</b></h4>
	<br>
	<a class="button alert" href="{{ URL::route('set-learn', $currentLearningObject->id) }}">Học bài</a>

	<ul class="small-block-grid-2 medium-block-grid-3 large-block-grid-4">
	
	@foreach($currentLearningObject->word as $words)
	
	<li class="setAddedViewWordBorder">

		<img width="100" height="100" src="../img/object/{{ $currentLearningObject->id }}/{{ $words->id  }}.jpg" alt="">
		{{ $words->key }} - {{ $words->value }}

	</li>

	@endforeach


	@endif

	</ul>
</div>

<div class="medium-4 small-12 columns">

	<h4 class="objectListTitle"> chủ đề </h4>
	@foreach($set->object as $object)
			
			<img width="200" height="200" src="../img/object/{{ $object->id }}/thumb.jpg" alt="">
	 	<br> 
	 		<div class="setAddedViewObjectTitle"> {{ $object->title }}
	 		 </div>
	 
	 	 	{{ $object->desc }}
		<br> 
 			<a class="button success" href="{{ URL::route('word-add-get',$object->id) }}">Thêm từ mới </a>
 			<a class="button alert" href="{{ URL::route('set-learn', $object->id) }}">Học</a>
		<br>
	@endforeach

</div>

</div>
@stop
