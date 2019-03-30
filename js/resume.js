var para;
var paravalue;
var query=window.location.search.substring(1).split("?");
for(var i in query){
  para=query[i].split("=");
  paravalue=parseInt(para[1]);
}
var idb=window.indexedDB || window.mozIndexedDB || window.msIndexedDB ||window.webkitIndexedDB;
if(!idb in window){
  console.log("indexedDB is not supported");
}
//indexedDB creation
var request;
var store;
var open=idb.open("storeData",1);
console.log("IndexedDB is created");
open.onupgradeneeded=function (e) {
  var request=e.target.result;
  request.createObjectStore("formdata",{keyPath:"id",autoIncrement:true});
  console.log("store is created");
  open.onerror=function(error){
  console.log("error occured");
      }
}
open.onsuccess=function(e){
  request=e.target.result;
  var transaction=request.transaction("formdata","readwrite");
 store=transaction.objectStore("formdata");
var info=store.get(paravalue);
info.onsuccess=function(data){
  console.log(data);
  personalinfo(data.target.result);
}
}
var left=document.querySelector(".left");
var right=document.querySelector(".right");
function personalinfo(pi){
  var image=document.createElement("img");
  image.src="images/womanhd.svg" ;
  image.alt=pi.name;
  left.append(image);
  var name=document.createElement("h2");
  name.textContent=pi.name;
  var mbno=document.createElement("h2");
  mbno.textContent=pi.mbno;
  var emailid=document.createElement("h2");
  emailid.textContent=pi.emailid;
  left.append(name);
  left.append(mbno);
  left.append(emailid);
  var h1=document.createElement("h1");
  h1.textContent="Career Objective";
  right.append(h1);
  var hr=document.createElement("hr");
  right.append(hr);
  var pa=document.createElement("p");
  pa.textContent=pi.career;
  right.append(pa);
     var h1=document.createElement("h1");
     h1.textContent="Education Details";
     right.append(h1);
    var hr=document.createElement("hr");
     right.append(hr);
      var table=document.createElement("table");
      table.border="2";
      right.append(table);
        var tr1="<tr><th>institute</th><th>branch</th><th>yop</th><th>percentage</th>";
       var tr2=" ";
      for(var i in pi.education)
      // {
      //   console.log(pi.education);
      // }
      {
      tr2=tr2+"<tr><td>"+pi.education[i].inst+"</td><td>"+pi.education[i].branch+"</td><td>"+pi.education[i].yop+"</td><td>"+pi.education[i].per+"</td></tr>";
   }
   table.innerHTML=tr1+tr2;
   right.append(table);
   var h1=document.createElement("h1");
   h1.textContent="Skills";
   right.append(h1);
   var hr=document.createElement("hr");
   right.append(hr);
   var ga=document.createElement("g");
   ga.textContent=pi.skills;
   right.append(ga);
}
