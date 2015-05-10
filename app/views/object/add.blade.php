@extends('layout.main')
@section('content')

<div class="row">
<div class="small-6 small-centered columns">

	Tạo chủ đề mới
	
	<form action="{{ URL::route('object-add-post',$setId) }}" method="post" enctype="multipart/form-data">

		<div class="field">
			Tên chủ đề : <input type="text" name="oTitle" value="{{ Input::old('oTitle') }}"> 
			@if($errors->has('oTitle'))
				{{ $errors->first('oTitle')}}
			@endif
		</div>

		<div class="field">
			Mô tả : <input type="text" name="oDesc" value="{{ Input::old('oDesc') }}"> 
			@if($errors->has('oDesc'))
				{{ $errors->first('oDesc')}}
			@endif
		</div>

		<input type="file" name="objectThumb" id="fileToUpload"><br>
		
		<input class="button success" type="submit" value="Tạo chủ đề"/>
		{{ Form::token() }}
	</form>

</div>
</div>

@stop