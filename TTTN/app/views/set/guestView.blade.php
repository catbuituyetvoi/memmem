@extends('layout.main')

@section('content')
{{ Session::get('param')}}

<div class="row">
<div class="small-10 small-centered columns">

	<img width="100" height="100" src="../img/set/{{{ $set->id }}}.jpg"/>
	<br> 
	{{ $set->title }}
	<br>
	Tác giả: <a href=" {{ URL::route('view-profile', $set->author->username) }} ">{{ $set->author->username }}</a> 
	 <br> 
	 {{  $set->desc }} 
	 <br>
	Tạo lúc: {{ $set->created_at->format('d.m.Y')   }}
	<br>

	 <a class="button " href="{{ URL::route('set-add',$set->id) }}">Thêm bộ từ này</a><br>
	Tạo luc:{{ $set->created_at }}
	<br>
	
	<h4>Chủ đề trong bộ từ</h4>
	@foreach($set->object as $object)

	<div class="row">
		<div class="small-4 columns">
			<img class="objectThumb" src="../img/object/{{ $object->id }}/thumb.jpg" alt="" >
		</div>
		<div class="small-8 columns">
	 	 <p> <b> {{ $object->title }} </b></p>
	 	 <p> {{ $object->desc }} </p>
	 	 </div>
	 
	 </div>
	 <br>

	@endforeach
	
	@if(Auth::id() == $set->author_id)

	<a class="button" href="{{ URL::route('object-add-get',$set->id)}}">Thêm chủ đề</a>

	@endif

	</div>

</div>
</div>
@stop
