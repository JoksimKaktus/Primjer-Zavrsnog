btn = document.querySelector('#add');
btn.addEventListener('click', submit);
btn2 = document.querySelector('#fil');
btn2.addEventListener('click', filter);

var cars = [];

function submit(e){
    e.preventDefault();

    let modelval = document.querySelector('#model-add').value;
    let yearval = document.querySelector('#year-add').value;
    let regnumval = document.querySelector('#reg-num-add').value;

    tabela = document.getElementById("tabela");
    tabelaRed = document.createElement('tr');

    cmodel = document.createElement('td');
    cyear = document.createElement('td');
    cregnum = document.createElement('td');

    let duplicate = false;

    for(let i = 0;i < cars.length;i++){
        if(cars[i].regnum == regnumval){
            duplicate = true;
            break;
        }
    }

    if(duplicate){
        alert("Postoji auto sa istim tablicama");
        return;
    }

    cars.push({
        mod: modelval,
        year: yearval,
        regnum: regnumval
    })

    cmodel.innerHTML = modelval;
    cyear.innerHTML = yearval;
    cregnum.innerHTML = regnumval;

    tabelaRed.appendChild(cmodel);
    tabelaRed.appendChild(cyear);
    tabelaRed.appendChild(cregnum);

    tabela.appendChild(tabelaRed);  
}

function filter(e){
    e.preventDefault();

    let modelval = document.querySelector('#model-fil').value;
    let regnumval = document.querySelector('#reg-num-fil').value;

    while(tabela.rows.length > 1){
        tabela.deleteRow(1);
    }

    if(regnumval == ""){
        let modelniz = modelval.split(',');
        for(let i = 0;i < modelniz.length;i++){
            for(let j = 0;j < cars.length;j++){
                if(cars[j].mod == modelniz[i]){
                    addelem(j); 
                }
            }
        } 
    }else{
        let modelniz = modelval.split(',');
        for(let i = 0;i < cars.length;i++){
            if(cars[i].regnum == regnumval){
                let print = false;
                for(let j = 0;j < modelniz.length;j++){
                    if(modelniz[j] == cars[i].mod){
                        print = true;
                        break;
                    }
                }
                if(print){
                    addelem(i);
                }
                break;
            }
        }
    }

}

function sort(col){
    while(tabela.rows.length > 1){
        tabela.deleteRow(1);
    }
    
    if(col == "model"){
        cars.sort((a,b) => {
            if(a.mod < b.mod)return -1;
            if(a.mod > b.mod)return 0;
            return 1;
        });
        for(let i = 0;i < cars.length;i++){
            addelem(i);
        }
    }else if(col == "year"){
        cars.sort((a,b) => {
            if(parseFloat(a.year) < parseFloat(b.year))return -1;
            if(parseFloat(a.year) > parseFloat(b.year))return 0;
            return 1;
        });
        for(let i = 0;i < cars.length;i++){
            addelem(i);
        }
    }else{
        cars.sort((a,b) => {
            if(a.regnum < b.regnum)return -1;
            if(a.regnum > b.regnum)return 0;
            return 1;
        });
        for(let i = 0;i < cars.length;i++){
            addelem(i);
        }
    }
}

function addelem(i){
    tabela = document.getElementById("tabela");
    tabelaRed = document.createElement('tr');
        
    cmodel = document.createElement('td');
    cyear = document.createElement('td');
    cregnum = document.createElement('td');

    cmodel.innerHTML = cars[i].mod;
    cyear.innerHTML = cars[i].year;
    cregnum.innerHTML = cars[i].regnum;

    tabelaRed.appendChild(cmodel);
    tabelaRed.appendChild(cyear);
    tabelaRed.appendChild(cregnum);
        
    tabela.appendChild(tabelaRed); 
}