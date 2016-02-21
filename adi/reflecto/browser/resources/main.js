var obj; // the current item-url  | 
var par; // the items' parent-url |  all either rel or abs
var url; // the context-url       | 

//
// Validators
//
function isDir(url) {
  if(isView(url)) { return false }
  else { return true }
}
function isView(url) {
//  console.debug('isView')
//  console.debug(url)
  if(url.slice(-4, url.length) == 'view') {
    return true
  } else { return false }
}
//
// Getters
//
function getContentUrl(url) {
// Return url to be loaded for the content-area.
  if(isDir(url)) { // Show dirs content-listing:
    url += '/reflector_view #content'
  }
  else { // Show files raw, remove '/view':
    url = url.slice(0, url.length - 5)
  }
  return url
}
function getNaviUrl(url) {
// Return url to be loaded for the navi-area.
  if(isView(url)) {
    url = getParentPath(url)
  }
  url += '/reflector_view #content'
  return url
}
function getParentPath(url) {
  url = url.split('/')
  url = url.slice(0, url.length - 2) // get parent-url
  url = url.join('/')
  console.debug(url)
  return url
}
//
// Updaters
//
function updatePage() {
  var url = window.location.href
console.debug('updatePage: '+ url)
  var cont_url = getContentUrl(url)
  var navi_url = getNaviUrl(url)
  if(isDir(url)) {
    naviFadeOut()
    $('#navi').load(navi_url, function() {
      applyNaviClickListener()
      $('#navi').css('opacity', 1)
      $('#contente').html('')
    });
  }
  else {
    $('#contente').load(cont_url)
  }
}
//
// Faders
//
function naviFadeIn() {
  $('#navi').animate(
      {'opacity': 1},
      0 //277
      )
}
function naviFadeOut() {
  $('#navi').animate(
    {opacity: 0},
    0, //277,
    function() { naviFadeIn() }
  )
}
//
// Listeners
//
function applyNaviClickListener () {
  $('#navi a').click(function (eve) {
  eve.preventDefault()
  url = $(eve.target).attr('href')
  window.history.pushState(null, '', url)
  updatePage()
  })
}
//
// Struc
//
function addSkel(url) {
  var html = '<div id="page"><div id="navi"><a href="'
             + url + '">here</a></div><div id="contente"></div></div>'
  $('body').html(html)
  $('#navi').css({'float':'left', 'min-width': '27%', 'height': '99%'})
}
//
// Main
//
function main() {
  var url = window.location.href
  console.debug(url)
  url = getParentPath(url)
  console.debug(url)
  //addSkel(url)
  //updatePage(url)
}
(function($) { $(document).ready(function() { main() }); })(jQuery);
