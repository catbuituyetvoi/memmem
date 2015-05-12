@extends('layout.main')

@section('title')
		{{ $object->title }} - learning
@endsection

@section('content')
<br><br>
	<div class="row">
		<div class="small-12 small-centered columns">
			
			<div class="row">
				<div class="small-4 columns">
					<h3>{{ $object->title }}</h3>
				</div>
				<div class="small-4 columns">
					<i class="audioMute fi-volume size-36"></i>
				</div>

				<audio id="wordAudio" class="hide" controls preload="none">
   					<source src="../audio/mautrang.mp3" type="audio/mpeg">
				</audio>
				
			</div>
			
			<div class="learningWrapper">
			<div id="notify">
					<div id="notifyBlock"><span id="notifyMessage">Notify</span></div>
			</div>
				<div class="learning" type="learning">
		
					<div id="loading">
						<img src="../img/loading.gif">
					Loading. . .
					</div>

				</div>
			</div>
		</div>
	</div>

@endsection
