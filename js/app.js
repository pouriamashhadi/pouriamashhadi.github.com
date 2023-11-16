

let $= document,
    btnSearch= $.querySelector(".boxBtnSearch button"),
    txtSearch=$.querySelector("#txtSearch"),
    onClickBtn=false;
  


    txtSearch.addEventListener("keypress",function(e){
     
        if(e.keyCode==13){
            btnSearch.click();
        }  

    })


    $.querySelector(".boxDictionary .header").addEventListener("click",function(){
        $.querySelector(".boxSearch").style.display="flex";
        $.querySelector(".boxDictionary").classList.add("none");
        txtSearch.focus()
        txtSearch.value=""
    })


btnSearch.addEventListener('click',function(){
    if(!onClickBtn){

        onClickBtn=true;
        
        if(txtSearch.value!="" ){

            btnSearch.classList.add("looding");

            fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${txtSearch.value}`)
                .then(res=>  res.json())
                .then(data =>{
                    
                    if(data.title=="No Definitions Found")
                    {

                        btnSearch.classList.remove("looding");
                        btnSearch.classList.add("e404")
                        btnSearch.querySelector(".btn404").innerHTML="The word item was not found !!!";
                        
                        setTimeout(() => {
                            btnSearch.classList.remove("e404")
                            onClickBtn=false;
                        }, 2000);
                        
                    }else{
                        $.querySelector(".boxSearch").style.display="none";
                        $.querySelector(".boxDictionary").classList.remove("none");

                        $.querySelector(".boxAudio").innerHTML="";

                        let z=0;
                        (data[0].phonetics).forEach(phonetic => {
                            z++;
                           if((phonetic.audio).includes("uk")){
                            
                                
                                $.querySelector(".boxAudio").insertAdjacentHTML("beforeend",
                                `
                            <div class="uk">
                            <div class="phonetic"> ${phonetic.text} </div>
                            <div> <audio hidden id="audio${z}"  src="${phonetic.audio}"></audio> </div>
                            <button class="btnPlay${z}">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 15.5C14.21 15.5 16 13.71 16 11.5V6C16 3.79 14.21 2 12 2C9.79 2 8 3.79 8 6V11.5C8 13.71 9.79 15.5 12 15.5Z" stroke="#333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M4.3501 9.6499V11.3499C4.3501 15.5699 7.7801 18.9999 12.0001 18.9999C16.2201 18.9999 19.6501 15.5699 19.6501 11.3499V9.6499" stroke="#333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M10.6101 6.43012C11.5101 6.10012 12.4901 6.10012 13.3901 6.43012" stroke="#333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M11.2 8.55007C11.73 8.41007 12.28 8.41007 12.81 8.55007" stroke="#333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M12 19V22" stroke="#333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                  </svg>
                            </button>
                        </div>

                        `
                                    )

                                
                                   
                                 $.querySelector(`.btnPlay${z}`).addEventListener("click",function(){
                                        $.querySelector(`#audio${z}`).play()
                                    })

                            }
                           else if((phonetic.audio).includes("us")){
                                      
                            $.querySelector(".boxAudio").insertAdjacentHTML("beforeend",
                            `
                        <div class="us">
                        <div class="phonetic"> ${phonetic.text} </div>
                        <div> <audio hidden id="audio${z}"  src="${phonetic.audio}"></audio> </div>
                        <button class="btnPlay${z}">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 15.5C14.21 15.5 16 13.71 16 11.5V6C16 3.79 14.21 2 12 2C9.79 2 8 3.79 8 6V11.5C8 13.71 9.79 15.5 12 15.5Z" stroke="#333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M4.3501 9.6499V11.3499C4.3501 15.5699 7.7801 18.9999 12.0001 18.9999C16.2201 18.9999 19.6501 15.5699 19.6501 11.3499V9.6499" stroke="#333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M10.6101 6.43012C11.5101 6.10012 12.4901 6.10012 13.3901 6.43012" stroke="#333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M11.2 8.55007C11.73 8.41007 12.28 8.41007 12.81 8.55007" stroke="#333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M12 19V22" stroke="#333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                              </svg>
                        </button>
                    </div>

                    `
                                )
                                $.querySelector(`.btnPlay${z}`).addEventListener("click",function(){
                                    $.querySelector(`#audio${z}`).play()
                                })
                           }
                           else{
                            
                           }
                        });
                        

                        $.querySelector(".definition").innerHTML=data[0].meanings[0].definitions[0].definition;
                        
                        $.querySelector(".boxDictionary").
                            querySelector(".infoWord").innerHTML=data[0].word;

                         
                        btnSearch.classList.remove("looding");
                        onClickBtn=false;
                    }
                })
                .catch(
                    e=>{
                        btnSearch.classList.add("e404")
                        btnSearch.querySelector(".btn404").innerHTML="Try again !!!";
                        console.log(e)
                        setTimeout(() => {
                            btnSearch.classList.remove("e404")
                            onClickBtn=false;
                        }, 1000);
                    }
                )


        }else{

            btnSearch.classList.add("e404")
            btnSearch.querySelector(".btn404").innerHTML="Enter a word !!!";
    
            setTimeout(() => {
                btnSearch.classList.remove("e404")
                onClickBtn=false;
            }, 1000);

        }    
    }
   
  
})