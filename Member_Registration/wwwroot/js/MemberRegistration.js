//Load Data in Table when documents is ready  
$(document).ready(function () {
    loadData();
});

//Load Data function  
function loadData() {
    $.ajax({
        url: "/Home/GetAllMembers",
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.memberID + '</td>';
                html += '<td>' + item.firstName + '</td>';
                html += '<td>' + item.lastName + '</td>';
                html += '<td>' + item.address + '</td>';
                html += '<td>' + item.email + '</td>';              
                html += '<td><a href="#" onclick="return getbyID(' + item.memberID + ')">Edit</a> | <a href="#" onclick="Delele(' + item.memberID + ')">Delete</a></td>';
                html += '</tr>';
            });
            $('.tbody').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Add Data Function   
function SaveMember() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var memberObj = {
        MemberID: $('#MemberID').val(),
        FirstName: $('#FirstName').val(),
        LastName: $('#LastName').val(),
        Address: $('#Address').val(),
        Email: $('#Email').val()        
    };
    $.ajax({
        url: "/Home/AddMember",
        data: memberObj,
        type: "POST",        
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
            alert(result);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Function for getting the Data Based upon Member ID  
function getbyID(memberID) {
    $('#FirstName').css('border-color', 'lightgrey');
    $('#LastName').css('border-color', 'lightgrey');
    $('#Address').css('border-color', 'lightgrey');
    $('#Email').css('border-color', 'lightgrey');   
    $.ajax({
        url: "/Home/GetMemberbyID/" + memberID,
        typr: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            $('#MemberID').val(result.memberID);
            $('#FirstName').val(result.firstName);
            $('#LastName').val(result.lastName);
            $('#Address').val(result.address);
            $('#Email').val(result.email);         

            $('#myModal').modal('show');
            $('#btnUpdate').show();
            $('#btnSave').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}

//function for updating Member's record  
function Update() {
    var res = validate();
    if (res == false) {
        return false;
    }
    
    var memberObj = {
        MemberID: $('#MemberID').val(),
        FirstName: $('#FirstName').val(),
        LastName: $('#LastName').val(),
        Address: $('#Address').val(),
        Email: $('#Email').val()       
    };
    $.ajax({
        url: "/Home/UpdateMember",
        data: memberObj,
        type: "POST",        
        dataType: "json",
        success: function (result) {
            alert(result);
            loadData();
            $('#myModal').modal('hide');
            $('#MemberID').val("");
            $('#FirstName').val("");
            $('#LastName').val("");
            $('#Address').val("");
            $('#Email').val("");
            $('#Email').val("");
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//function for deleting Member's record  
function Delele(ID) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            url: "/Home/DeleteMember/" + ID,
            type: "POST",
            contentType: "application/json",
            dataType: "json",
            success: function (result) {                
                loadData();
                alert(result);
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}

//Function for clearing the textboxes  
function clearTextBox() {
    $('#MemberID').val("");
    $('#FirstName').val("");
    $('#LastName').val("");
    $('#Address').val("");
    $('#Email').val("");   
    $('#btnUpdate').hide();
    $('#btnSave').show();
    $('#FirstName').css('border-color', 'lightgrey');
    $('#LastName').css('border-color', 'lightgrey');
    $('#Address').css('border-color', 'lightgrey');
    $('#Email').css('border-color', 'lightgrey');  
}
//Valdidation using jquery  
function validate() {
    var isValid = true;
    if ($('#FirstName').val().trim() == "") {
        $('#FirstName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#FirstName').css('border-color', 'lightgrey');
    }
    if ($('#LastName').val().trim() == "") {
        $('#LastName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#LastName').css('border-color', 'lightgrey');
    }
    if ($('#Address').val().trim() == "") {
        $('#Address').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Address').css('border-color', 'lightgrey');
    }
    if ($('#Email').val().trim() == "") {
        $('#Email').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Email').css('border-color', 'lightgrey');
    }    
    return isValid;
}  