window.onload = function(){
	var returnBtn = document.getElementById("return");
	var return2MainPage = function(){
		location = "main.html";
	}
	returnBtn.addEventListener("click", return2MainPage, false);

	// get span elements in the HTML file
	var entries = [document.getElementById("displayName"), 
				   document.getElementById("email"), 
				   document.getElementById("phoneNum"), 
				   document.getElementById("zipCode"), 
				   document.getElementById("pwd"), 
				   document.getElementById("pwdConf")];

	// hardcode the current value of entries
	entries[0].innerHTML = "Haoyuan Xia";
	entries[1].innerHTML = "xia.haoyuan@rice.edu";
	entries[2].innerHTML = "123-456-7890";
	entries[3].innerHTML = "77005";
	entries[4].innerHTML = "123456";
	entries[5].innerHTML = "123456";

	// hide the password information
	entries[4].style = "visibility: hidden";
	entries[5].style = "visibility: hidden";

	// get text from the input textfield
	var entryValues = [document.getElementById("displayNameValue"), 
					   document.getElementById("emailAddr"), 
					   document.getElementById("phoneNumber"), 
					   document.getElementById("zipCodeValue"), 
					   document.getElementById("pwdValue"), 
					   document.getElementById("pwdConfValue")];

	// determine which entries are changed, alert users, and change the values shown on the page
	var changeAlert = function(item, index){
		if (index <= 3){
			if (entryValues[index].value != null && entryValues[index].value != ""){ 	// for normal entries
				if (item.innerHTML != entryValues[index].value){
				alert("The display name is changed from " + item.innerHTML + " to " + entryValues[index].value);
				item.innerHTML = entryValues[index].value;
				entryValues[index].value = "";
				} else{
					alert("Please enter a new information");
					entryValues[index].value = "";
				}
			}
		}else if (index == 5){	// this part is for passwords, and note that alert once is enough			
			if (entryValues[4].value != null && entryValues[4].value != "" && (entryValues[5].value == null || entryValues[5].value == "")){
				alert("Please enter the password again in the password confirmation field");
			}else if (entryValues[5].value != null && entryValues[5].value != "" && (entryValues[4].value == null || entryValues[4].value == "")){
				alert("Please first enter the password in the password field");
			}else if ((entryValues[4].value == null || entryValues[4].value == "") && (entryValues[5].value == null || entryValues[5].value == "")){
				// do nothing
			}else{
				if (entryValues[4].value != entryValues[5].value){
						alert("The two inputted passwords are not the same");
						entryValues[5].value = "";
				}else{
					alert("Password changed successfully");
					item.innerHTML = entryValues[index].value;
					entryValues[index - 1].value = "";
					entryValues[index].value = "";
				}
			}
		}
	}

	var validateEmail = function(){
		var pattern = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$");
		var isValid = pattern.test(entryValues[1].value);
		if (!isValid){
			alert("In e-mail field, please enter a valid e-mail address , e.g. skotep@rice.edu");
		}
		return isValid;
	}

	var validatePhone = function(){
		var pattern = new RegExp("^[0-9][0-9][0-9]-[0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]$");
		var isValid = pattern.test(entryValues[2].value);
		if (!isValid){
			alert("In phone number field, only numbers[0-9] and '-' are valid , e.g. 713-348-6000");
		}
		return isValid;
	}

	var validateZipCode = function(){
		var pattern = new RegExp("^[0-9][0-9][0-9][0-9][0-9]$");
		var isValid = pattern.test(entryValues[3].value);
		if (!isValid){
			alert("In zip code field, only five numbers[0-9] only e.g. 77005");
		}
		return isValid;
	}

	var validate = function(){
		var emailIsValid = true;
		var phoneIsValid = true;
		var zipCodeIsValid = true;
		if (entryValues[1].value != null && entryValues[1].value != ""){
			emailIsValid = validateEmail();
		} 
		if (entryValues[2].value != null && entryValues[2].value != ""){
			phoneIsValid = validatePhone();
		} 
		if (entryValues[3].value != null && entryValues[3].value != ""){
			zipCodeIsValid = validateZipCode();
		}

		if (emailIsValid && phoneIsValid && zipCodeIsValid){
			entries.forEach(changeAlert);
			return true;
		}else{
			return false;
		}
	}
	var submit = document.getElementById("submit");
	submit.addEventListener("click", validate, false);
}