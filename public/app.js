
let indArr = [];

$(document).ready(function () {
    let list = $('#list');
    list.css('list-style', 'none');
    $.ajax({
        url: '/display',
        method: 'GET',
        success: function (data) {
            for (input in data) {
                list.append(`<li>
                                 <input type="checkbox" onclick="addToInd(this)">
                                 ${data[input]}
                                 <button onclick="updateEle(this)">Update</button>                             
                                 <button onclick="deleteEle(this)">Delete</button>
                             </li>`)
            }
        }
    });
});

function deleteEle(obj) {
    let parent = $(obj).parent();
    let index = parent.index();
    $.ajax({
        url: '/delete',
        method: 'GET',
        data: {index: index},
        success: function (data) {
            parent.remove();
            console.log(data);
        }
    })
}

function updateEle(obj) {
    let parent = $(obj).parent();
    let index = $('li').index(parent);
    let input = prompt('Enter Updated Value');
    if (!input.trim()) {
        return null;
    }
/*    console.log(input);
    console.log(parent);
    console.log(index);*/

    $.ajax({
        url: '/update',
        method: 'GET',
        data: {index: index, val: input},
        success: function (data) {
            parent.replaceWith(`<li>
                                     <input type="checkbox" onclick="addToInd(this)">
                                     ${input}
                                     <button onclick="updateEle(this)">Update</button>                             
                                     <button onclick="deleteEle(this)">Delete</button>
                                </li>`)
            console.log(data);
        }
    })
}

function addToInd(obj) {
    let ind = $(obj).parent().index();
    let ele = indArr.push(ind);
    console.log(ele);
}

function display() {
    $.ajax ({
        url: '/display',
        method: 'GET',
        success: function (data) {
            for (name in data) {
                console.log(name + ' ' + data[name]);
            }
        }
    })
}

function makeRequest() {
    let input = $('#inp').val();
    let list = $('#list');
    if(!input.trim()) {
        return null;
    }

    $.ajax({
        url: '/add',
        method: 'GET',
        data: {input: input},
        success: function(data) {
            list.append(`<li>
                             <input type="checkbox" onclick="addToInd(this)">
                             ${data.input}
                             <button onclick="updateEle(this)">Update</button>                             
                             <button onclick="deleteEle(this)">Delete</button>
                         </li>`)
        }
    });
}

function deleteSel() {
    $.ajax({
        url: '/delSel',
        method: 'GET',
        data: {indArr: indArr},
        success: function (data) {
            console.log(data);
            let pntr = 0;
            let ind = data[pntr];
            let arrEle = $('#list').children();

            console.log(arrEle);
            for(let i = (arrEle.length - 1); i >= 0; i--) {
                if (i === Number(ind)) {
                    $(arrEle[i]).remove();
                    ind = data[++pntr];
                }
                if (pntr === (data.length)) {
                    break;
                }
            }
            indArr = [];
        }
    });
}
