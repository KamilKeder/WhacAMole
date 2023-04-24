var button_start = document.querySelector("#button_start");
var div_pole = document.querySelectorAll(".div_pole");
var wylosowany_numer;
var aktualny_numer = 10;
var timer;
var wynik;
var czas = document.getElementById("span_czas");
button_start.addEventListener("click",start);
function start(){
	losowanie();
	odliczanie();
	document.getElementById("span_wynik").innerHTML = 0;
	button_start.disabled = true;
}
function losowanie(){
	wylosowany_numer = Math.floor(Math.random()*9)+1;
	if (wylosowany_numer == aktualny_numer)
	{
		losowanie();
	}
	else
	{
		if(aktualny_numer == 10)
		{
		aktualny_numer = wylosowany_numer;
		document.getElementById(aktualny_numer).style.backgroundImage="url(img/mole.png)";
		}else{
		document.getElementById(aktualny_numer).style.backgroundImage="url(img/hole.png)";
		aktualny_numer = wylosowany_numer;

		for(const button of div_pole)
		{
			if(button.id == wylosowany_numer)
			{
			button.style.backgroundImage="url(img/mole.png)";
			}
		}
		
		}
	}
}

div_pole.forEach((e) =>{
	e.addEventListener("click", ()=>{
	if (e.id == wylosowany_numer || e.id == aktualny_numer ) {
		losowanie();
		document.getElementById("span_czas").innerHTML = (Math.round((Number(document.getElementById("span_czas").innerHTML) + 0.5) * 100) / 100).toFixed(2);
		document.getElementById("span_wynik").innerHTML = Number(document.getElementById("span_wynik").innerHTML) + 1;
	}
	})
})
function odliczanie(){
	document.getElementById("span_czas").innerHTML = (Math.round(5 * 100) / 100).toFixed(2);
	var licznik;
	var odliczanie_interval = setInterval(function licz(){
	licznik = (Math.round((Number(document.getElementById("span_czas").innerHTML) - 0.1) * 100) / 100).toFixed(2);
	if (licznik < 0 || licznik == 0) {
		clearInterval(odliczanie_interval);
		alert("Koniec Czasu");
		div_pole.forEach((e) =>{
			e.style.backgroundImage="url(img/hole.png)";
			wylosowany_numer = 100;
			aktualny_numer = 10;
			button_start.disabled = false;
		})
		if(document.getElementById("span_wynik").innerHTML > document.getElementById("span_najlepszy").innerHTML){
			document.getElementById("span_najlepszy").innerHTML =document.getElementById("span_wynik").innerHTML;
		}
	}
	document.getElementById("span_czas").innerHTML = (Math.round((Number(licznik)) * 100) / 100).toFixed(2);
	},100)
}