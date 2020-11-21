let actifsArray = [
    { // Premier élement = trésorerie
        id: 2000,
        name: '',
        type: 'tresorerie',
        value: 0,
        hasToBeCounted: true,
        editable: false
    }
];

let passifsArray = [];

let capitauxPropresArray = [];

function showEmpruntModalText () {
    selectedValue = document.getElementById('operationTypeSelector').value;
    isItCredit = document.getElementById('isOperationCredit').checked;
    if(selectedValue == 'credit') {
        document.getElementById('emprunModalText').style.display = 'block';
        document.getElementById('isOperationCredit').checked = true;
    }
    if(isItCredit == true)
    {
        document.getElementById('emprunModalText').style.display = 'block';
    }
}

const showInfoText = (message) => {
    document.getElementById('informationMessage').innerHTML = '<div class="alert alert-primary" role="alert">' +
            message + '</div>';
}

function generateId() {
    return Math.floor(Math.random() * 100000) + 1;
}

function closeNavbar() {
    $('#addOperationModal').modal('hide');
}

// Fais la somme des tableaux
const updateActifsSumArray = () => {
    let actifsSum = 0;
    // On calcule la somme des actifs
    for(let i = 0; i < actifsArray.length; i++) {
        if(actifsArray[i].hasToBeCounted == true)
        {
            actifsSum += actifsArray[i].value;
        }
    }
    document.getElementById('totalActif').innerHTML = actifsSum;
    console.log(actifsArray);
    return actifsSum;
}

const updatePassifsSumArray = () => {
    let passifsSum = 0;
    // On calcule la somme des actifs
    for(let i = 0; i < passifsArray.length; i++) {
        passifsSum += passifsArray[i].value;
    }
    document.getElementById('totalPassif').innerHTML = passifsSum;
    return passifsSum;
}

const updateCPSumArray = (cpArrayForSum) => {
    let cpSum = 0;
    // On calcule la somme des actifs
    for(let i = 0; i < cpArrayForSum.length; i++) {
        cpSum += cpArrayForSum[i].value;
    }
    document.getElementById('totalCP').innerHTML = cpSum;
    return cpSum;
}

const isFondamentalIdentityRespectedWParam = () => {
    const actifTotal = updateActifsSumArray();
    const passifTotal = updatePassifsSumArray(passifsArray);
    const cpTotal = updateCPSumArray(capitauxPropresArray);
    const secondTotal = passifTotal + cpTotal;
    console.log(actifTotal + '/' + passifTotal + '/' + cpTotal);
    if(actifTotal == secondTotal) {
        document.getElementById('fondamentalIdentityAlert').innerHTML = '<div class="d-flex justify-content-center"><div class="alert alert-primary" align="center" role="alert" style="width:40%;">' +
            '<strong>Identité fondamentale respectée ! 🥳</strong>' + '</div></div>';
        //console.log('Identité fondamentale respectée !');
    }
    else if(actifTotal < secondTotal) {
        document.getElementById('fondamentalIdentityAlert').innerHTML = '<div class="d-flex justify-content-center"><div class="alert alert-primary" align="center" role="alert" style="width:40%;">' +
            '<strong>L\'identité fondamentale n\'est pas respectée... 🙁</strong> Le total des actifs est inférieur à la somme des passifs et des capitaux propres' + '</div></div>';
        //console.log('L\'identité fondamentale n\'est pas respectée... Le total des actifs est inférieur à la somme des passifs et des capitaux propres');
    }
    else if(actifTotal > secondTotal) {
        document.getElementById('fondamentalIdentityAlert').innerHTML = '<div class="d-flex justify-content-center"><div class="alert alert-primary" align="center" role="alert" style="width:40%;">' +
            '<strong>L\'identité fondamentale n\'est pas respectée... 🙁</strong> Le total des actifs est supérieur à la somme des passifs et des capitaux propres' + '</div></div>';
        //console.log('L\'identité fondamentale n\'est pas respectée... Le total des actifs est supérieur à la somme des passifs et des capitaux propres');
    }
}

const updateUserTresorerieText = () => {
    // On affiche la trésorerie
    document.getElementById('tresorerieValue').innerHTML = actifsArray[0].value;
}

