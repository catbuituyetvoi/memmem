@extends('layout.main')
@section('content')

	Creat new Word for this Object, <a href="{{ URL::route('object-view', $objectId) }}"> Quay lại bộ từ</a>
	
	{{ Session::get('message')  }}

	<form class="form" action="{{ URL::route('word-add-post',$objectId) }}" method="post" enctype="multipart/form-data">
	
		<div class="row ">
			 <div class="small-8 small-centered columns">
         		<input type="text" name="key" placeholder="Từ vựng">
      
				@if($errors->has('key'))
					{{ $errors->first('key')}}
				@endif

			</div>
		</div>
		
		<div class="row">
			<div class="small-8  small-centered columns">
         		<input type="text" name="value" placeholder="Nghĩa">

				@if($errors->has('value'))
					{{ $errors->first('value')}}
				@endif

			</div>
		</div>

		<div class="row">
			<div class="small-8  small-centered columns">
         		<input type="text" name="attributes" placeholder="Loại từ">

				@if($errors->has('attributes'))
					{{ $errors->first('attributes')}}
				@endif

			</div>
		</div>
		
		<div class="row">
			<div class="small-8  small-centered columns">
         		<input type="text" name="romaji" placeholder="Phiên âm Romaji">

				@if($errors->has('pronounciation'))
					{{ $errors->first('pronounciation')}}
				@endif

			</div>
		</div>

		<div class="row">
			<div class="small-8  small-centered columns">
         		<input type="text" name="phonetic" placeholder="Phonetic: phiên âm quốc tế">

				@if($errors->has('phonetic'))
					{{ $errors->first('phonetic')}}
				@endif

			</div>
		</div>

		<div class="row">
			<div class="small-8  small-centered columns">
         		<input type="text" name="synonyms" placeholder="Từ đồng nghĩa">

				@if($errors->has('synonyms'))
					{{ $errors->first('synonyms')}}
				@endif

			</div>
		</div>

		<div class="row">
			<div class="small-8  small-centered columns">
         		<textarea name="definition" placeholder="Định nghĩa"></textarea>
			</div>
		</div>

		<div class="row">
			<div class="small-8  small-centered columns">
         		<textarea name="definitionVi" placeholder="Dịch Định nghĩa"></textarea>
			</div>
		</div>

		<div class="row">
			<div class="small-8  small-centered columns">
         		<textarea name="example1" placeholder="Ví dụ 1"></textarea>
			</div>
		</div>

		<div class="row">
			<div class="small-8  small-centered columns">
         		<textarea name="example1Vi" placeholder="dịch Ví dụ 1"></textarea>
			</div>
		</div>

		<div class="row">
			<div class="small-8  small-centered columns">
         		<textarea name="example2" placeholder="Ví dụ 2"></textarea>
			</div>
		</div>


		<div class="row">
			<div class="small-8  small-centered columns">
         		<textarea name="example2Vi" placeholder="dịch Ví dụ 2"></textarea>
			</div>
		</div>

		<div class="row">
			<div class="small-8  small-centered columns">
         		<textarea name="example3" placeholder="Ví dụ 3"></textarea>
			</div>
		</div>

		<div class="row">
			<div class="small-8  small-centered columns">
         		<textarea name="example3Vi" placeholder="dịch Ví dụ 3"></textarea>
			</div>
		</div>

		<div class="row">
			<div class="small-8  small-centered columns">
         		<textarea name="origin" placeholder="Nguồn gốc"></textarea>
			</div>
		</div>

		<div class="row">
			<div class="small-8  small-centered columns">
         		<textarea name="similar" placeholder="Từ gần giống"></textarea>
			</div>
		</div>

		<input type="file" name="wordThumb" id="fileToUpload"><br>
		
		<div class="row">
			<div class="small-8 small-centered columns">
		 		<button type="submit" class="btn btn-default right">Thêm từ mới</button>
			</div>
		</div>

		{{ Form::token() }}
	</form>
@stop