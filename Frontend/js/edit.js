window.onload = function() {
    // Função para obter parâmetros da URL
    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }



    // Obter os dados do jogo da URL
    var dadosJogo = getParameterByName('dados');
    if (dadosJogo) {
        // Decodificar os dados do jogo
        var jogo = JSON.parse(decodeURIComponent(dadosJogo));

        // Preencher o formulário com os dados do jogo
        document.getElementById('nome').value = jogo.nome;
        document.getElementById('descricao').value = jogo.descricao;
        document.getElementById('produtora').value = jogo.produtora;
        document.getElementById('ano').value = jogo.ano;
        document.getElementById('idadeMinima').value = jogo.idadeMinima;

        document.getElementById('data-id').setAttribute('data-id', jogo.id)


    }
};