<!DOCTYPE html>
<html>

<head>
    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <title>Breeds</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
</head>

<body>

<div class="container"> 
<?php
    include('header.html');
    include('menu.html');
?>
    <div id="banner-message">
        <h3>Escolha ou digite uma raça</h3>
        <br>
        <div class="row" id="breed_data" class="mx-auto">
            <div class="col">
                <select class="breed_select form-select">
                    <option></option>
                </select>
            </div>
            <div class="col input-group mb-3">
                <input id="raca" type="text" class="form-control" placeholder="Nome da raça" aria-label="Nome da raça" aria-describedby="button-addon2">
                <button class="btn btn-outline-secondary" type="button" id="pesquisar" onclick="search()">Pesquisar</button>
            </div>
        </div>
        
    </div>

    <br>
    <br>

    <div class="row" id="breed_data" class="mx-auto">
        <div class="col" style="width: 30%"> 
            <img id="breed_image" class="rounded" src="" />
        </div>
        <div class="col">
            <h5 id="a">Informações</h5>
            <table id="breed_data_table" class="table">
                <tbody>
                </tbody>
            </table>
        </div>
        <?php
    include('footer.html');
?>
    </div> 



</body>

</html>

<script src="../assets/js/api.js"></script>

<style>

    #breed_image {
        background: #fff;
        background-image: url()
        margin: 0 auto;
        width: 100%;
        height: auto;
    }

</style>