// Ce qu'il reste à faire :
// - trois fonctions pour actifs / passifs / cp qui ajoutenant automatiquement les éléments dans la liste
// - update les cp lorsque l'on ajoute un investissement

// Fonction qui récpuère, à partir de l'id, le nom et la valeur d'une opération
const getOperationDetail = (idOperation, type) => {
    if(type == 'actifs')
    {
        // On fait une recherche dans les actifs
        const searchActifOperation = actifsArray.find(element => element.id == idOperation);
        return [searchActifOperation.name, searchActifOperation.value, searchActifOperation.hasToBeCounted, searchActifOperation.type];
    }
    else if(type == 'passifs') {
        // On fait une recherche dans les passifs
        const searchPassifOperation = passifsArray.find(element => element.id == idOperation);
        return [searchPassifOperation.name, searchPassifOperation.value];
    }
    else if(type == 'cp') {
        // On fait une recherche dans les cp
        const searchCPOperation = capitauxPropresArray.find(element => element.id == idOperation);
        return [searchCPOperation.name, searchCPOperation.value];
    }
    // Effectuer des recherches pour les actifs et les passifs
}

const addActifToList = (idOperation) => {
    // 1. On récupère le nom + la valeur
    const actifsOperationDetails = getOperationDetail(idOperation, 'actifs');
    const actifsOperationDetailsName = actifsOperationDetails[0];
    const actifsOperationDetailsValue = actifsOperationDetails[1];
    const idOfTheElementInTheListForActifs = 'act' + idOperation;
    const idOfTheElementInTheListForActifsToDelete = 'actToDel' + idOperation;
    const typeForAddingToListForActifs = "actifs";

    // 2. On ajoute les informations à la liste des actifs
    document.getElementById('actifsList').innerHTML += "<div class='card' style='margin-top: 8px;'>" +
        "<div class='card-body' id='cardBodyPass" + idOperation + "'>"+ actifsOperationDetailsName + " (" + actifsOperationDetailsValue + "€)&nbsp<a id=" + idOfTheElementInTheListForActifs + "><i class='fas fa-edit'></i></a>&nbsp<a id=" + idOfTheElementInTheListForActifsToDelete + "><i class='fas fa-trash'></i></a></div>"
        + "</div>";
    document.getElementById(idOfTheElementInTheListForActifs).setAttribute("onclick", "showEditModal(" + idOperation + ",'" + typeForAddingToListForActifs + "')");
    document.getElementById(idOfTheElementInTheListForActifsToDelete).setAttribute("onclick", "removeOperation(" + idOperation + ",'" + typeForAddingToListForActifs + "')");
}

const addPassifToList = (idOperation) => {
    // 1. On récupère le nom + la valeur
    const passifsOperationDetails = getOperationDetail(idOperation, 'passifs');
    const passifsOperationDetailsName = passifsOperationDetails[0];
    const passifsOperationDetailsValue = passifsOperationDetails[1];
    const idOfTheElementInTheListForPassifs = 'pass' + idOperation;
    const idOfTheElementInTheListForPassifsToDelete = 'actToDel' + idOperation;
    const typeForAddingToListForPassifs = "passifs";

    // 2. On ajoute les informations à la liste des passifs
    document.getElementById('passifsList').innerHTML += '<div class="card" style="margin-top: 8px;">' +
        '<div class="card-body" id="cardBodyPassP' + idOperation + '">' + passifsOperationDetailsName + ' (' + passifsOperationDetailsValue + '€)&nbsp<a id=' + idOfTheElementInTheListForPassifs + '><i class="fas fa-edit"></i></a>&nbsp<a id=' + idOfTheElementInTheListForPassifsToDelete + '><i class="fas fa-trash"></i></a></div>'
        + '</div>';
        document.getElementById(idOfTheElementInTheListForPassifs).setAttribute("onclick", "showEditModal(" + idOperation + ",'" + typeForAddingToListForPassifs + "')");
        document.getElementById(idOfTheElementInTheListForPassifsToDelete).setAttribute("onclick", "removeOperation(" + idOperation + ",'" + typeForAddingToListForPassifs + "')");
}

