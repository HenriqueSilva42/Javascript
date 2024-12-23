function searchUsers() {
    const searchTerm = document.getElementById("search").value;
    const userList = document.getElementById("userList");
    const errorMessage = document.getElementById("errorMessage");
    
    userList.innerHTML = ""; // Limpa a lista antes de nova busca
    errorMessage.textContent = ""; // Limpa qualquer mensagem de erro
    
    if (!searchTerm) {
        errorMessage.textContent = "Por favor, insira um nome de usuário para buscar.";
        return;
    }

    const apiUrl = `https://api.github.com/search/users?q=${searchTerm}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.items && data.items.length > 0) {
                data.items.forEach(user => {
                    const li = document.createElement("li");
                    li.innerHTML = `
                        <strong>${user.login}</strong>
                        <br>
                        <a href="${user.html_url}" target="_blank">Perfil no GitHub</a>
                    `;
                    userList.appendChild(li);
                });
            } else {
                errorMessage.textContent = "Não foram encontrados usuários para esta pesquisa.";
            }
        })
        .catch(error => {
            errorMessage.textContent = "Erro ao buscar usuários. Tente novamente.";
            console.error(error);
        });
}

