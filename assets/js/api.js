//Captura a raça selecionada no select
var $breed_select = $('select.breed_select');
$breed_select.change(function() {
    var id = $(this).children(":selected").attr("id");
    getDogByBreed(id)
});


//Captura a raça escrita no input
function search() {
    input = document.getElementById("raca");
    valor = input.value;
    ajax_get('https://api.thedogapi.com/v1/breeds/search?q='+valor, function(data) {
        console.log(data);
        getDogByBreed(data["0"].id);
    });
}

//Busca todas as raças no site "the dogs api"
function getBreeds() {
    ajax_get('https://api.thedogapi.com/v1/breeds', function(data) {
        populateBreedsSelect(data)
    });
}

//Carrega os dados recebidos na API no select que o usuário vai escolher a raça
function populateBreedsSelect(breeds) {
    $breed_select.empty().append(function() {
        var output = '';
        $.each(breeds, function(key, value) {
            output += '<option id="' + value.id + '">' + value.name + '</option>';
        });
        return output;
    });
}

//É chamado essa função sempre quando uma raça é escolhida pelo usuário
function getDogByBreed(breed_id) {
    //Pesquisa pela imagem da raça escolhida
    ajax_get('https://api.thedogapi.com/v1/images/search?include_breed=1&breed_id=' + breed_id, function(data) {

        if (data.length == 0) {
            //Se não tiver nenhuma imagem
            clearBreed();
            $("#breed_data_table").append("<tr><td>Desculpe, não encontramos nenhuma imagem</td></tr>");
        } else {
            //Senão exibe a imagem
            displayBreed(data[0])
        }
    });
}

//Limpa a imagem e a tabela
function clearBreed() {
    $('#breed_image').attr('src', "");
    $("#breed_data_table tr").remove();
}

//Exibe a imagem e a tabela de informações
function displayBreed(image) {
    $('#breed_image').attr('src', image.url);
    //$('#breed_image').attr('style', "background-image:url("+image.url+")");
    $("#breed_data_table tr").remove();
    var breed_data = image.breeds[0]
    $.each(breed_data, function(key, value) {
        if (key == 'weight' || key == 'height') value = value.metric
        if (key == 'weight') titulo = "Peso"
        else if (key == 'name') titulo = "Nome"
        else if (key == 'height') titulo = "Altura"
        else if (key == 'id') titulo = "ID"
        else if (key == 'bred_for') titulo = "Tipo"
        else if (key == 'breed_group') titulo = "Grupo"
        else if (key == 'life_span') titulo = "Expectativa de vida"
        else if (key == 'temperament') titulo = "Personalidade"
        else titulo = "Origem"

        if (key != 'reference_image_id' && value != '')
        //Adiciona os dados na tabela
        $("#breed_data_table>tbody").append("<tr><th>" + titulo + "</th><td>" + value + "</td></tr>");
    });
}

//Faz a chamada ajax para a API (xml)
function ajax_get(url, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            console.log('respondeText:' + xmlhttp.responseText);
            try {
                var data = JSON.parse(xmlhttp.responseText);
            } catch (err) {
                console.log(err.message + " em " + xmlhttp.responseText);
                return;
            }
            callback(data);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

//Chama a função getBreeds que carregará todas as raças de cães no select
getBreeds();