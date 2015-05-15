@extends('layout.main')

@section('content')
{{ Session::get('param')}}

<div class="row">
<div class="whiteBg small-10 small-centered columns">

<div class="row">

<div class="small-4 columns">
	<br>
	<img width="100" height="100" src="../img/set/{{{ $set->id }}}.jpg"/>
	<br> 
	<h3 class="darkGray text-center">{{ $set->title }}</h3>
	<br>
	 <a class="right" href=" {{ URL::route('view-profile', $set->author->username) }} ">{{ $set->author->username }}</a> 
	 <br> 
	 <br>
	  <a class="button " href="{{ URL::route('set-add',$set->id) }}">Thêm bộ từ này</a><br>
	 {{  $set->desc }} 


</div>

<div class="small-8 columns">

	<br>
	<h4 class="darkGray">Chủ đề trong bộ từ</h4>
	<div class="darkLine"></div>

	<div class="guestObjectList">
	@foreach($set->object as $object)


	<div class="row">
		<div class="small-4 columns">
			<img class="objectThumb" src="../img/object/{{ $object->id }}/thumb.jpg" alt="" >
		</div>
		<div class="small-8 columns">
	 	 <h5 class="darkGray"> <b> {{ $object->title }} </b></h5>
	 	 <p class="lightGray"> {{ $object->desc }} </p>
	 	 </div>
	 
	 </div>
	 <br>

	@endforeach
	</div>
	
	@if(Auth::id() == $set->author_id)

	<a class="button" href="{{ URL::route('object-add-get',$set->id)}}">Thêm chủ đề</a>

	@endif

	</div>




</div>


</div>

</div>
</div>
@stop
