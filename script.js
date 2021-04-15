"use strict;"

var xhr = new XMLHttpRequest();
var dataSet = [];

window.onload = displayDate;

function displayDate() {
    var today = new Date();
    var dd = today.getDate();

    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    var seconds = today.getSeconds();
    today = dd + '/' + mm + '/' + yyyy + ":" + seconds;
    document.getElementById('date').innerHTML = today

}setInterval(displayDate, 1000);

const loadJSON = () => {
    
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            dataSet = JSON.parse(xhr.responseText);
            insertClients();
		}
	};
	xhr.open("GET", './rentalclients.json', true);
	xhr.send();

}



const insertClients = (input) => {
    toggleElementClass('clients', 'hidden', false)
    var htmlFragment = ""
    var evenOdd = ""
    var rowCount = 0;
    for(var i = 0; i < dataSet.length; i++) {
        try {
            if (dataSet[i].first_name.toLowerCase().startsWith(input.toLowerCase())) {
                var obj = dataSet[i];
                var evenOdd = (rowCount % 2 == 0) ? "even" : "odd";
                htmlFragment += `
                <ul class="${evenOdd}">
                    <li id="li" value="${i}" onclick="clientClicked()">${obj.first_name} ${obj.last_name}</li>
                </ul>
                `
                rowCount++
            }
        } catch (error) {
            
        }
    }
    document.getElementById('clients').innerHTML = htmlFragment;
    
}

const searchClient = (searchInputdocument) => {
    var input = searchInputdocument
}

function toggleElementClass(id, className, force) {
	var element = document.getElementById(id);
	if (element && element.classList !== undefined) {
		element.classList.toggle(className, force);
	}
	else {
		console.log(`Could not find element id='${id} on the card`);
	}
	return element;
}

var clientClicked = () => {
    var idx = document.getElementById("li").getAttribute("value")


    document.getElementById("firstName").value = dataSet[idx].first_name
    document.getElementById("lastName").value = dataSet[idx].last_name
    document.getElementById("adress").value = dataSet[idx].address
    document.getElementById("stateProv").value = dataSet[idx].state_prov
    document.getElementById("email").value = dataSet[idx].email
    document.getElementById("phone").value = dataSet[idx].first_name

    document.getElementById("firstName").readOnly = false;
    document.getElementById("lastName").readOnly = false;
    document.getElementById("adress").readOnly = false;
    document.getElementById("stateProv").readOnly = false;
    document.getElementById("email").readOnly = false;
    document.getElementById("phone").readOnly = false;
    document.getElementById("daysRented").readOnly = false;

    var htmlFragment = `
    <span class="labelLeft">Type of Car</span><br>
    <div >
        <input onclick="showImg()" type="radio" name="carOption" id="compact" value="compact">
        <label for="compact">Compact</label>
    </div>

    <div>
        <input onclick="showImg()" type="radio" name="carOption" id="mid-size" value="mid-size">
        <label for="mid-size">Mid-size</label>
    </div>
    <div >
        <input onclick="showImg()" type="radio" name="carOption" id="luxury" value="luxury" >
        <label for="luxury">Luxury</label>
    </div>

    <div>
        <input onclick="showImg()" type="radio" name="carOption" id="vanTruck" value="vanTruck">
        <label for="vanTruck">Van/Truck</label>
    </div>

    `

    document.getElementById("formRadio").innerHTML = htmlFragment

    var htmlFragment = `
    <span class="labelLeft">Extras (Per day)</span><br>

    <div>
        <input onclick="showImg()" type="checkbox" name="bike" id="bike" value="5">
        <label for=bike">Bike Rack ($5)</label>
    </div>

    <div>
        <input onclick="showImg()" type="checkbox" name="gps" id="gps" value="10">
        <label for="gps">Gps ($10)</label>
    </div>

    <div>
        <input onclick="showImg()" type="checkbox" name="baby" id="baby" value="0" >
        <label for="baby">Baby Seat (Free)</label>
    </div>

    `

    document.getElementById("extras").innerHTML = htmlFragment


}

