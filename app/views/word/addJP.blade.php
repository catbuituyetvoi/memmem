@extends('layout.main')
@section('content')

	Creat new Word for this JP Object, <a href="{{ URL::route('object-view', $objectId) }}"> Quay lại bộ từ</a>
	
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
         		<input type="text" name="kanjiMean" placeholder="Nghĩa hán tự">

				@if($errors->has('kanjiMean'))
					{{ $errors->first('kanjiMean')}}
				@endif

			</div>
		</div>

		<div class="row">
			<div class="small-8  small-centered columns">
         		<input type="text" name="englishMean" placeholder="NGhĩa English">

				@if($errors->has('englishMean'))
					{{ $errors->first('englishMean')}}
				@endif

			</div>
		</div>

		<div class="row">
			<div class="small-8  small-centered columns">
         		<input type="text" name="hiragana" placeholder="hiragana">

				@if($errors->has('hiragana'))
					{{ $errors->first('hiragana')}}
				@endif

			</div>
		</div>
		
		<div class="row">
			<div class="small-8  small-centered columns">
         		<input type="text" name="romaji" placeholder="Phiên âm Romaji">

				@if($errors->has('romaji'))
					{{ $errors->first('romaji')}}
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
         		<textarea name="exampleJp" placeholder="Ví dụ in Japan"></textarea>
			</div>
		</div>

		<div class="row">
			<div class="small-8  small-centered columns">
         		<textarea name="exampleEn" placeholder="English for Ví dụ "></textarea>
			</div>
		</div>


		<div class="row">
			<div class="small-8  small-centered columns">
         		<textarea name="exampleVi" placeholder="dịch Ví dụ "></textarea>
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