<div id="popupLearningWrapper" class="topPopup">

	<h5 class="inheritColor bold">Chủ đề đang học</h5>
	<div class="darkLine"></div>

	<ul class="darkGray small-block-grid-1 medium-block-grid-2 large-block-grid-3">

	<?php $setLearned = SetCollection::whereRaw('user_id = ? and  learned = 1', array(Auth::id()))
									->get(); 
		?>

	@if($setLearned != null)

			@foreach($setLearned as $set)
			
			<li>
				@if($set->course_id != 0)
					
					<div class="popup-avatar" style="background: url( {{ URL::asset('img/set/'.$set->set_id.'.jpg') }}) no-repeat;">
					
				@endif
			</li>

			@endforeach

		@else

		Chưa thêm bộ từ nào để học, hãy tìm và học một chủ đề!!!

		@endif
		
	</ul>

	<div class="row">
		<div class="small-12 columns text-right">
			<a href={{ URL::route('user-sign-out') }} class="button alert">Khám phá các chủ đề khác<i class="fi-magnifying-glass padding-left-10"></i></a>
		</div>
	</div>
</div>