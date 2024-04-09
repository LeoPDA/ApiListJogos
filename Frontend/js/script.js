
$(document).ready(function() {
  const listaJogos = $('#lista-jogos');
  const modalExclusao = $('#confirmExModal');
  let jogoIdParaExcluir;

  
  listaJogos.on('click', '.excluir-jogo', function(event) {
    event.stopPropagation(); 
    jogoIdParaExcluir = $(this).data('id');
    modalExclusao.modal('show');
  });

  function carregarJogos() {
    $.ajax({
      url: 'http://localhost:3131/games',
      type: 'GET',
      dataType: 'json',
      success: function(data) {
        const listaJogos = $('#lista-jogos');
        listaJogos.empty(); 

        data.forEach(function(jogo) {
          const listItem = criarEstruturaJogo(jogo);
          listaJogos.append(listItem);
        });
      },
      error: function(error) {
        console.log('Erro ao carregar os dados da API:', error);
      }
    });
  }


  carregarJogos();


  listaJogos.on('click', '.editar-jogo', function() {
    const jogoId = $(this).data('id');

    $.ajax({
      url: `http://localhost:3131/games/${jogoId}`,
      type: 'GET',
      dataType: 'json',
      success: function(jogo) {
        // Codificar os dados do jogo para a URL
        const dadosJogo = encodeURIComponent(JSON.stringify(jogo));

        // Redirecionar para a página edit.html com os dados do jogo como parâmetros
        window.location.href = `edit.html?dados=${dadosJogo}`;
    },
    error: function(error) {
        console.log(`Erro ao carregar os dados do jogo com ID ${jogoId}:`, error);
    }
    });
  });

  $('#form-jogo').submit(function(event) {
    event.preventDefault();

    const jogoId = $('#data-id').attr('data-id'); // Obtém o ID do jogo
    console.log(jogoId);

    const jogoEditado = {
      nome: $('#nome').val(),
      descricao: $('#descricao').val(),
      produtora: $('#produtora').val(),
      ano: parseInt($('#ano').val()),
      idadeMinima: parseInt($('#idadeMinima').val())
    };
    let url = 'http://localhost:3131/games';
    let method = 'POST';
    if (jogoId) {
      url += `/${jogoId}`;
      method = 'PUT';
    }

    $.ajax({
      url: url,
      type: method,
      contentType: 'application/json',
      data: JSON.stringify(jogoEditado),
      success: function(response) {
        window.location.href = `index.html`
        carregarJogos();
        $('#form-jogo').removeAttr('data-id').trigger('reset');
      },
      error: function(error) {
        console.log('Erro ao salvar/editar o jogo:', error);
      }
    });
  });

  $('#cancelar-edicao').click(function() {
    $('#form-jogo').removeAttr('data-id').trigger('reset');
  });
   // Função para excluir um jogo
   carregarJogos();



$('#confirmExModal').on('click', function() {
  if (jogoIdParaExcluir) {
    $.ajax({
      url: `http://localhost:3131/games/${jogoIdParaExcluir}`,
      type: 'DELETE',
      success: function(response) {
        console.log('Jogo excluído com sucesso.');
        carregarJogos(); // Recarrega a lista após a exclusão
      },
      error: function(error) {
        console.log(`Erro ao excluir o jogo com ID ${jogoIdParaExcluir}:`, error);
      }
    });

    modalExclusao.modal('hide');
    jogoIdParaExcluir = null;
  }
});

modalExclusao.on('hidden.bs.modal', function() {
  jogoIdParaExcluir = null;
});

  function criarEstruturaJogo(jogo) {
    const listItem = $('<li class="list-group-item"></li>');
    const jogoInfo = `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">${jogo.nome}</h5>
                <p class="card-text"><strong>Descrição:</strong> ${jogo.descricao}</p>
                <p class="card-text"><strong>Produtora:</strong> ${jogo.produtora}</p>
                <p class="card-text"><strong>Ano:</strong> ${jogo.ano}</p>
                <p class="card-text"><strong>Idade Mínima:</strong> ${jogo.idadeMinima}</p>
                <button class="btn btn-primary editar-jogo" data-id="${jogo.id}">Editar</button>
                <button class="btn btn-danger excluir-jogo" data-id="${jogo.id}">Apagar</button>
            </div>
        </div>
    `;
    listItem.html(jogoInfo);
    return listItem;
  }
  

  // Requisição para carregar os jogos da API e exibi-los
  $.ajax({
    url: 'http://localhost:3131/games',
    type: 'GET',
    dataType: 'json',
    success: function(data) {
      listaJogos.empty(); // Limpa a lista antes de atualizar

      // Exibe os jogos na página
      data.forEach(function(jogo) {
        const jogoItem = criarEstruturaJogo(jogo);
        listaJogos.append(jogoItem);
      });
    },
    error: function(error) {
      console.log('Erro ao carregar os dados da API:', error);
    }
  });
  
});