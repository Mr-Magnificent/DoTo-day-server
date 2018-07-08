
// $(document).ready(function(){
//     makeRequest();
//
// });
$(document).ready(function () {
    let list = $('#list');
    list.css('list-style', 'none');
    $.ajax({
        url: '/display',
        method: 'GET',
        success: function (data) {
            for (input in data) {
                list.append(`<li>
                                 <input type="checkbox" onclick="">
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
                                     <input type="checkbox" onclick="">
                                     ${input}
                                     <button onclick="updateEle(this)">Update</button>                             
                                     <button onclick="deleteEle(this)">Delete</button>
                                </li>`)
            console.log(data);
        }
    })
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
                             <input type="checkbox" onclick="">
                             ${data.input}
                             <button onclick="updateEle(this)">Update</button>                             
                             <button onclick="deleteEle(this)">Delete</button>
                         </li>`)
        }
    });
}
