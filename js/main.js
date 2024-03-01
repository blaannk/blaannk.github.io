document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('plaqueform').addEventListener('submit', function(event) {
        event.preventDefault();
        document.getElementById("bigloader").style.display = "flex";

        var plaqueinput = document.getElementById('plaqueinput').value;

        var apiUrl = 'http://127.0.0.1:8000/plate/' + plaqueinput;

        fetch(apiUrl, {
            method: 'GET'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('La requête a échoué !');
            }
            return response.json();
        })
        .then(data => {
            console.log('Données récupérées :', data);
            document.getElementById('vehiculename').style.display = "block";
            document.getElementById('infotab').style.display = "flex";
            document.getElementById('vehiculename').innerText = data.marque + " " + data.model;

            Object.keys(data).forEach(key => {
                if (data[key] && typeof data[key] === 'object') {
                    var categoryElement = document.getElementById(key);

                    categoryElement.innerHTML = '';
                    if (Array.isArray(data[key])) {
                        data[key].forEach(item => {
                            var itemParagraph = document.createElement('p');
                            Object.entries(item).forEach(([prop, value]) => {
                                itemParagraph.textContent += `${prop} : ${value}\n`;
                            });
                            categoryElement.appendChild(itemParagraph);
                        });
                    } else {
                        var itemParagraph = document.createElement('p');
                        Object.entries(data[key]).forEach(([prop, value]) => {
                            itemParagraph.textContent += `${prop} : ${value}\n`;
                        });
                        categoryElement.appendChild(itemParagraph);
                    }
                }
            });
            document.getElementById("bigloader").style.display = "none";
        })
        .catch(error => {
            document.getElementById("bigloader").style.display = "none";
            console.error('Erreur lors de la récupération des données :', error);
        });
    });
});
