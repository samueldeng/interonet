<?php
//$array=array(array(array('a'=>'35','b'=>'12')),array('35','12'));
$test = "{\"0\":[{\"start\":\"15:15\",\"end\":\"16:00\"},{\"start\":\"17:00\",\"end\":\"18:00\"}]}";
//echo json_encode($array);
setcookie("array",$test);
?>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
</head>
<body>


<button type="button"  name="admin1" class="btn" onclick="test()">test</button>
<script type="text/javascript">

function test()
{
    var s = getCookie("array");
     var ss = eval('('+s+')');
   // var sss = eval('('+ss[0]+')');
var sss = Number(ss[0][0].start.substr(0,2));
    var sss2 = sss+1;
    alert(sss2) ;
}






        function getCookie(c_name)
        {
            if (document.cookie.length>0)
            {
                var c_start=document.cookie.indexOf(c_name + "=");
                if (c_start!=-1)
                {
                    c_start=c_start + c_name.length+1;
                   var  c_end=document.cookie.indexOf(";",c_start);
                    if (c_end==-1) c_end=document.cookie.length;
                    return unescape(document.cookie.substring(c_start,c_end));
                }
            }
            return "";
        }


</script>
</body>
</html>