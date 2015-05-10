@extends('layout.main')

@section('title','Error unAuthorized ')

@section('content')
	<h2>Ban chua thêm bộ từ này</h2>
	<a class=" button" href="{{ URL::route('set-add',$object_id) }}">Them bộ từ này</a>
@stop