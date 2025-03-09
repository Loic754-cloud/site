document.querySelectorAll("h1 span").forEach(span =>
    span.style.color = '#' + Math.floor(Math.random()*16777215).toString(16)
);





let content= document.getElementById("contenu");
let corps= document.getElementById("body");
let submit= document.getElementById("btn");
let nb_case= document.getElementById("nb_case");
let nb_color= document.getElementById("nb_color");
let compteur= document.getElementById("compteur");
let bleu1=0;
let vert1=0;
let rouge1=0;
let coups=0;
let victoire=document.getElementById("victoire");



let att;
    submit.addEventListener("click",()=>{

        let couleur=new Array(nb_color);

        for (let i=0;i<nb_color.value;i++){
            let bouton=document.createElement("input");
            bouton.setAttribute("type","button");
            bouton.setAttribute("class","palette");

            let bleu=Math.floor (Math.random () * 255);
            let rouge=Math.floor (Math.random () * 255);
            let vert=Math.floor (Math.random () * 255)
            bouton.setAttribute("style","background-color:"+"rgb("+bleu+","+rouge+","+vert+")");

            bouton.setAttribute("bleu",""+bleu+"");
            bouton.setAttribute("rouge",""+rouge+"");
            bouton.setAttribute("vert",""+vert+"");
            corps.appendChild(bouton);
            att="background-color:"+"rgb("+bleu+","+rouge+","+vert+")";
            couleur[i]=att;

        }


            for (let i=0;i<nb_case.value;i++){
                        let ligne=document.createElement("tr");
                    ligne.setAttribute("id",""+i+"");
                        content.appendChild(ligne);
                           let interdit=new Array(nb_color.value);
                        for(let j=0;j<nb_case.value;j++){
                        let Case=document.createElement("td");
                        Case.setAttribute("id",""+j+"");
                            Case.setAttribute("class","case");
                            let indice = Math.floor (Math.random () * nb_color.value);

                            while(j<nb_color.value && indice==interdit[indice] ){
                                indice = Math.floor (Math.random () * nb_color.value);
                            }
                            if(j<nb_color.value ){
                                interdit[indice]=indice;}

                            Case.setAttribute("style",couleur[indice]);
                                /**Case.setAttribute("style","background-color:"+"rgb("+bleu1+","+rouge1+","+vert1+")");**/

                    /** Case.setAttribute("id",""+i+","j+"");**/

                    ligne.appendChild(Case);

                        }



                    }
        let carre=document.getElementsByClassName("palette");
        for(let i=0;i<nb_color.value;i++){
            carre[i].addEventListener("click",function (coloriser){
                att=couleur[i]

            });
        }

        let pixel=document.querySelectorAll("td");
        let color1;
        function col(bloc,color1){
            let pixel=document.querySelectorAll("td");


            let compt=1;
            let bas=parseInt(bloc)+parseInt(nb_case.value);
            let num_ligne=Math.floor(bloc/nb_case.value);
            pixel[bloc].setAttribute("style",att);

            if ( bas<=nb_case.value*nb_case.value-1 && bloc>0){ /**bas**/


                if(pixel[bas].getAttribute("style")==color1){
                            col(bas,color1);
                }
            }

                if (num_ligne>=0 &&  pixel[bloc-nb_case.value]!=undefined ){/**haut**/
                    if(pixel[bloc-nb_case.value].getAttribute("style")==color1){
                            col(bloc-nb_case.value,color1);
                    }


                }

                if (  bloc+1<nb_case.value*(Math.floor(bloc/nb_case.value)+1) && bloc<nb_case.value*nb_case.value && pixel[1+bloc]!=undefined ){/*droite**/
                    if(pixel[1+bloc].getAttribute("style")==color1){
                    col(bloc+1,color1);
                    }
                }

                if (bloc>nb_case.value*Math.floor(bloc/nb_case.value)  && pixel[bloc-1].getAttribute("style")==color1  ){/**Gauche**/

                    col(bloc-1,color1);
                }


        }
        let stop=false;
            for(let i=0;i<(nb_case.value)*(nb_case.value);i++){

                    /**Créons un tableau**/
                let bloc;

                pixel[i].addEventListener("click", (e)=>{
                bloc=i;
                color1=pixel[i].getAttribute("style");
                if(!stop){
                col(bloc,color1);
                coups++;
                }

                compteur.innerHTML=""+coups;
                let n;
                n=0;
                while(n<=(nb_case.value)*(nb_case.value)-1 && pixel[n].getAttribute("style")==att){
                n++;
            }
             console.log(n);
            if(n==(nb_case.value)*(nb_case.value)){
                alert("victoire");
                 stop=true;
            }

            });


            }
    });
