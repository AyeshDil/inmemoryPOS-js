let items=[];

function Item(itemCode, description, qtyOnHand, unitPrice) {
    this.itemCode =itemCode;
    this.description = description;
    this.qtyOnHand=qtyOnHand;
    this.unitPrice =unitPrice;
}

initializeItems = () =>{
    let tempData = JSON.parse(localStorage.getItem('items'));
    // console.log(tempData);
    if (tempData !== null) {
        items = tempData;
        console.log(tempData);
        setItemTableData();
    }
}

function setItemTableData(){
    let searchText = $('#search').val().toLowerCase();
    let htmlData='';
    items.forEach(data=>{
        if (data.description.toLowerCase().includes(searchText)){
            htmlData += `
        <tr>
            <td>${data.itemCode}</td>
            <td>${data.description}</td>
            <td>${data.qtyOnHand}</td>
            <td>${data.unitPrice}</td>
            <td>
                    <button class="btn btn-success btn-sm" onclick="loadItemUpdateModal('${data.itemCode}','${data.description}','${data.qtyOnHand}','${data.unitPrice}')">Update</button> &nbsp; | &nbsp; 
                    <button class="btn btn-danger btn-sm" onclick="deleteItem('${data.itemCode}')">Delete</button>
            </td>
        </tr>
        `;
        }

    });
    $('#table_body').html(htmlData);
}

function saveItem() {
    let item = new Item(
        $('#itemCode').val(),
        $('#description').val(),
        Number($('#qtyOnHand').val()),
        Number($('#unitPrice').val())
    );
    if (items.find(data => item.itemCode == data.itemCode) == undefined){
        items.push(item);
        localStorage.setItem('items', JSON.stringify(items));
        clearFields();
        launchModal("Success!", "Item Saved!");
        setItemTableData();
    }else {
        launchModal('Warning!', 'Already Exists');
    }

}

const clearFields = () => {
    $('#itemCode').val('');
    $('#description').val('');
    $('#qtyOnHand').val('');
    $('#unitPrice').val('');
}

const launchModal = (type, message) => {
    $('#exampleModalLabel').html(type);
    $('.save-modal-body').html(message);
    $('#success-modal').click();
}

let tempItemCode=0
function loadItemUpdateModal(itemCode, description, qtyOnHand, unitPrice) {
    tempItemCode = itemCode;
    $('#update_item_code').val(itemCode);
    $('#update_description').val(description);
    $('#update_qty_on_hand').val(qtyOnHand);
    $('#update_unit_price').val(unitPrice);

    $('#update-modal-button').click();
}

function updateItem() {
    for (let i = 0; i < items.length; i++) {
        if (items[i].itemCode === tempItemCode){
            items[i].description = $('#update_description').val();
            items[i].qtyOnHand = Number($('#update_qty_on_hand').val());
            items[i].unitPrice =Number($('#update_unit_price').val());

            localStorage.setItem('items', JSON.stringify(items));
            $('update-close').click();
            launchModal('Updated', "Item Updated!");
            setItemTableData();
        }
    }
}

function deleteItem(itemCode) {
    if (confirm('Are you sure?')) {
        for (let i = 0; i < items.length; i++) {
            if (items[i].itemCode == itemCode) {
                items.splice(i, 1);
                localStorage.setItem('items', JSON.stringify(items));
                launchModal('Deleted!', 'Item Deleted!');
                setItemTableData();
            }
        }
    }
}

