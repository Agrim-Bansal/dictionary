const url="https://agrim-bansal-dictionary.herokuapp.com"

document.getElementsByClassName('btn')[0].onclick = async ()=>{
    var url_ext = "/api/meaning/"
    const query = document.querySelector('input[type="text"]').value ; 
    res = await (await fetch(`${url}${url_ext}${query}`)).json() ;

    console.log(res);

    document.getElementById('res').innerHTML = "<div id=\"audio_container\"></div>"
    
    var aud = document.createElement('audio');
    aud.src = res['phonetics'][0]['audio']
    aud.controls = true;

    document.getElementById('audio_container').appendChild(aud);

    list = document.createElement('div');
    
    for (i in res['meanings']){
        a = res['meanings'][i]
        m1 = document.createElement('div');
        
        m1.classList.add("meaning");
        
        pos = document.createElement('div')
        def = document.createElement('div')
        
        pos.classList.add('partOfSpeech')
        def.classList.add('definition')
        
        pos.appendChild(document.createTextNode(a['partOfSpeech']));
        def.appendChild(document.createTextNode( a['definitions'][0]['definition']));
        m1.appendChild(pos)
        m1.appendChild(def)
        
        list.appendChild(m1);
    }
    document.getElementById('res').appendChild(list);
    
}


document.getElementsByClassName('btn')[0].click()