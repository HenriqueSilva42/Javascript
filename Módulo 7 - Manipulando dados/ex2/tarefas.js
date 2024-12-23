document.getElementById('adicionar').addEventListener('click', function() {
    const descricao = document.getElementById('descricao').value.trim();
    if (descricao) {
        let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
        tarefas.push({ descricao, concluido: false });
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
        atualizarListaTarefas(tarefas);
    }
});

function atualizarListaTarefas(tarefas) {
    const ul = document.getElementById('tarefas');
    ul.innerHTML = '';
    tarefas.forEach((tarefa, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" ${tarefa.concluido ? 'checked' : ''} onclick="alterarStatus(${index})">
            <span class="${tarefa.concluido ? 'concluida' : ''}">${tarefa.descricao}</span>
            <button onclick="removerTarefa(${index})">Excluir</button>
        `;
        ul.appendChild(li);
    });
}

function alterarStatus(index) {
    let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    tarefas[index].concluido = !tarefas[index].concluido;
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
    atualizarListaTarefas(tarefas);
}

function removerTarefa(index) {
    let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    tarefas.splice(index, 1);
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
    atualizarListaTarefas(tarefas);
}

// Carregar as tarefas ao carregar a página
window.addEventListener('load', function() {
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    atualizarListaTarefas(tarefas);
});
