var bokmark_n = document.getElementById('BookmarkerName');
var web_url = document.getElementById('WebsiteURL');
var web_search = document.getElementById('search');
var btn_add = document.getElementById('btn_add');
var btn_update= document.getElementById('btn_update');
var show_data = document.getElementById('show_data');
var alert = document.getElementById('alert');
var close_alert = document.getElementById('close');
var data_list ; 

if(localStorage.getItem('bookmarkdata') == null){
    data_list =  [];
}
else{
    data_list = JSON.parse(localStorage.getItem('bookmarkdata'));
    display(data_list)
} 
btn_add.onclick = function () {
    add();
    display(data_list);
}
btn_update.addEventListener('click',savupdate)
close_alert.onclick = function(){
    alert.classList.replace('d-block','d-none');
}
function add() {
    if(validation(bokmark_n)&&validation(web_url)){
        var obg = {
            b_n: bokmark_n.value,
            w_u: web_url.value,
        }
        data_list.push(obg);
        localStorage.setItem('bookmarkdata',JSON.stringify(data_list))
        clear()
    }
    else{
        alert.classList.replace('d-none','d-block');
    }
}
function clear() {
    bokmark_n.value = null;
    web_url.value = null;
}

function display(prodctlist) {
    var box = '';
    for (var i = 0; i < prodctlist.length; i++) {
        //
        var curendindex =prodctlist.indexOf(data_list[i]);
        //
        box += `
            <tr>
                <td class="my-3">
                    <p class="my-2">${i+1}</p>
                </td>
                <td>
                    <p class="my-2">${prodctlist[i].b_n}</p>
                </td>
                <td>
                    <a onclick = "visit('${prodctlist[i].w_u}')" class="btn text-white bg-success"><i
                        class="fa-solid fa-eye pe-2 me-1"></i>Visit</a>
                </td>
                <td>
                    <a onclick = "update('${curendindex}')" class="btn text-white bg-warning"><i
                        class="fa-solid fa-eye pe-2 me-1"></i>Update</a>
                </td>
                <td>
                    <a href="#" class="btn text-white" onclick="delet(${curendindex})"><i class="fa-solid fa-trash-can me-1"></i>Delet</a>
                </td>
            </tr>
        `;
    }
    show_data.innerHTML = box;
}
var globalindex ;
function update(index){
    btn_add.classList.add('d-none')
    btn_update.classList.remove('d-none')
    globalindex=index;
    bokmark_n.value = data_list[index].b_n
    web_url.value = data_list[index].w_u
}
function savupdate(){
    if(validation(bokmark_n)&&validation(web_url)){
        btn_add.classList.remove('d-none')
        btn_update.classList.add('d-none')
        data_list[globalindex].b_n =bokmark_n.value
        data_list[globalindex].w_u =web_url.value
        localStorage.setItem('bookmarkdata',JSON.stringify(data_list))
        display(data_list)
        clear()
    }
    else{
        alert.classList.replace('d-none','d-block');
    }

}
function visit(url){
    window.open(url)
}
function delet(index){
    data_list.splice(index,1);
    localStorage.setItem('bookmarkdata',JSON.stringify(data_list))
    display(data_list)
}
function validation(element){
    var Regex = {
        BookmarkerName:/^[A-Za-z]+(?:[-' ][A-Za-z]+)*$/,
        WebsiteURL:/^(https?:\/\/)?((([a-zA-Z0-9]+(-[a-zA-Z0-9]+)*\.)+[a-zA-Z]{2,})|(localhost)|((\d{1,3}\.){3}\d{1,3}))(:\d{2,5})?(\/[^\s]*)?$/,
    }
    if (Regex[element.name].test(element.value)){
        element.classList.add('is-valid');
        element.classList.remove('is-invalid');
        return true
    }
    else{
        element.classList.add('is-invalid');
        element.classList.add('is-valid');
        return false
    }
}
web_search.addEventListener('input',Search)
function Search(){
    var tre = web_search.value.trim().toLowerCase()
    var searcharray =[];
    for (let i = 0; i < data_list.length; i++) {
        if(data_list[i].b_n.trim().toLowerCase().includes(tre)==true){
            searcharray.push(data_list[i])
        }
    }
    display(searcharray)
}