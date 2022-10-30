
loadUserDetails=()=>{
    try {
        let userDetails =
            JSON.parse(localStorage.getItem('user'));
        $('.user-name').html(userDetails.name.toUpperCase());
        $('#avatar').attr('src',userDetails.avatar);
        setUi('item.html')
    }catch (e) {
        alert('Something went wrong!');
        window.location.replace('../index.html')
    }

}
function setUi(layer) {
    let path = '../pages/'+layer;
    document.getElementById('load').setAttribute('src', path);
    // document.getElementById('load-area').innerHTML=`<iframe id="load-area" src="path" frameborder="0" style="width: 100%; height: 100%"></iframe>`
}