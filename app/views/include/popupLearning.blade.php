<div id="popupLearningWrapper" class="topPopup">

	<h5 class="inheritColor bold">Chủ đề đang học</h5>
	<div class="darkLine"></div>

	<ul class="darkGray small-block-grid-1 medium-block-grid-2 large-block-grid-3">



	@if( $count  )

			@foreach($learningObject as $object)
			
			<li>
						<a class="popup-avatar" style="background: url( {{ URL::asset('img/object/'.$object->object_id.'/thumb.jpg') }}) no-repeat;" href="{{ URL::route('object-view', $object->id ) }}">
						</a>
			</li>

			@endforeach

		@else

		Chưa học chủ đề nào

		@endif
		
	</ul>

	<div class="row">
		<div class="small-12 columns text-right">
			<a href={{ URL::route('user-sign-out') }} class="button alert">Khám phá các chủ đề khác<i class="fi-magnifying-glass padding-left-10"></i></a>
		</div>
	</div>
</div>