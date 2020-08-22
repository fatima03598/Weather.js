
const keyLayout = [
    {main: "1", second:"!"},{main: "2", second:"\""}, {main: "3", second:"£"}, {main: "4", second:"$"}, {main: "5", second:"%"},  {main: "6", second:"^"},  {main: "7", second:"&"},{main: "8", second:"*"},{main: "9", second:"("},{main: "0", second:")"}, "backspace",
    "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
    "caps lock", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
    "done", "shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
    "space"
];



const virtualKeyboard = {

    elements: {
        main:null,
    },

    properties: {
        capsLock:false,
        shift:false
    },

    init () {
        this.elements.main = document.createElement("div");
        this.elements.main.classList.add("keyboard-off");
        this.elements.main.classList.add("keyboard");
        
        this.createKeys()
        document.getElementById("mainWeb").appendChild(this.elements.main);
        document.getElementById("target-keyboard").addEventListener("click", () => {
            this.open()
        } )
       

    },

    createKeys () {
        let input = document.getElementById("search")
        const lineBreakers = ["backspace","p", "enter", "?"]
        keyLayout.forEach(key => {
            const singleKey = document.createElement("button")
            singleKey.classList.add("key")
             
            if(typeof key == "string"){
                singleKey.textContent = key
                switch(key) {
                    case "backspace":  
                        singleKey.setAttribute("id", key)
                        singleKey.classList.add("key-medium")
                        singleKey.prepend(this.createIcon('keyboard_backspace'))
                        singleKey.addEventListener("click", () => {
                            input.value = input.value.substring(0, input.value.length - 1);
                         

                        }) 

                    break;

                    case "caps lock":
                        singleKey.setAttribute("id", key)
                        singleKey.classList.add("key-medium")
                        singleKey.classList.add("dynamicKey")
                        singleKey.addEventListener("click", () => {
                            this.properties.capsLock = !this.properties.capsLock
                            this.properties.capsLock ? singleKey.classList.add("dynamicKey-on") : singleKey.classList.remove("dynamicKey-on")

                        }) 

                    break;

                    case "enter":
                        singleKey.setAttribute("id", key)
                        singleKey.classList.add("key-medium")
                        singleKey.prepend(this.createIcon('keyboard_return'))
                        singleKey.addEventListener("click", () => {
                            
                           input.value += "\n";
                        
                        });   
                    break;

                    case "done":
                        singleKey.setAttribute("id", key)
                        singleKey.classList.add("key-medium")
                        singleKey.prepend(this.createIcon('done'))
                        singleKey.addEventListener("click", () => {
                           this.close()
                        }); 

                    break;

                    case "shift":
                        singleKey.setAttribute("id", key)
                        singleKey.classList.add("key-medium")
                        singleKey.classList.add("dynamicKey")
                        singleKey.prepend(this.createIcon('arrow_upward'))  
                        singleKey.addEventListener("click", () => {
                           this.properties.shift = !this.properties.shift
                           this.properties.shift ? singleKey.classList.add("dynamicKey-on") : singleKey.classList.remove("dynamicKey-on")
                           const spans = document.querySelectorAll(".secondKey")
                           const keys = document.querySelectorAll(".key-small")
                           if(this.properties.shift) {
                                spans.forEach(span => {
                                    span.classList.remove("secondKey-shiftOff")
                                    span.classList.add("secondKey-shiftOn")
                                })
                                keys.forEach(key => {
                                    if (key.children.length > 0) {
                                        key.classList.add("key-shiftOn") 
                                    }
                                })

                           }else{
                                spans.forEach(span => {
                                    span.classList.add("secondKey-shiftOff")
                                    span.classList.remove("secondKey-shiftOn")
                            })
                                keys.forEach(key => {
                                    if (key.children.length > 0) {
                                        key.classList.remove("key-shiftOn") 
                                    }
                                })}
                        });
                    break;

                    case "space":
                        singleKey.setAttribute("id", key)
                        singleKey.classList.add("key-long")
                        singleKey.addEventListener("click", () => {
                            input.value += " ";
                           
                        });   
                    break;

                    default:
                        singleKey.setAttribute("id", key)
                        singleKey.classList.add("key-small")
                        singleKey.addEventListener("click", () => {
                             this.properties.capsLock ? input.value += key.toUpperCase() : input.value += key.toLowerCase() 
                          
                          
                            
                        }); 
                     
                }
            } else {
                singleKey.textContent = key.main
                const span = document.createElement("span")
                span.textContent = key.second
                span.classList.add("secondKey")
                span.classList.add("secondKey-shiftOff")
                singleKey.appendChild(span)
                singleKey.setAttribute("id", key.main)
                singleKey.classList.add("key-small")
                singleKey.addEventListener("click", () => {
                    if(this.properties.shift) {
                        this.properties.capsLock ? input.value += key.second.toUpperCase() : input.value += key.second.toLowerCase() 
                        
                    }else {
                        this.properties.capsLock ? input.value += key.main.toUpperCase() : input.value += key.main.toLowerCase() 
                        

                    }
                })    

            }
            if(lineBreakers.includes(key)){
                const breakLine = document.createElement("br")
                this.elements.main.appendChild(singleKey)
                singleKey.after(breakLine)
            }else {  
                this.elements.main.appendChild(singleKey)
            }
          
        })

    },

    open () {
        this.elements.main.classList.add("keyboard-on");   
        this.elements.main.classList.remove("keyboard-off"); 
    },

    close () {
        this.elements.main.classList.remove("keyboard-on");
        this.elements.main.classList.add("keyboard-off");
    },
    
    createIcon  (name) {
        let icon = document.createElement('i')
        icon.textContent = name
        icon.classList.add('material-icons')
        return icon
    }
}