const addCPToList = (idOperation) => {
    // 1. On récupère le nom + la valeur
    cpOperationDetails = getOperationDetail(idOperation, 'cp');
    cpOperationDetailsName = cpOperationDetails[0];
    cpOperationDetailsValue = cpOperationDetails[1];
    const idOfTheElementInTheListForCP = 'cp' + idOperation;
    const typeForAddingToListForCP = "cp";

    // 2. On ajoute les informations à la liste des cp
    document.getElementById('cpList').innerHTML += '<div class="card" style="margin-top: 8px;">' +
        '<div class="card-body" id="cardBodyPass' + idOperation + '">' + cpOperationDetailsName + ' (' + cpOperationDetailsValue + '€)&nbsp<a id=' + idOfTheElementInTheListForCP + '><i class="fas fa-edit"></i></a>&nbsp<a><i class="fas fa-trash"></i></a></div>'
        + '</div>';
    document.getElementById(idOfTheElementInTheListForCP).setAttribute("onclick", "showEditModal(" + idOperation + ",'" + typeForAddingToListForCP + "')");
}

// Combiner les trois tableaux en un
const arrayWithAllData = actifsArray.concat(passifsArray, capitauxPropresArray);

// La trésorerie doit afficher 0 au début
updateUserTresorerieText();

