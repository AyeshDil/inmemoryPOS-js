let orders = [];
const initOrder = () => {
    let tempOrderData = JSON.parse(localStorage.getItem('orders'));
    if (tempOrderData !== null) {
        orders = tempOrderData;
        setTableData();
    }
}

function setTableData() {
    let rowData = '';
    orders.forEach(responseData => {
        rowData += `<tr>
            <td>${responseData.orderId}</td>
            <td>${responseData.date}</td>
            <td>${responseData.total}</td>
            <td>
                <button class="btn btn-info btn-sm" onclick="showDetails('${responseData.orderId}')">Show Details</button>
            </td>
            </tr>`;
    });
    $('.tbody').html(rowData);

}

const showDetails = (id) => {
    const order = orders.find((e) => id == e.orderId);
    if (order != undefined) {
        $('#modal-button').click();

        //    Load table one data
        $('#orderID').html(order.orderId);
        $('#cost').html(order.total);
        $('#date').html(order.date);
        $('#customerId').html(order.customer);
        let customers = JSON.parse(localStorage.getItem('customers'));
        if (customers !== null) {
            let tempCustomer = customers.find(e => e.id == order.customer);
            $('#customerName').html(tempCustomer.name);
        }

        // Load table two data
        let tableRowData = '';
        order.orderItems.forEach(response => {
            let desc = '';
            let items = JSON.parse(localStorage.getItem('items'));
            if (items !== null) {
                tempItem = items.find(e => e.itemCode == response.code);
                desc = tempItem.description;
            }

            tableRowData += `<tr>
                <td>${response.code}</td>
                <td>${desc}</td>
                <td>${response.unitPrice}</td>
                <td>${response.qty}</td>
                <td>${response.total}</td>
                
            </tr>`
        });
        $('#itemDetails').html(tableRowData);
    }
}