document.getElementById('curtir').addEventListener('click', function() {
    const nome = document.getElementById('nome').value.trim();
    if (nome) {
        let curtidas = JSON.parse(localStorage.getItem('curtidas')) || [];
        if (!curtidas.includes(nome)) {
            curtidas.push(nome);
            localStorage.setItem('curtidas', JSON.stringify(curtidas));
            atualizarListaCurtidas(curtidas);
        }
    }
});

document.getElementById('limpar').addEventListener('click', function() {
    localStorage.removeItem('curtidas');
    document.getElementById('listaCurtidas').textContent = 'Ninguém curtiu';
});

function atualizarListaCurtidas(curtidas) {
    let texto = '';
    if (curtidas.length === 0) {
        texto = 'Ninguém curtiu';
    } else if (curtidas.length === 1) {
        texto = `${curtidas[0]} curtiu`;
    } else if (curtidas.length === 2) {
        texto = `${curtidas[0]} e ${curtidas[1]} curtiram`;
    } else {
        texto = `${curtidas[0]}, ${curtidas[1]} e mais ${curtidas.length - 2} pessoas curtiram`;
    }
    document.getElementById('listaCurtidas').textContent = texto;
}

// Carregar a lista de curtidas ao carregar a página
window.addEventListener('load', function() {
    const curtidas = JSON.parse(localStorage.getItem('curtidas')) || [];
    atualizarListaCurtidas(curtidas);
});