const addUserOperation = () => {

    const operationName = document.getElementById('operationName').value;
    const operationType = document.getElementById('operationTypeSelector').value;
    const operationValue = parseInt(document.getElementById('operationValue').value)
    const isCredit = document.getElementById('isOperationCredit').checked;

    if(isCredit == false)
    {
        if(operationType == 'tresorerie' && tresorerieValue != 0) {
            tresorerieValue += operationValue;
            actifsArray[0].value += operationValue;
            updateUserTresorerieText();
            closeNavbar();
        }
        else if(operationType == 'tresorerie' && tresorerieValue == 0) {
            actifsArray[0].value += operationValue;
            updateUserTresorerieText();
            closeNavbar();
        }
        else if(operationType == 'material')
        {
            const generatedId = generateId();
            actifsArray.push({id: generatedId, name: operationName, type: 'material', value: operationValue, hasToBeCounted: false});
            addActifToList(generatedId);

            // Modifier la trésorerie
            actifsArray[0].value = actifsArray[0].value - operationValue;
            updateUserTresorerieText();
            updateActifsSumArray();
            showInfoText('Le matériel valant ' + operationValue + ' à fait diminuer la trésorerie du même montant');
            closeNavbar();
        }
        else if(operationType == 'investment') {
            // 1. On update la trésorerie
            actifsArray[0].value += operationValue;
            updateUserTresorerieText();

            // 2. on update les cp et la liste des actifs / cp
            const generatedIDforCP = generateId();
            capitauxPropresArray.push({id: generatedIDforCP, name: operationName, type: 'investment', value: operationValue});
            actifsArray.push({id: generatedIDforCP, name: operationName, type: 'investment', value: operationValue, hasToBeCounted: false});
            addActifToList(generatedIDforCP);
            addCPToList(generatedIDforCP);
            closeNavbar();

        }
        else if(operationType == 'factureClient')
        {
            // Ajout dans la trésorerie + RND capitaux propres
            actifsArray[0].value += operationValue;
            updateUserTresorerieText();

            const generatedIDforCP = generateId();
            capitauxPropresArray.push({id: generatedIDforCP, name: operationName, type: 'factureClient', value: operationValue, hasToBeCounted: true});
            addCPToList(generatedIDforCP);
            isFondamentalIdentityRespectedWParam();
            showInfoText('L\'opération a à la fois augmenté la trésorerie et les capitaux propres (RND)');
            closeNavbar();
        }
        else if(operationType == 'loyer')
        {
            // On diminue la trésorerie
            actifsArray[0].value = actifsArray[0].value - operationValue;
            updateUserTresorerieText();

            // On ajoute et on les capitaux propres
            const generatedIDforCP = generateId();
            capitauxPropresArray.push({id: generatedIDforCP, name: operationName, type: 'loyer', value: -operationValue, hasToBeCounted: true});
            addCPToList(generatedIDforCP);
            isFondamentalIdentityRespectedWParam();
            showInfoText('L\'opération a à la fois diminué la trésorerie et les capitaux propres (RND)');
            closeNavbar();
        }
        else if(operationType == 'encaissementCompteClient')
        {
            // On augmente la trésorerie mais on ajoute une diminution de "client"
            // 1. On augmente la trésorerie
            actifsArray[0].value += operationValue;
            updateUserTresorerieText();

            // 2. On ajoute un passif négatif
            const generateIDForActif = generateId();
            actifsArray.push({id: generateIDForActif, name: operationName, type: 'encaissementClient', value: -operationValue, hasToBeCounted: true});
            addActifToList(generateIDForActif);
            isFondamentalIdentityRespectedWParam();
            showInfoText('L\'opération a augmenté la trésorerie mais l\'encaissement du client, négatif, a compensé cette augmentation');
            closeNavbar();


        }
    } // on regarde si l'opération est un crédit, et dans ce cas on augmente aussi les passifs
    else if(isCredit == true)
    {
        if(operationType == 'material')
        {
            // 1. on update les actifs et passifs
            const generatedIDforPassifs = generateId();
            passifsArray.push({id: generatedIDforPassifs, name: operationName, type: 'material', value: operationValue, hasToBeCounted: true});
            addPassifToList(generatedIDforPassifs);
            actifsArray.push({id: generatedIDforPassifs, name: operationName, type: 'material', value: operationValue, hasToBeCounted: true});
            addActifToList(generatedIDforPassifs);

            // Message d'information
            showInfoText('L\'emrpunt de ' + operationValue + '€ a été ajouté aux passifs, la trésorerie a donc également augmentée de ' + operationValue + '€');

            closeNavbar();
        }
        else if(operationType == 'credit')
        {
            // Dans ce cas, on augmente la trésorerie et on ajoute un actif
            // 1. Augmentation de la trésorerie
            actifsArray[0].value += operationValue;
            updateUserTresorerieText();

            // 2. update des passifs
            const generatedIDforPassifs = generateId();
            passifsArray.push({id: generatedIDforPassifs, name: operationName, type: 'credit', value: operationValue});
            addPassifToList(generatedIDforPassifs);

            // Message d'information
            showInfoText('L\'emrpunt à la banque de ' + operationValue + '€ a été ajouté aux passifs, la trésorerie a donc également augmentée de ' + operationValue + '€');

            closeNavbar();
        }
        console.log('operation représentant un crédit');
    }

    // On update les totaux
    const sumActfisForID = updateActifsSumArray(actifsArray);
    const sumPassifsForID = updatePassifsSumArray(passifsArray);
    const sumCPForID = updateCPSumArray(capitauxPropresArray);
    
    console.log('Somme des actifs: ' + sumActfisForID + ', sommes des passifs: ' + sumPassifsForID + ', somme des cpitaux propres: ' + sumCPForID);

    // On vérifie si l'identité fondamentale est respectée
    isFondamentalIdentityRespectedWParam();

    actifsArray.forEach(element => console.log(element.id));
}

const editOperationInfos = (type, idOperation) => {
    // 1. on récupère les infos édités dans showEditModal() avec l'id de chaque champs

    const idOfTheUpdatedOperation = idOperation;

    if(type == 'actifs')
    {
        const updatedOperationValue = parseInt(document.getElementById('editedOperationValue').value);
    }
    else if(type == 'passifs')
    {
        const updatedOperationValue = parseInt(document.getElementById('editedOperationValue').value);
        const updatedIsItPayed = document.getElementById('isCreditPayed').checked;

        console.log('Checké ? ' + updatedIsItPayed);

        if(updatedIsItPayed == true)
        {
            // On supprime l'actifs de la liste des actifs et on déduit sur la trésorerie
            var index = passifsArray.map(x => {
                return x.id;
            }).indexOf(idOfTheUpdatedOperation);
              

            // On supprime la card de la liste
            cardBodyID = 'cardBodyPass' + idOperation;
            document.getElementById(cardBodyID).remove();

            // On supprime le passif du tableau + on update la somme total des passifs
            passifsArray.splice(index, 1);
            updatePassifsSumArray(passifsArray);

            // Déduction sur la trésorerie
            actifsArray[0].value = actifsArray[0].value - updatedOperationValue;
            updateUserTresorerieText();
            updateActifsSumArray();

            isFondamentalIdentityRespectedWParam();

            // Updater aussi le total des actifs

            // On ferme la modal
            $('#editOperationModal').modal('hide');
        }
        else
        {
            // On update le montant
            
        }
    }
    else if(type == 'cp')
    {

    }
}

