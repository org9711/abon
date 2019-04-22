window.onload = function(){

let xs = []
for (var i = 0; i <= 1000; i++){
  xs.push(i) 
}

let t = 0

function animate(){
  
  let points = xs.map(x => {
    
    let y = 200 + 2 * Math.sin((x+t) / 5)
    return [x, y]
  })
  
  let path = "M" + points.map(p => {
    
    return p[0] + "," + p[1]
  }).join(" L")
  
   document.querySelector("path").setAttribute("d", path)
//  let divs = document.getElementsByClassName("sine")
//  divs.setAttribute("d", path)
//  ('d').attr('path', path);

  
  t+=1
  requestAnimationFrame(animate)
}

animate()

}