<!DOCTYPE html>
<html>
<head>
		<!-- Global site tag (gtag.js) - Google Analytics -->
		<script async src="https://www.googletagmanager.com/gtag/js?id=UA-115795339-1"></script>
		<script>
			window.dataLayer = window.dataLayer || [];
			function gtag(){dataLayer.push(arguments);}
			gtag('js', new Date());

			gtag('config', 'UA-115795339-1');
		</script>
	<link type="text/css" rel="stylesheet" href="scraperstyle.css" />
</head>
<body>
<h1>Return to: <a href="../index.html">jeffbcarter home</a></h1>
<p>See original slideshow at <a href="http://americanupbeat.com/rarest-historical-photos-ever-captured/">American Upbeat: The Rarest Historical Photos Ever Captured</a><p>
<?php
set_time_limit(1200);
include_once 'c:\xampp\php\simple_html_dom.php';

function urlOk($url) {
    $headers = @get_headers($url);
    if($headers[0] == 'HTTP/1.1 200 OK') return true;
    else return false;
}
	echo '<h1>The Rarest Historical Photos Ever Captured</h1>';
	$url = 'http://americanupbeat.com/rarest-historical-photos-ever-captured/';
	if (urlOk($url)){
		$html = file_get_html($url);
		foreach($html->find('img[class^=aligncenter]') as $element) {
					echo '<img src='.$element->src .'><br>'; 
			}
	}	
	
	for ($i = 2;$i<48;$i++){
		$fullurl = $url.$i."/";
		      if (urlOk($fullurl)) {
           $html = file_get_html($fullurl); 		
			foreach($html->find('img[class^=aligncenter]') as $element) {
					echo '<img src='.$element->src .'><br>'; 
			}
       } else {
         echo 'Error: URL '.$fullurl.' doesn\'t exist.<br />';
       }
	}
?>
</body>
</html>