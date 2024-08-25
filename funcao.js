document.addEventListener("DOMContentLoaded", function() {
    const estrelas = document.querySelectorAll('.estrela');
    const estrelasSelecionadas = document.getElementById('estrelasSelecionadas');
    const comentarioInput = document.getElementById('comentario');
    const submitButton = document.getElementById('submitAvaliacao');
    let estrelasAtivas = -1;

    // Função para atualizar as estrelas
    function atualizarEstrelas(index) {
        estrelas.forEach((estrela, i) => {
            if (i <= index) {
                estrela.classList.add('selecionada');
            } else {
                estrela.classList.remove('selecionada');
            }
        });
        estrelasSelecionadas.textContent = `${index + 1} estrela${index > 0 ? 's' : ''} selecionada${index > 0 ? 's' : ''}`;
    }

    // Adiciona evento de mouseover e click nas estrelas
    estrelas.forEach((estrela, index) => {
        estrela.addEventListener('mouseover', () => {
            atualizarEstrelas(index);
        });

        estrela.addEventListener('click', () => {
            estrelasAtivas = index;
            atualizarEstrelas(estrelasAtivas);
        });

        estrela.addEventListener('mouseout', () => {
            atualizarEstrelas(estrelasAtivas);
        });
    });

    // Envia a avaliação por e-mail e exibe no site
    submitButton.addEventListener('click', function() {
        const avaliacao = estrelasAtivas + 1;
        const comentario = comentarioInput.value;

        if (avaliacao > 0 && comentario) {
            const email = "esposa@example.com"; // Substitua com o e-mail da sua esposa
            const assunto = encodeURIComponent("Nova Avaliação de Cliente");
            const corpo = encodeURIComponent(`Avaliação: ${avaliacao} estrelas\n\nComentário: ${comentario}`);

            // Envia e-mail
            window.location.href = `mailto:${email}?subject=${assunto}&body=${corpo}`;

            // Exibe o comentário no site
            const listaAvaliacoes = document.getElementById('listaAvaliacoes');
            const novaAvaliacao = document.createElement('div');
            novaAvaliacao.classList.add('avaliacao');
            novaAvaliacao.innerHTML = `<strong>${avaliacao} estrelas:</strong> ${comentario}`;
            listaAvaliacoes.appendChild(novaAvaliacao);

            // Limpa o formulário
            estrelasAtivas = -1;
            atualizarEstrelas(estrelasAtivas);
            comentarioInput.value = '';
        } else {
            alert('Por favor, preencha todas as informações para enviar sua avaliação.');
        }
    });
});


function calcularOrcamento() {
    const quantidade = document.getElementById('quantidade').value;
    const tamanho = document.getElementById('tamanho').value;
    const dias = document.getElementById('dias').value;
    const nome = document.getElementById('nome').value;
    const nomesPets = document.getElementById('nomesPets').value;

    let valorDiaria;
    switch (tamanho) {
        case 'pequeno':
            valorDiaria = 60;
            break;
        case 'medio':
            valorDiaria = 65;
            break;
        case 'grande':
            valorDiaria = 70;
            break;
    }

    let total = quantidade * valorDiaria * dias;

    if (dias > 10) {
        total *= 0.85; // Aplicar 15% de desconto
    }

    document.getElementById('resultado').textContent = `O valor total da hospedagem é R$ ${total.toFixed(2)}.`;


    document.getElementById('whatsappButton').style.display = 'block';
}

function enviarWhatsApp() {
    // Obter os valores dos campos do formulário
    const quantidade = document.getElementById('quantidade').value;
    const tamanho = document.getElementById('tamanho').value;
    const dias = document.getElementById('dias').value;
    const dataInicio = document.getElementById('data').value;
    const nome = document.getElementById('nome').value;
    const nomesPets = document.getElementById('nomesPets').value;

    // Calcular a data de término
    const dataInicioObj = new Date(dataInicio);
    const dataFimObj = new Date(dataInicioObj);
    dataFimObj.setDate(dataFimObj.getDate() + parseInt(dias));

    // Formatar a data de término
    const dia = String(dataFimObj.getDate()).padStart(2, '0');
    const mes = String(dataFimObj.getMonth() + 1).padStart(2, '0');
    const ano = dataFimObj.getFullYear();
    const dataFimFormatada = `${dia}/${mes}/${ano}`;

    // Calcular o valor total do orçamento
    let valorDiario;
    switch (tamanho) {
        case 'pequeno':
            valorDiario = 60;
            break;
        case 'medio':
            valorDiario = 65;
            break;
        case 'grande':
            valorDiario = 70;
            break;
        default:
            valorDiario = 0;
    }
    const valorTotal = valorDiario * dias;

    // Mensagem do WhatsApp
    const mensagem = `Olá, meu nome é ${nome}, e eu gostaria de hospedar ${quantidade} cachorros por ${dias} dias. O valor ficou em R$${valorTotal.toFixed(2)}, tendo início dia ${dataInicio} e finalizando em ${dataFimFormatada}!`;

    // Codificar a mensagem para URL
    const mensagemCodificada = encodeURIComponent(mensagem);

    // URL do WhatsApp com a mensagem
    const url = `https://wa.me/5561993177198?text=${mensagemCodificada}`;

    // Abrir o WhatsApp
    window.open(url, '_blank');
}
