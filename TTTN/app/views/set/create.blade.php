@extends('layout.main')
@section('content')

<div class="row">
<div class="small-6 small-centered columns">

	Tạo bộ từ mới
	
	<form action="{{ URL::route('set-create-post') }}" method="post" enctype="multipart/form-data">

		<div class="field">
			Tên bộ từ : <input type="text" name="ipTitle" value="{{ Input::old('ipTitle') }}"> 
			@if($errors->has('ipTitle'))
				{{ $errors->first('ipTitle')}}
			@endif
		</div>

		<div class="field">
			Mô tả : <input type="text" name="ipDesc" value="{{ Input::old('ipDesc') }}"> 
			@if($errors->has('ipDesc'))
				{{ $errors->first('ipDesc')}}
			@endif
		</div>

		<div class="field">
			Ngôn ngữ: <input type="text" name="ipLanguage" value="{{ Input::old('ipLanguage') }}"> 
			@if($errors->has('ipLanguage'))
				{{ $errors->first('ipLanguage')}}
			@endif
		</div>

		<input type="file" name="setThumb" id="fileToUpload"><br>
		
		<input class="button success" type="submit" value="Tạo"/>
		{{ Form::token() }}
	</form>

</div>
</div>

@stop