const showImg = () => {
    var htmlFragment = ""
    var pricePerDay = 0.0;
    var extra = 0;
    var extras = []
    var days = document.getElementById("daysRented").value

    if(document.getElementById("baby").checked){
        extra += 0;
        extras.push("Baby Seat")
    }
    if(document.getElementById("bike").checked){
        extra += 5;
        extras.push("Bike Rack")
    }
    if(document.getElementById("gps").checked){
        extra += 10;
        extras.push("GPS")
    }
    console.log(extra)
    console.log(extras)


    console.log(extra)
    
    switch(RetrieveRadioButtonValue('carOption')){
        case "compact":
            pricePerDay = 15
            htmlFragment= `<h3>Car selected</h3>
            <img src="img/compactCar.webp" alt="compact car">
            <span>Price per day $${pricePerDay}</span><br>
            <span>Days: ${days}</span><br>
            <span>Extras: ${extras}</span><br>
            <span>Total Price: $${(pricePerDay*days*extra).toFixed(2)}</span>
            `
            break
        case "mid-size":
            pricePerDay= 20
            htmlFragment= `<h3>Car selected</h3>
            <img src="img/mid-size.jpg" alt="mid-size car">
            <span>Price per day $${pricePerDay}</span><br>
            <span>Days: ${days}</span><br>
            <span>Extras: ${extras}</span><br>
            <span>Total Price: $${(pricePerDay*days*extra).toFixed(2)}</span>`
            break
        case "luxury":
            pricePerDay = 35
            htmlFragment= `<h3>Car selected</h3><img src="img/luxury.jpg" alt="luxury car">
            <span>Price per day $${pricePerDay}</span><br>
            <span>Days: ${days}</span><br>
            <span>Extras: ${extras}</span><br>
            <span>Total Price: $${(pricePerDay*days*extra).toFixed(2)}</span>`
            break
        case "vanTruck":
            pricePerDay = 40
            htmlFragment= `<h3>Car selected</h3>
            <img src="img/truck.jpg" alt="truck">
            <span>Price per day $${pricePerDay}</span><br>
            <span>Days: ${days}</span><br>
            <span>Extras: ${extras}</span><br>
            <span>Total Price: $${(pricePerDay*days*extra).toFixed(2)}</span>`
            break
        default:
    }

    document.getElementById("imgContainer").innerHTML = htmlFragment

}


  

function RetrieveRadioButtonValue(groupName) {
	// debugger;
	var value = "";
	var radioButtonGrouping = document.getElementsByName(groupName);
	if (radioButtonGrouping && radioButtonGrouping.length > 0) {
		// We need to search for which radio button was selected
		// by looking at the checked value https://www.w3schools.com/jsref/prop_radio_checked.asp
		for (let idx = 0; idx < radioButtonGrouping.length; idx++) {
			if (radioButtonGrouping[idx]
				&& radioButtonGrouping[idx].value !== undefined
				&& radioButtonGrouping[idx].checked !== undefined) {
				if (radioButtonGrouping[idx].checked) {
					value = radioButtonGrouping[idx].value;
					break;  // No use looking at the next checkboxes because only one can be checked
				}
			}
		}
	}
	else {
		console.log("Could not find radio button group named '" + groupName + "'");
	}
	return value;
}

function RetrieveCheckBoxValues(groupName) {
    // debugger;
    var value = [];
    var checkboxGrouping = document.getElementsByName(groupName);
    if (checkboxGrouping && checkboxGrouping.length > 0) {
        // We need to search for which checkbox was selected
        // by looking at the checked value https://www.w3schools.com/jsref/prop_checkbox_checked.asp
        for (let idx = 0; idx < checkboxGrouping.length; idx++) {
            if (checkboxGrouping[idx]
                && checkboxGrouping[idx].value !== undefined
                && checkboxGrouping[idx].checked !== undefined) {
                if (checkboxGrouping[idx].checked) {
                    value.push(checkboxGrouping[idx].value);
                }
            }
        }
    }
    else {
        console.log("Could not find checkbox group named '" + groupName + "'");
    }
    return value;
}