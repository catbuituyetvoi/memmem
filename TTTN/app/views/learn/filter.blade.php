@extends('layout.main')

@section('title','Learning')

@section('content')
	<h2>Filter</h2>
	<div class="row">
	<div class="learning small-8 small-centered columns" type="filter">
		<div class="row">
			<div class="filter" word-count="{{{ $object->word->count() }}}">
			</div>
		</div>
		<br><br><br>

		
	</div>
	</div>

@stop