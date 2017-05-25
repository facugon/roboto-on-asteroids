function LoadImage (path,onload) {
  var img = new Image()
  img.onload = function () {
    onload(null,img)
  }
  img.src = path
  return img
}
