<div id="popupMenuWrapper">

		<div class="popup-user-info">
			<div class="row">
				<div class="small-4 columns">
					<div class="popup-avatar border-round">
						{{ HTML::image('img/97.jpg') }}
					</div>
				</div>
				<div class="small-8 columns">
				 {{ Auth::user()->username }}
				</div>
			</div>
			</div>
	<ul class="popup-menu-icon-wrap small-block-grid-2 medium-block-grid-3 large-block-grid-4">

		<li>
			Tiến độ học tập
		</li>
		<li>
			Tham gia lớp học
		</li>
	</ul>

	<div class="row">
		<div class="small-12 columns text-right" id="logoutButton">
			<a href={{ URL::route('user-sign-out') }} class="button alert">Đăng xuất</a>
		</div>
	</div>
</div>