function submitData(){
  var career=document.querySelector("#career").value;
  var name=document.querySelector("#name").value;
  var mbno=document.querySelector("#mbno").value;
  var emailid=document.querySelector("#emailid").value;
  var adress=document.querySelector("#address").value;
  var ginst=document.querySelector("#ginst").value;
  var gbranch=document.querySelector("#gbranch").value;
  var gyop=document.querySelector("#gyop").value;
  var gpercentage=document.querySelector("#gpercentage").value;
  var iclg=document.querySelector("#iclg").value;
  var ibranch=document.querySelector("#ibranch").value;
  var iyop=document.querySelector("#iyop").value;
  var ipercentage=document.querySelector("#ipercentage").value;
  var sscsc=document.querySelector("#sscsc").value;
  var sscboard=document.querySelector("#sscboard").value;
  var sscyop=document.querySelector("#sscyop").value;
  var sscpercentage=document.querySelector("#sscpercentage").value;
  var skills=document.querySelector("#skills").value;
  //indexedDB implementation
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
   store.put({
     career:career,
      name:name,
      mbno:mbno,
      emailid:emailid,
      address:adress,
      education:[{
        inst:ginst,
        branch:gbranch,
        yop:gyop,
        per:gpercentage
      },
     {
      inst:iclg,
    branch:ibranch,
    yop:iyop,
    per:ipercentage
  },
    {
      inst:sscsc,
      branch:sscboard,
      yop:sscyop,
      per:sscpercentage
    }
  ],
  skills:skills
   });

  }
  window.open("index.html");
}
