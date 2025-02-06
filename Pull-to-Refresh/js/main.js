
let boxloading= document.querySelectorAll(".load");
let isBoxloading=true;
let iSscroll0=true;

function loadboxs(){
    let iteration =0;

const interval = setInterval(()=>{
    if (iteration==boxloading.length){
  
        clearInterval(interval);
        isBoxloading=false;
        return;
       
    }

    boxloading[iteration].style.transform='translateY(0px) ';
    boxloading[iteration].style.opacity='1';

    iteration++;

},500);

}

loadboxs();

document.addEventListener("scroll", () => {
    if (window.scrollY === 0) {
        iSscroll0=true;
    }else{
        iSscroll0=false;
    }
});


let boxRefresh = document.querySelector(".box-refresh");
let iconRefresh = document.querySelector(".icon-refresh");
let boxIconRefresh = document.querySelector(".box--icon-refresh");

let startScreenY =0;
let isLoading= false;
// event listeners for handing touch gestures

document.addEventListener("touchstart",(e)=>{

    if(iSscroll0==false)
        return false;
    
    if(isBoxloading==true)
        return false;


    startScreenY =e.targetTouches[0].screenY;
  


}); // Detect touch start



document.addEventListener("touchmove",(e)=>{
    if(iSscroll0==false)
        return false;

    if(isBoxloading==true)
        return false;
    
    if(isLoading  )
        return false;
    let _screenY = e.targetTouches[0].screenY;
    
    if((startScreenY+150) >=_screenY){
        boxRefresh.classList.remove("hidden");
        boxRefresh.style.height= `${(_screenY-startScreenY)}px`;
        iconRefresh.style.transform = `scale(${(_screenY-startScreenY)}%) rotate(${(_screenY-startScreenY)}deg)`;
    }

    if((startScreenY+150) <=_screenY){
        isLoading =true;
        iconRefresh.classList.add("iconRotate");
        boxIconRefresh.classList.add("isLoading");

    setTimeout(() => {
        
        boxloading.forEach(box => {             
            box.style.transform='translateY(40px) ';
            box.style.opacity='0';
        });
        iconRefresh.classList.remove("iconRotate");
        boxIconRefresh.classList.remove("isLoading");
        boxIconRefresh.classList.add("endLoading1");

        setTimeout(() => {
            boxIconRefresh.classList.add("endLoading2");
            boxRefresh.style.height= `0px`;
            loadboxs();
            isLoading=false;
            isBoxloading=true;

            setTimeout(() => {
               
            boxIconRefresh.classList.remove("endLoading1");
            boxIconRefresh.classList.remove("endLoading2");
            boxRefresh.classList.add("hidden");
            }, 500);
        }, 500);
    }, 1000);
    }


}); // Detect touch movement



document.addEventListener("touchend",(e)=>{
    if(iSscroll0==false)
        return false;
    
    if(isBoxloading==true)
        return false;

    if(!isLoading){
    boxRefresh.style.height= `0px`;
    iconRefresh.style.transform = `scale(40%) rotate(0deg)`;
}

}); //Detect touch end





 