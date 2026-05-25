async function buscar(){

    const nomeSerie = document.getElementById("inputSerie").value;

    const resultado = document.getElementById("resultado");

    const mensagem = document.getElementById("mensagem");

    resultado.innerHTML = "";

    if(nomeSerie.trim() == ""){

        mensagem.textContent = "Digite o nome de uma série.";

        return;
    }

    try{

        mensagem.textContent = "Buscando...";

        const resposta = await fetch(`https://api.tvmaze.com/search/shows?q=${nomeSerie}`);

        const dados = await resposta.json();

        mostrarSeries(dados);

    }

    catch(erro){

        mensagem.textContent = "Erro ao buscar.";

        console.log(erro);

    }

}

function mostrarSeries(series){

    const resultado = document.getElementById("resultado");

    const mensagem = document.getElementById("mensagem");

    resultado.innerHTML = "";

    if(series.length == 0){

        mensagem.textContent = "Nenhuma série encontrada.";

        return;
    }

    mensagem.textContent = "";

    series.forEach(serie => {

        const card = document.createElement("div");

        card.classList.add("cardSerie");

        let imagem = "";

        if(serie.show.image == null){

            imagem = "https://placehold.co/210x295?text=Sem+Imagem";

        }

        else{

            imagem = serie.show.image.medium;

        }

        const img = document.createElement("img");

        img.src = imagem;

        const info = document.createElement("div");

        info.classList.add("info");

        const titulo = document.createElement("h2");

        titulo.textContent = serie.show.name;

        const score = document.createElement("p");

        if(serie.score == null){

            score.textContent = "Score: indisponível";

        }

        else{

            score.textContent = "Score: " + serie.score.toFixed(2);

        }

        info.appendChild(titulo);

        info.appendChild(score);

        card.appendChild(img);

        card.appendChild(info);

        resultado.appendChild(card);

    });

}