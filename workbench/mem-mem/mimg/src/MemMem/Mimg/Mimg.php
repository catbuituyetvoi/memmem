<?php namespace MemMem\Mimg;
 
class Mimg {
	 
	//Upload set thumbnail
  	//The set thumbnail will store at
  	//Example: img/set/setId.jpg
  	/**
	 * upload Set Thumbnail
	 *
	 * @param  $img move from Browser
	 * @param  $setId
	 * @return Void
	 */
  	public static function uploadSetThumbnail($img,$setId)
  	{
  		//Get temporary image ready to upload
	   	$tmp = $img["tmp_name"];
	  	move_uploaded_file($img["tmp_name"], public_path()."/img/set/".$setId.".jpg");
  	}
  	//Upload Object thumbnail
  	//The Object thumbnail will store at
  	//Example: img/object/222/thumb.jpg

  	public static function uploadObjectThumbnail($img,$objectId)
  	{
  		//Create a folder named as setId
	   	if (!file_exists( public_path().'/img/object/'.$objectId)) {
    		mkdir( public_path().'/img/object/'.$objectId, 0777, true);
		}
  		//Get temporary image ready to upload
	   	$tmp = $img["tmp_name"];
	  	move_uploaded_file($img["tmp_name"], public_path()."/img/object/".$objectId."/thumb.jpg");
  	}
  	//Upload word thumbnail
  	//The word thumbnail will store at
  	//Example: img/object/222/wordId.jpg
  	public static function uploadWordThumbnail($img,$objectId,$wordId)
  	{
  		//Get temporary image ready to upload
	   	$tmp = $img["tmp_name"];
	  	move_uploaded_file($img["tmp_name"], public_path()."/img/object/".$objectId."/".$wordId.".jpg");
  	}

 	private  static function resize_images($file, $w, $h, $crop=FALSE) 
  	{
	    list($width, $height) = getimagesize($file);
	    $r = $width / $height;
	    if ($crop) 
	    {
	        if ($width > $height) 
	        {
	            $width = ceil($width-($width*abs($r-$w/$h)));
	        }
	        else 
	        {
	            $height = ceil($height-($height*abs($r-$w/$h)));
	        }
	        $newwidth = $w;
	        $newheight = $h;
	    }
	     else 
	     {
	        if ($w/$h > $r)
	        {
	            $newwidth = $h*$r;
	            $newheight = $h;
	        } 
	        else
	        {
	            $newheight = $w/$r;
	            $newwidth = $w;
	        }
	    }

	    $src = imagecreatefromjpeg($file);
	    $dst = imagecreatetruecolor($newwidth, $newheight);
	    imagecopyresampled($dst, $src, 0, 0, 0, 0, $newwidth, $newheight, $width, $height);

	    return $dst;
	}
}