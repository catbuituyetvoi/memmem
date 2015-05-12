<div id="popupMenuWrapper">

		<div class="popup-user-info">
			<div class="row">
				<div class="small-4 columns no-padding">
					<div class="popup-avatar" style="background: url( {{ URL::asset('img/97.jpg') }}) no-repeat;">
					
					</div>
				</div>
				<div class="small-8 columns">
				 {{ Auth::user()->username }}
				</div>
			</div>
			</div>
	<ul class="popup-menu-icon-wrap small-block-grid-1 medium-block-grid-2 large-block-grid-3">

		<li>
			<p class="text-center"><i class="fi-graph-bar size-48"></i></p>
			Tiến độ học tập
		</li>
		<li>
			<p class="text-center"><i class="fi-torsos-all size-48"></i></p>
			Tham gia lớp học
		</li>
		<li>
		<p class="text-center"><i class="fi-clipboard-notes size-48"></i></p>
			Kiểm tra
		</li>
		<li>
			<p class="text-center"><i class="fi-die-three size-48"></i></p>
			Chơi game
		</li>
		<li>
			<p class="text-center"><i class="fi-play-video size-48"></i></p>
			Video
		</li>
		<li>
			<p class="text-center"><i class="fi-music size-48"></i></p>
			Music
		</li>
		<li>
			<p class="text-center"><i class="fi-page-multiple size-48"></i></p>
			Trợ giúp
		</li>
		
	</ul>

	<div class="row">
		<div class="small-12 columns text-right" id="logoutButton">
			<a href={{ URL::route('user-sign-out') }} class="button alert">Đăng xuất<i class="fi-arrow-right padding-left-10"></i></a>
		</div>
	</div>
</div>