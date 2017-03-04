$(document).ready(function($) {
	$("#login").on("click", function() {
		var visibility_state = $("#login_form").css("visibility");
		if (visibility_state == "hidden") {
			$("#login_form").css("visibility", "visible");
		}
		else {
			$("#login_form").css("visibility", "hidden");
		}

	});

	$(".button-collapse").sideNav();

	$('input.autocomplete').autocomplete({
	    data: {
			"Aerie Peak": null,
			"Aggramar": null,
			"Alonsus": null,
			"Anachronos": null,
			"Arathor": null,
			"Aszune": null,
			"Azjol-Nerub": null,
			"Azuremyst": null,
			"Blade's Edge": null,
			"Bloodhoof": null,
			"Bronzebeard": null,
			"Bronze Dragonflight": null,
			"Chamber of Aspects": null,
			"Darkspear": null,
			"Doomhammer": null,
			"Draenor": null,
			"Dragonblight": null,
			"Eonar": null,
			"Ghostlands": null,
			"Hellfire": null,
			"Hellscream": null,
			"Khadgar": null,
			"Kilrogg": null,
			"Kul Tiras": null,
			"Lightbringer": null,
			"Nagrand": null,
			"Nordrassil": null,
			"Quel'Thalas": null,
			"Runetotem": null,
			"Saurfang": null,
			"Shadowsong": null,
			"Silvermoon": null,
			"Stormrage": null,
			"Terenas": null,
			"Terokkar": null,
			"Thunderhorn": null,
			"Turalyon": null,
			"Vek'nilash": null,
			"Wildhammer": null,
			"Agamaggan": null,
			"Al'Akir": null,
			"Ahn'Qiraj": null,
			"Auchindoun": null,
			"Balnazzar": null,
			"Bladefist": null,
			"Bloodfeather": null,
			"Bloodscalp": null,
			"Boulderfist": null,
			"Burning Blade": null,
			"Burning Legion": null,
			"Burning Steppes": null,
			"Chromaggus": null,
			"Crushridge": null,
			"Daggerspine": null,
			"Darksorrow": null,
			"Deathwing": null,
			"Dentarg": null,
			"Dragonmaw": null,
			"Drak'thul": null,
			"Dunemaul": null,
			"Emeriss": null,
			"Executus": null,
			"Frostmane": null,
			"Frostwhisper": null,
			"Genjuros": null,
			"Grim Batol": null,
			"Haomarush": null,
			"Hakkar": null,
			"Jaedenar": null,
			"Karazhan": null,
			"Kazzak": null,
			"Kor'gall": null,
			"Laughing Skull": null,
			"Lightning's Blade": null,
			"Magtheridon": null,
			"Mazrigos": null,
			"Molten Core": null,
			"Neptulon": null,
			"Outland": null,
			"Ragnaros": null,
			"Ravencrest": null,
			"Shadowmoon": null,
			"Shattered Halls": null,
			"Shattered Hand": null,
			"Skullcrusher": null,
			"Spinebreaker": null,
			"Stonemaul": null,
			"Stormreaver": null,
			"Stormscale": null,
			"Sunstrider": null,
			"Sylvanas": null,
			"Talnivarr": null,
			"Tarren Mill": null,
			"The Maelstrom": null,
			"Trollbane": null,
			"Twilight's Hammer": null,
			"Twisting Nether": null,
			"Vashj": null,
			"Warsong": null,
			"Xavius": null,
			"Zenedar": null,
			"Argent Dawn": null,
			"Darkmoon Faire": null,
			"Earthen Ring": null,
			"Moonglade": null,
			"Steamwheedle Cartel": null,
			"The Sha'tar": null,
			"Defias Brotherhood": null,
			"Ravenholdt": null,
			"Scarshield Legion": null,
			"Sporeggar": null,
			"The Venture Co EU":null
		},
		limit: 10, // The max amount of results that can be shown at once. Default: Infinity.
	});

	/*$('#applySubmit').click(function (event) {
		event.preventDefault();
		//var pattern = (\p{L}(\p{L}|[0-9]){2,12}#[0-9]{4});

		var name = $('#name').val();

		var btag = $('#btag').val();
		var name = $('#name').val();
		var age = $('#age').val();
		var main = $('#mainspec').val();
		var offspec = $('#offspec').val();
		var exp = $('#experience').val();
		var hist = $('#history').val();
		var expect = $('#expectations').val();
		var uiurl = $('#uiurl').val();
		var logs = $('#logs').val();
		var learning = $('#learning').val();
		var swpoints = $('#swpoints').val();
		var improve = $('#improve').val();
		var atten = $('#attendance').val();
		var future = $('#future').val();
		var voicecom = $('#voicecom').val();
		var discovery = $('#discovery').val();
		var other = $('#other').val();


	});*/
	//$("#applicationForm").validate();

});