const showEditModal = (idOperation, type) => {
    // 1. récupérer l'id de l'opération
    // 2. faire une requête dans le tableau pour récuperer les infos
    detailsToEditArray = getOperationDetail(idOperation, type);
    console.log(detailsToEditArray);
    // 3. afficher le contenu de la modal en html de ce fichier
    document.getElementById('editOperationModalContent').innerHTML = '<div class="form-group">' +
                '<div class="form-group">' +
                '<label for="operationValue">Montant (en €)</label>' +
                '<input type="number" class="form-control" id="editedOperationValue" value=' +  detailsToEditArray[1] + '>' +
            '</div>';

    if(type == "passifs")
    {
        document.getElementById('editOperationModalContent').innerHTML += '<div class="form-group form-check">' +
            '<input type="checkbox" class="form-check-input" id="isCreditPayed">' +
            '<label class="form-check-label" for="isCreditPayed">' + 'Le crédit a été payé' + '</label>' +
        '</div>' +
        '<p>En cochant cette case, le passif sera supprimée et le montant de la trésorerie en sera déduit</p>';
    }

    document.getElementById('editOperationModalContent').innerHTML += '<div class="modal-footer">' +
        '<button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>' +
        '<button type="button" id=' + type + idOperation + ' class="btn btn-primary">Enregistrer</button>' +
    '</div>';
    document.getElementById(type + idOperation).setAttribute("onclick", "editOperationInfos('" + type + "', " + idOperation + ")");

    $('#editOperationModal').modal('show');
}

const removeOperation = (idOperation, operationType) => {
    // On supprime l'opération du tableau correspondant (actifs, passifs, ou cp)
    if(operationType == 'actifs')
    {
        // Rajouter à la trésorerie le montant des actifs qui vont être supprimés
        actifsToDeleteOperationDetails = getOperationDetail(idOperation, 'actifs');
        actifValueToDelete = actifsToDeleteOperationDetails[1];
        if(actifsToDeleteOperationDetails[3] == 'encaissementCompteClient' || actifsToDeleteOperationDetails[3] == 'loyer' || actifsToDeleteOperationDetails[3] == 'investment')
        {
            actifsArray[0].value = actifsArray[0].value - actifValueToDelete;
        }
        else {
            actifsArray[0].value = actifsArray[0].value + actifValueToDelete;
        }
        updateUserTresorerieText();

        // 1. On le supprime du tableau 2. On supprime la carte
        var index = actifsArray.map(x => {
            return x.id;
        }).indexOf(idOperation);

        // On supprime la card de la liste
        cardBodyID = 'cardBodyPass' + idOperation;
        document.getElementById(cardBodyID).remove();

        // On supprime le passif du tableau + on update la somme total des actifs
        actifsArray.splice(index, 1);
        updateActifsSumArray();
        isFondamentalIdentityRespectedWParam();
    }
    else if(operationType == 'passifs')
    {
        // 1. On le supprime du tableau 2. On supprime la carte
        var index = passifsArray.map(x => {
            return x.id;
        }).indexOf(idOperation);

        // On supprime la card de la liste
        cardBodyID = 'cardBodyPassP' + idOperation;
        document.getElementById(cardBodyID).remove();

        // On supprime le passif du tableau + on update la somme total des actifs
        passifsArray.splice(index, 1);
        updatePassifsSumArray();
        isFondamentalIdentityRespectedWParam();
    }
    else if(operationType == 'cp')
    {

    }
}