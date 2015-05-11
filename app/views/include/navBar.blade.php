<div class="contain-to-grid">

@if(Auth::check())
	<nav class="topBar top-bar" data-topbar role="navigation">
		<ul class="title-area">
		    <li class="name">
		      <h1><a href="{{ URL::route('home') }}">MemMem</a></h1>
		    </li>
		    <!-- Remove the class "menu-icon" to get rid of menu icon. Take out "Menu" to just have icon alone -->
		    <li class="toggle-topbar menu-icon"><a href="#"><span>Menu</span></a></li>
	  </ul>
		<section class="top-bar-section">
	    <ul class="right">
	    		<li>
	    			<a href="{{ URL::route('set-create') }}">Tạo bộ từ mới</a>
	    		</li>
			      <li class="divider"></li>
			      <li>
			        <a href="{{ URL::route('view-profile',Auth::user()->username) }}">Profile</a>
			      </li>

			      <li class="divider"></li>
			      <li id="popupMenuButton">
			        <a href="#">*</a>
			      </li>

			    	 @include('include.popupMenu')
			</ul>
	  	</section>
	</nav>
	
@else

	<nav class="topBar top-bar docs-bar hide-for-small" data-topbar>
		<ul class="title-area">
		    <li class="name">
		      <h1><a href="{{ URL::route('home') }}">MemMem</a></h1>
		    </li>
	  	</ul>
		<section class="top-bar-section">
	    	<ul class="right">
			      Hỗ trợ: 01679.001.005
			</ul>
	  	</section>
	</nav> 
	<nav class="tab-bar show-for-small">
	  <a class="left-off-canvas-toggle menu-icon">
	    <span>MemMem</span>
	  </a>
	</nav>

@endif

</div>